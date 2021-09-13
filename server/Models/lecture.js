const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const lectureSchema = new mongoose.Schema({
  subjectId: {
    type: ObjectId,
    ref: "Subject",
  },
  teacherId: {
    type: ObjectId,
    ref: "Teacher",
  },
  branchName: {
    type: String,
    required: true,
  },
  lectures: {
    type: Array,
  },
});

module.exports = mongoose.model("Lecture", lectureSchema);
