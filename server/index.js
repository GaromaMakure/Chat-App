const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
const PORT = process.env.PORT || 8080;
app.get("/", (request, response) => {
  response.json({
    Message: "server running at " + PORT,
  });
});

app.listen(PORT, () => {
  console.log("server running at " + PORT);
});
