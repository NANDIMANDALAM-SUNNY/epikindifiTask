const express = require('express');
const mongoose = require('mongoose');
const logger = require('morgan');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const apiRouter = require('./src/routes/api');
require('dotenv').config();

// swagger-ui-express options
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Reference Data Maintenance',
      version: '1.0.0',
      description: 'Reference Data Maintenance API',
    },
    servers: [
      {
        url: 'http://localhost:8000',
      },
    ],
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsDoc(options);

// creating the server connection
const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route to the swagger documentation
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));

//  creating the routes
app.use('/api', apiRouter);

// setting up the databse configuration
mongoose.set('runValidators', true);
mongoose.connect(process.env.dbConnection)
  .then(
    () => console.log('Database is Connected'),
    () => console.log('Not Connected'),
  );

// configuration of the PORT
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server listening on ${PORT}`);
});
