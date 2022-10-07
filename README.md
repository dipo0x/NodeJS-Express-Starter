# NodeJS Boilerplate

This is a simple NodeJS Boilerplate that contains Logger, Error Handler, Attempts Limits and everything you will need to get your NodeJS application up and running with basic security y'll need.

# Installation
1. [NodeJS](https://nodejs.org/en/download/)
2. [Express JS](https://expressjs.com/en/starter/generator.html)

# Getting Started
Clone the repo and install all your dependeincies with ```npm install ```

You will also need to get your MongoDB server running. Use online cluster [here](https://account.mongodb.com/account/login) or download [MongoDB Compass](https://www.mongodb.com/try/download/enterprise). Finally, basic knowledge of Redis is required

When all has been installed, you can start the express server by running:

```shell
npm start
```

## Usage

Make a Reference to [the Postman Collection](https://fastupload.io/en/25axvSwV5FvMhrf/file) to see the Environment Variables and Requests

## Stack Choice

MongoDB - It lets the application run while it is fetching data from the backend server which won't make our large users always wait for response. It is asynchronous and event-driven. Schema doesn't have to be well structured, which makes it perfect for frequently changing data. MongoDB is also a distributed database which allows ad-hoc queries, real-time integration, and indexing efficient.

Redis - <You can connect to mongoAtlas to see the effect of Redis clearly - reduction in data retrieval time>
Since Redis is an in-memory database, its data access operations are faster than any other disk-bound database could deliver. It makes Redis the perfect choice for caching. Its key-value data storage is another plus because it makes data storage and retrieval much simpler. 
Our large users don't always have to fetch data from our database everytime, they can always have in-memory storage to retrieve data from therefore reducing stress on DB.
