const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDef = {
    'basePath': '/',
    'host': 'localhost:8080',
    'info': {
        'description': '...',
        'title': '...',
        'version': '1.0.0'
    }
};

const options = {
    'apis': ['../**/*.docs.js'],
    'swaggerDefinition': swaggerDef
};

module.exports = swaggerJSDoc(options);
