const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");
const userRoutes = require("./routes/api/userRoutes");
const thoughtRoutes = require("./routes/api/thoughtsRoutes");
const morgan = require("morgan");

const cwd = process.cwd();

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use((req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  console.log("Body:", req.body);
  next();
});
app.use("/api/users", userRoutes);
app.use("/api/thoughts", thoughtRoutes);
app.use(express.static(cwd + "/client/build"));

app.use(routes);

db.once("open", () => {
  app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});
