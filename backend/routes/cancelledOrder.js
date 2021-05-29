const {CancelledOrder} = require('../models/cancelledOrder');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    let cancelledorder= new CancelledOrder({
       reason:req.body.reason
      




        
    })
    cancelledorder= await cancelledorder.save();

    if(!cancelledorder)
    return res.status(400).send('the cancelledorder cannot be created!')

    res.send(cancelledorder);
})

module.exports =router;