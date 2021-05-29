const {Comment} = require('../models/comment');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    let comment = new Comment({
       description:req.body.description,
      




        
    })
    comment = await comment.save();

    if(!comment)
    return res.status(400).send('the cooment cannot be created!')

    res.send(comment);
})

module.exports =router;