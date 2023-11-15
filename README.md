# Space Launch Flights

## About

This is a code challenge to build a performant pagination system withouth creating race conditions.

## Installation

1. Install dependencies with `npm install`
1. Start the project with `npm start`

## Challenge

Implement a component that fetches and then displays in a table
SpaceX launches from the public API [https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches/v5/query.md](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches/v5/query.md):

```js
    URL: "https://api.spacexdata.com/v5/launches/query",
    Method: "POST",
    Body: {
        options: {
            page: number,
            limit: number
        }
    }
```

## Notes

1. Fetch the data using "fetch" API (✅ ok)
1. Use a hardcoded value for the number of records on a page, i.e. "limit" (e.g. 10) (✅ ok)
1. First page is 1, not 0 (✅ ok)
1. API will ignore request payload if it's not specified as JSON explicitly (✅ ok)
1. Styling can be completely ignored (✅ ok)

## Requirements

1. Disable pagination controls until the initial data is loaded:
   - Status: ✅ done.
   - Explanation: The dummy `data` starts with `hasPrevPage` and `hasNextPage` set to `FALSE`. When the data is loaded from the API they became truthy or falsy depending of the information available.
1. Disable Previous/Next page buttons if previous/next page is not available.
   - Status: ✅ done.
   - Explanation: As mentioned above, the API provides data to easily dissable the buttons when there is no more data available.
1. Display current range of records (e.g. "1-10 of 1000") and a total number of launches.
   - Status: ✅ done.
   - Explanation: Added a generic formula for calculating the records. If that code is nedded on other components, it would be extracted to a file like we do with `friendlyDate()`.
1. "SECRET" Avoid race conditions if the user presses the next button multiple times before the server returns the information.
   - Status: ✅ done.
   - Explanation: I made sure the page always the up to date by writting the setter using a callback function. So there is no need to modify the `useEffect()` hook.

## Improvements

1. Added the patches of each flight. Of course, i made sure to use the small image version for faster loading.
2. Added a friendly date format without using a library like Moment.js.

## Refactor ideas

1. I mentioned moving the fetch to a hook called `useFetch`, however the exercise is short enought to keep `App.jsx` as it is.
2. Use `nextPage` and `prevPage` to avoid using the callback in `setPage()`. This even allow us to ditch React and use pure JavaScript as we don't need to worry avoid having an state in sync (only for this type of small projects)
3. Put a placeholder image while the rocket patches are loading. I was just too lazy to copy and paste the template code from any previous project hehe.
4. Add my own/Zalando design system but creating the design in Figma would take too much time.
5. Organize better the CSS. Right now everything is in one file.

## Schema

For the most up to date version please check the Schema.numbers (open it with Apple Numbers)

### API

| Key           | Data type      | Description                                                                                                                                                            | Example |
| ------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| docs          | Flight[]       | An array with all the flight data for each rocket launch. Check the Flight schema for more details.                                                                    |         |
| hasNextPage   | boolean        | Information coming from the server to tell the frontend if there is more flights data available based on your current limit. Check the key limit for more details.     | TRUE    |
| hasPrevPage   | boolean        | Information coming from the server to tell the frontend if there is previous flights data available based on your current limit. Check the key limit for more details. | FALSE   |
| limit         | number         | How many results you want per page.                                                                                                                                    | 10      |
| nextPage      | number \| null | The number of the next page. Returns null if there is no more pages available.                                                                                         | 2       |
| page          | number         | The current page requested.                                                                                                                                            | 1       |
| pagingCounter | number         |                                                                                                                                                                        | 1       |
| prevPage      | number \| null | The number of the previous page. Returns null if there is no more pages available.                                                                                     | null    |
| totalDocs     | number         | The total amount of Flights that the API has.                                                                                                                          | 205     |
| totalPage     | number         | The total amount of pages available based on the limit per page.                                                                                                       | 21      |

### Flight

| Key        | Data type | Description                               | Example                   |
| ---------- | --------- | ----------------------------------------- | ------------------------- |
| id         | string    | The unique identifier of this flight.     | 5eb87cd9ffd86e000604b32a  |
| date_local | Date      | The data in ISO 8601 format.              | 2006-03-25T10:30:00+12:00 |
| name       | string    | The name of the rocket launched.          | FalconSat                 |
| success    | boolean   | If the launch was a success or it failed. | FALSE                     |
