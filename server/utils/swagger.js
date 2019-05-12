const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer"
        }
      }
    },
    openapi: "3.0.0", // Specification (optional, defaults to swagger: '2.0')
    info: {
      title: "The War of the Games API", // Title (required)
      description: "Documentation for The War of the Games API",
      version: "1.0.0" // Version (required)
    },
    servers: [
      {
        url: "https://async-capstone.herokuapp.com/api",
        description: "Production Heroku server"
      },
      {
        url: "http://localhost:8080/api",
        description: "Local server"
      }
    ]
  },
  // Path to the API docs
  apis: ["./routes/*.js"]
};

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
