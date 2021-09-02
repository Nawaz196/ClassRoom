const express = require('express'); 
const mongoose = require('mongoose');
const router = express.Router()
const Subject = require('../Models/subject')

router.post("/makeclass",(req,res)=>{
    const{subjectName, students}=req.body
    const subject= new Subject({
        subjectName,
        students,
    })
    subject.save().then((doc)=>{
        res.json({message:"Saved",doc})
    })
    .catch((err)=>{
        console.log(err)
    })
})

module.exports = router;