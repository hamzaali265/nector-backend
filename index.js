const express = require("express");
const mongoose = require("mongoose");
const userRoutes = require("./app/routes/user_routes");
const { swaggerUi, swaggerSpec } = require("./swaggerConfig");
const productRoutes = require("./app/routes/product_routes");

const app = express();
const port = process.env.PORT || 3000;
// "mongodb+srv://hafizhamzaali265:2S86F4Ujq8pjvB6e@galiileo.jqrhc.mongodb.net/?retryWrites=true&w=majority&appName=Galiileo"

mongoose
  .connect("mongodb://localhost:27017/nector")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error(err));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
