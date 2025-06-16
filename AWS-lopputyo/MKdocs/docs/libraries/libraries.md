
### [Node](https://nodejs.org/en) 

Node.js is a JavaScript runtime environment that allows you to execute JavaScript code on the server-side. It provides the necessary runtime to run Express.js, which is a web application framework for Node.js. Express.js simplifies the process of building web applications and APIs in Node.js by providing a robust set of features and utilities.


### package.json
```
{
  "name": "ndviworker",
  "version": "1.0.0",
  "description": "NDVI images from sentinelhub API ",
  "main": "app.js",
  "scripts": {
    "start": "node app.js",
    "dev": "nodemon index.js"
  },
  "author": "AA4598@student.jamk.fi",
  "license": "ISC",
  "dependencies": {
    "@sentinel-hub/sentinelhub-js": "^0.4.7",
    "@turf/turf": "^6.5.0",
    "axios": "^1.6.8",
    "bcrypt": "^5.1.1",
    "cors": "^2.8.5",
    "dotenv": "^16.4.5",
    "express": "^4.19.2",
    "jimp": "^0.22.12",
    "jsonwebtoken": "^9.0.2",
    "mongoose": "^8.3.1",
    "mongoose-unique-validator": "^5.0.0",
    "morgan": "^1.10.0",
    "node-cron": "^3.0.3",
    "nodemon": "^3.1.0"
  }
}
```

  
### [Express](https://www.npmjs.com/package/express)  

A fast, unopinionated, minimalist web framework for Node.js, used for building web applications and APIs.

`npm i express`

### [Nodemon](https://www.npmjs.com/package/nodemon)  

A utility that automatically restarts your Node.js application when file changes are detected, making development easier.

`npm i nodemon`

### [CORS](https://www.npmjs.com/package/cors)  

A middleware for Express to enable Cross-Origin Resource Sharing (CORS), allowing your API to be accessed from different domains.

`npm i cors`

### [@sentinel-hub/sentinelhub-js](https://www.npmjs.com/package/@sentinel-hub/sentinelhub-js)  

A JavaScript library to access Sentinel Hub services, enabling you to work with satellite imagery and data from Sentinel satellites.

`npm i @sentinel-hub/sentinelhub-js`

### [Dotenv](https://www.npmjs.com/package/dotenv)  

A module that loads environment variables from a `.env` file into `process.env`, useful for managing configuration settings in a project.

`npm i dotenv`

### [Morgan](https://www.npmjs.com/package/morgan)  

An HTTP request logger middleware for Node.js, useful for logging details of incoming requests for debugging and monitoring.

`npm i morgan`

### [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)  

A library to create and verify JSON Web Tokens (JWT), commonly used for authentication and secure data exchange.

`npm i jsonwebtoken`

### [@turf/turf](https://www.npmjs.com/package/@turf/turf)  

A JavaScript library for advanced geospatial analysis, providing various functions for processing and analyzing geographic data.

`npm i @turf/turf`

### [Axios](https://www.npmjs.com/package/axios)  

A promise-based HTTP client for the browser and Node.js, used for making HTTP requests to interact with APIs.

`npm i axios`

### [Mongoose](https://www.npmjs.com/package/mongoose)  

An Object Data Modeling (ODM) library for MongoDB and Node.js, providing a straightforward, schema-based solution to model your application data.

`npm i mongoose`

### [mongoose-unique-validator](https://www.npmjs.com/package/mongoose-unique-validator)  

A plugin for Mongoose that provides unique validation for schema fields, ensuring no duplicate values are stored in the database.

`npm i mongoose-unique-validator`

### [Jimp](https://www.npmjs.com/package/jimp)  

A library for image processing in Node.js, offering various functionalities like resizing, cropping, and image manipulation.

`npm i jimp`

### [Node Cron](https://www.npmjs.com/package/node-cron)  

A task scheduler for Node.js, allowing you to run scheduled tasks using Cron syntax.

`npm i node-cron`

### [bcrypt](https://www.npmjs.com/package/bcrypt)  

A library for hashing passwords in Node.js, providing secure methods to store and verify passwords.

`npm i bcrypt`
