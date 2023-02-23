const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const port = process.env.PORT || 5000;
const connectDB = require("./config/db");
const { errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", require("./haravan/connect"));
app.use("/api", require("./routers/authRoute"));
app.use("/api", require("./routers/dataRoute"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../client/build")));
  app.get("*", (req, res) =>
    res.sendFile(
      path.resolve(__dirname, "../", "client", "build", "index.html")
    )
  );
}else{
  app.get('/', (req, res) => {
    res.send("Please set to production")
  })
}

app.use(errorHandler);
app.listen(port, (req, res) => {});
