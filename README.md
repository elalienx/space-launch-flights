# Space Launch Flights

## About

This is a code challenge to build a performant pagination system withouth creating race conditions.

## Installation

1. Install dependencies with `npm install`
1. Start the project with `npm start`

## Challenge

Implement a component that fetches and then displays in a table
SpaceX launches from the public API [https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches/v5/query.md](https://github.com/r-spacex/SpaceX-API/blob/master/docs/launches/v5/query.md):

```json
    url: "https://api.spacexdata.com/v5/launches/query",
    method: "POST",
    body: {
        options: {
            page: number,
            limit: number
        }
    }
```

## Requirements

1. Disable pagination controls until the initial data is loaded. (⌛️ pending)
1. Disable Previous/Next page buttons if previous/next page is not available. (✅ done)
1. Display current range of records (e.g. "1-10 of 1000") and a total number of launches. (💼 working on it)

## Notes

1. Fetch the data using "fetch" API (✅ ok)
1. Use a hardcoded value for the number of records on a page, i.e. "limit" (e.g. 10) (✅ ok)
1. First page is 1, not 0 (✅ ok)
1. API will ignore request payload if it's not specified as JSON explicitly (✅ ok)
1. Styling can be completely ignored (✅ ok)

## Refactoring

1. Use the query option of GraphQL to return less data and make it easier to use.
1. Use pageNext and pagePrev to skip the cleanup and just sent the correct next/prev page.

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
| offset        | number         |                                                                                                                                                                        | 0       |
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
