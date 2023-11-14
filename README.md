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
{
    url: "https://api.spacexdata.com/v5/launches/query",
    method: "POST",
    body: {
        options: {
            page: number,
            limit: number
        }
    }
}
```

## Requirements

1. Disable pagination controls until the initial data is loaded.
1. Disable Previous/Next page buttons if previous/next page is not available.
1. Display current range of records (e.g. "1-10 of 1000") and a total number of launches.

## Notes

1. Fetch the data using "fetch" API
1. Use a hardcoded value for the number of records on a page, i.e. "limit" (e.g. 10)
1. First page is 1, not 0
1. API will ignore request payload if it's not specified as JSON explicitly
1. Styling can be completely ignored
