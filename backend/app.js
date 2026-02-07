const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const tenantRoutes = require("./routes/tenantRoutes");
const userRoutes = require("./routes/userRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api/tenants", tenantRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req, res) => {
  res.send("API e-commerce multi-tenant fonctionne");
});

app.listen(3000, () => {
  console.log("Serveur lancé sur http://localhost:3000");
});
