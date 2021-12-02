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
  const { studentId, requiredDay } = req.body;
  Student.findById(studentId)
    .populate({
      path: "lectures", // populate lectures
      match: { lectures: { $elemMatch: { day: requiredDay } } },
      populate: {
        path: "teacherId subjectId", // in lectures, populate teachers and subjects
        select: { subjectName: 1, name: 1 },
      },
    })
    .exec((err, doc) => {
      if (err) {
        console.log(err);
      } else {
        let lectureData = [];
        doc.lectures.forEach((element) => {
          element.lectures = element.lectures.filter(
            (lecture) => lecture.day === requiredDay
          );
          lectureData.push(element);
        });
        // console.log(lectureData);
        return res.status(200).json(lectureData);
      }
    });
});

// router.post("/getlectures", (req, res) => {
//   const { studentId, requiredDay } = req.body;
//   Lecture.find({ lectures: { $elemMatch: { day: requiredDay } } }).exec(
//     (err, doc) => {
//       if (err) {
//         console.log(err);
//       } else {
//         return res.status(200).json(doc);
//       }
//     }
//   );
// });

router.post("/getteacherlectures", (req, res) => {
  const { teacherId, requiredDay } = req.body;
  Teacher.findById(teacherId)
    .populate({
      path: "lectures", // populate lectures
      match: { lectures: { $elemMatch: { day: requiredDay } } },
      populate: {
        path: "subjectId", // in lectures, populate teachers and subjects
        select: { subjectName: 1, name: 1 },
      },
    })
    .exec((err, doc) => {
      if (err) {
        console.log(err);
      } else {
        let lectureData = [];
        doc.lectures.forEach((element) => {
          element.lectures = element.lectures.filter(
            (lecture) => lecture.day === requiredDay
          );
          lectureData.push(element);
        });
        // console.log(lectureData);
        return res.status(200).json(lectureData);
      }
    });
});

module.exports = router;
