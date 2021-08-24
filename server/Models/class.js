const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const classSchema = new mongoose.Schema({
    subjectName : {
        type : String,
        required : true,
    },
    students :  [{ type: ObjectId, ref: "Student" }]
}) 

mongoose.model("Class",classSchema)