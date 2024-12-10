require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser=require('body-parser');
const cors=require('cors');
const cookieParser = require("cookie-parser");
const authRoute = require("./routes/AuthRoute");

const PORT = process.env.PORT || 3000;
const uri = process.env.MONGO_URL; // MongoDB connection

const app = express();

app.use(cors({
  origin: ["http://localhost:3001"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(express.json());

app.use("/", authRoute);

  // app.listen(PORT, () => {
  //   console.log("App started");
  //   mongoose.connect(uri);
  //   console.log("DB connected");
  // });
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("DB connected");
    app.listen(PORT, () => {
      console.log("App started on port", PORT);
    });
  })
  .catch((error) => console.error("DB connection error:", error));
