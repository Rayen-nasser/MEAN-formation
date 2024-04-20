const express = require("express");
const mongoose = require("mongoose");
const stuffRoutes = require("./router/stuff");
const userRoutes = require("./router/user");
const path = require('path')

mongoose
  .connect(
    "mongodb+srv://rayenn38:28bpO9eQw1urbjIa@cluster1.8xdfiwp.mongodb.net/"
  )
  .then(() => {
    console.log("Successfully connected to MongoDB Atlas!");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB Atlas:", error);
  });

const app = express();

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT, DELETE, PATCH, OPTIONS"
      );
      next();
    });
    
    app.use(express.json());
    app.use('/images', express.static(path.join(__dirname, 'images')))
    app.use("/api/stuff", stuffRoutes);
    app.use("/api/auth", userRoutes);
    
    module.exports = app;
    