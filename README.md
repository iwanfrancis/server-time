# Server time tech task

## API

I went for the simplest solution I could possibly get away with, given that I'm a frontend dev and haven't used express before, hope that's okay! Didn't bother with TS, Linting, Testing etc.

It occurred to me that I could probably have setup express to the serve the SPA, but I don't really have enough time to work that out sorry.

### Prerequisites

Yarn

### Setup Instructions

1. Install

```
yarn
```

2. Start server

```
yarn start
```

## Frontend

Simple CRA single page app, as suggested on the task. Typically I'll opt for Vite for SPAs, but CRA is fine.

Styled using tailwind.

I opted to implement the API fetching with axios and react-query. React query handles most of the heavy lifting when it comes to the response caching and the refetching. Created a query hook for each API request as well as a hook to handle the time difference updates.

I added airbnb linting, as well as a few other eslint plugins.

Added a couple of tests for the panel components, which are more like integration tests really, as they are actually testing the functionality of the hooks. Used MSW to mock the API responses.

### Prequisites

Yarn

### Setup instructions

1. Install

```
yarn
```

2. Start

```
yarn start
```

3. Alternatively, build and serve locally:

```
yarn build
yarn global add serve
serve -s build
```
