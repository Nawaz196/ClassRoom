const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const teacherSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  subjects: {
    type: Array,
  },
  lectures: [{ type: ObjectId, ref: "Lecture" }],
});

module.exports = mongoose.model("Teacher", teacherSchema);
