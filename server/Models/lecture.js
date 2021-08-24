const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const lectureSchema = new mongoose.Schema({
    subjectName : {
        type : String,
        required : true,
    },
    teacherId : {
        type : ObjectId,
        ref:"Teacher"
    },
    ClassId : {
        type : ObjectId,
        ref:"Class"
    },
}) 

mongoose.model("Lecture",lectureSchema)