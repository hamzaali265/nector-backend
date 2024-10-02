const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Nector API",
    version: "1.0.0",
    description: "API documentation for user management and authentication",
    contact: {
      name: "Hamza Ali",
      email: "hafizhamzaali265@gmail.com",
    },
  },
  servers: [
    {
      url: "http://localhost:3000/api",
      description: "Local server",
    },
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
};

// Swagger options
const options = {
  swaggerDefinition,
  apis: ["./app/routes/*.js"], // Path to your route files
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJsdoc(options);

module.exports = {
  swaggerUi,
  swaggerSpec,
};
