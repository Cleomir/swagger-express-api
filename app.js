const express = require("express");
const bodyParser = require("body-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const app = express();

const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description: "A simple API for managing tasks",
    },
    servers: {
      url: "http://localhost:3000",
    },
  },
  apis: ["./routes/*.js"], // Path to your API routes
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Middleware
app.use(bodyParser.json());

// Routes (defined in separate file for better organization)
const taskRoutes = require("./routes/tasks");
app.use("/tasks", taskRoutes);

// Error handler (optional)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Internal Server Error");
});

module.exports = app;
