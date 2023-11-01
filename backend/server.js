require("dotenv").config({ path: "../.env.development.local" });

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const calculationRoutes = require("./routes/calculation");

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(express.json());
mongoose.set("strictQuery", false);

app.get("/", (req, res) => {
  res.json({ message: "API is working" });
});

app.use("/api/auth", authRoutes);
app.use("/api/calculation", calculationRoutes);

app.listen(8000, () => {
  console.log(`Server listening at 8000`);
});

mongoose.connect("mongodb+srv://Venkatesh:Venkatesh@cluster0.ym2ts75.mongodb.net/?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
