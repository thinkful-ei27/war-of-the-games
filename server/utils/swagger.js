const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0", // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: "The War of the Games API", // Title (required)
      description: "Documentation for The War of the Games API",
      version: "1.0.0" // Version (required)
    },
    servers: [
      {
        url: "https://async-capstone.herokuapp.com/api"
      }
    ],
    securityDefinitions: {
      bearerAuth: {
        type: "apiKey",
        name: "Authorization",
        scheme: "bearer",
        in: "header"
      }
    }
  },
  // Path to the API docs
  apis: ["./routes/*.js"]
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
