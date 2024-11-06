require("dotenv").config();
require("./config/mongoDB.js");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");

const app = express();

// body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());
// routes
const productRoute = require("./routes/productRoute.js");

app.use(productRoute);
app.get('/', (req, res) => {
  res.render(
    `C:\\users\\hp\\downloads\\kefita-main2\\eagle\\back\\views\\layouts\\adminLayout.ejs`
  );
})
app.listen(1000, () => {
  console.log("server is running on port 1000");
});
