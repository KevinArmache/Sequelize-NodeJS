const express = require("express");

const app = express();
const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const db = require("./models");
const { User } = require("./models");

app.get("/select", (req, res) => {
  User.findAll({ where: { name: "kebo" } }) //for to find all users let find all like this findAll()
    .then((users) => {
      res.send(users);
    })
    .catch((error) => {
      if (error) {
        console.log(error);
      }
    });
});

app.get("/insert", (req, res) => {
  bcrypt
    .hash("kebolife", 10)
    .then((hash) => {
      User.create({
        name: "kebo",
        email: "kebo@gmail.com",
        password: hash,
      });
    })
    .catch((error) => {
      if (error) {
        console.log(error);
      }
    });
  res.send("insert");
});

app.get("/delete", (req, res) => {
  User.destroy({ where: { id: 5 } }).catch((error) => {
    if (error) {
      console.log(error);
    }
  });
  res.send("delete");
});

db.sequelize.sync().then((req) => {
  app.listen(3001, () => {
    console.log("Listening on port 3001");
  });
});
