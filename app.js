import express from "express";
import dbConnection from "./src/config/dbConnection.js";
import { PORT } from "./src/utils/constant.js";
const app = express();

dbConnection()
  .then(() => {
    app.listen(PORT || 4000, () => {
      console.log("Server is running on port 3000");
    });
  })
  .catch(() => {
    console.error("Server failed to start");
  });
