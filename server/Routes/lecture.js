const express = require("express");
const Lecture = require("../Models/lecture");
const Student = require("../Models/student");
const Subject = require("../Models/subject");
const Teacher = require("../Models/teacher");
const router = express.Router();

router.post("/weeklyclasses", (req, res) => {
  const { teacherId, branch, subjectId, lectures } = req.body;
  if (!teacherId || !branch || !subjectId || !lectures) {
    return res.json({ error: "please add all the fields" });
  }

  const lecture = new Lecture({
    subjectId,
    teacherId,
    branchName: branch,
    lectures,
  });
  lecture
    .save()
    .then((result) => {
      //   res.json(result);
      //   console.log(result._id);
      Teacher.findByIdAndUpdate(
        teacherId,
        {
          $push: { lectures: result._id },
        },
        { new: true }
      ).exec((err, doc) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Hii");
        }
      });
      const query = Subject.findOne({ _id: subjectId });
      query.select({ students: 1, _id: 0 });
      query.exec(function (error, students) {
        if (error) {
          return console.log(error);
        }
        students.students.map((id) => {
          //   console.log(id);
          Student.findByIdAndUpdate(
            id,
            {
              $push: { lectures: result._id },
            },
            {
              new: true,
            }
          ).exec((err, doc) => {
            if (err) {
              console.log(err);
            } else {
              console.log("done behenchod!");
            }
          });
        });
      });
    })
    .catch((err) => console.log(err));
  res.json({ message: "Done Successfully!" });
});

router.post("/getlectures", (req, res) => {
  const { studentId } = req.body;
  Student.findById(studentId)
    .populate({
      path: "lectures", // populate lectures
      populate: {
         path: "teacherId subjectId" // in lectures, populate teachers and subjects
      }
    })
    .exec((err, doc) => {
      if (err) {
        console.log(err);
      } else {
        return res.status(200).json(doc.lectures);
      }
    });
});

module.exports = router;
