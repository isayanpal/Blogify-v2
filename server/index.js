require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./db/db");
const port = process.env.PORT || 5000;
const cookieParser = require("cookie-parser");

const app = express();

connectDB();

// middlewares
app.use(
  cors({
    credentials: true,
    origin: process.env.VITE_URL,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(__dirname + "/uploads"));

// routes
app.use("/api/user", require("./controllers/User"));
app.use("/api", require("./controllers/Post"));

// Preflight request handling
app.options("*", cors());

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
