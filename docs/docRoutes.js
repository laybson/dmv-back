const swaggerUi = require('swagger-ui-express'),
    swaggerSpec = require('./swagger.js');

module.exports = (app) => {

    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

};