const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const subjectSchema = new mongoose.Schema({
    subjectName : {
        type : String,
        required : true,
    },
    students :  [{ type: ObjectId, ref: "Student" }]
}) 

module.exports= mongoose.model("Subject",subjectSchema)