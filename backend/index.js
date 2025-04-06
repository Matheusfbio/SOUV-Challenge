const express = require("express");
const cors = require("cors");
const shoppingRoutes = require("./shopping-routes");
const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Swagger config
const swaggerOptions = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Shopping List API",
      version: "1.0.0",
      description: "API para gerenciar uma lista de compras",
    },
    servers: [{ url: "http://localhost:5000" }],
  },
  apis: ["./shopping-routes.js"], // Arquivo onde estão as anotações da API
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Rotas da lista de compras
app.use("/api/shopping-list", shoppingRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server listening on http://localhost:${PORT}`);
  console.log(`📚 Swagger docs available at http://localhost:${PORT}/api-docs`);
});
