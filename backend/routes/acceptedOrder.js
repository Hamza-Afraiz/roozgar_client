const {AcceptedOrder} = require('../models/acceptedOrder');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    let acceptedorder= new AcceptedOrder({
      price:req.body.price
      




        
    })
    acceptedorder= await acceptedorder.save();

    if(!acceptedorder)
    return res.status(400).send('the acceptedorder cannot be created!')

    res.send(acceptedorder);
})

module.exports =router;