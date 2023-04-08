const app = require("./app");

const mongoose = require("mongoose");

const { DB_HOST, PORT } = process.env;

mongoose
  .connect(DB_HOST)
  .then(() => console.log("Database connection successful"))
  .catch((error) => {
    console.log(error.message);
    process.exit(1);
  });

  app.listen(PORT, () => {
    console.log(`Server running. Use our API on port: ${PORT}`);
  });