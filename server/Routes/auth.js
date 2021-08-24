const express = require('express'); 
const mongoose = require('mongoose');
const router = express.Router()
const Student = require('../Models/student')
const Teacher = require('../Models/teacher')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../config/keys')

router.post("/studentsignup", (req, res) => {
    const { name, email, password} = req.body;
    if (!password || !email || !name) {
      res.json({ error: "please add all the fields" });
    }
    Student.findOne({ email: email })
      .then((savedStudent) => {
        if (savedStudent) {
          return res
            .status(422)
            .json({ error: "User already exists with this email" });
        }
        bcrypt.hash(password, 12).then((hashedPassword) => {
          const student = new Student({
            name,
            email,
            password: hashedPassword,
          });
          student
            .save()
            .then((student) => {
              res.json({ message: "Saved Successfully" , student });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

router.post("/teachersignup", (req, res) => {
    const { name, email, password} = req.body;
    if (!password || !email || !name) {
      res.json({ error: "please add all the fields" });
    }
    Teacher.findOne({ email: email })
      .then((savedTeacher) => {
        if (savedTeacher) {
          return res
            .status(422)
            .json({ error: "User already exists with this email" });
        }
        bcrypt.hash(password, 12).then((hashedPassword) => {
          const teacher = new Teacher({
            name,
            email,
            password: hashedPassword,
          });
          teacher
            .save()
            .then((teacher) => {
              res.json({ message: "Saved Successfully" , teacher });
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.post("/studentsignin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(422).json({ error: "Please add email or password" });
    }
    Student.findOne({ email: email })
      .then((savedStudent) => {
        if (!savedStudent) {
          return res.status(422).json({ error: "Invalid email or password " });
        }
        bcrypt
          .compare(password, savedStudent.password)
          .then((doMatch) => {
            if (doMatch) {
              /* res.json({ message: "Sucessfully signed in" }); */
              const token = jwt.sign({ _id: savedStudent._id }, JWT_SECRET);
              const { _id, name, email } = savedStudent;
              res.json({ token, user: { _id, name, email} });
            } else {
              return res
                .status(422)
                .json({ error: "Invalid email or password " });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  });

  router.post("/teachersignin", (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(422).json({ error: "Please add email or password" });
    }
    Teacher.findOne({ email: email })
      .then((savedTeacher) => {
        if (!savedTeacher) {
          return res.status(422).json({ error: "Invalid email or password " });
        }
        bcrypt
          .compare(password, savedTeacher.password)
          .then((doMatch) => {
            if (doMatch) {
              /* res.json({ message: "Sucessfully signed in" }); */
              const token = jwt.sign({ _id: savedTeacher._id }, JWT_SECRET);
              const { _id, name, email } = savedTeacher;
              res.json({ token, user: { _id, name, email} });
            } else {
              return res
                .status(422)
                .json({ error: "Invalid email or password " });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      })
      .catch((err) => {
        console.error(err);
      });
  });

  module.exports = router;