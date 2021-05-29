const {Service} = require('../models/service');
const express = require('express');
const router = express.Router();

router.post('/', async (req,res)=>{
    let service  = new Service({
        vendorName:req.body.vendorName,
        
      




        
    })
    service  = await service.save();

    if(!service)
    return res.status(400).send('the serivce  cannot be created!')

    res.send(service);
})
router.get(`/`, async (req, res) => {
    let filter = {};
    if (req.query.id) {
        filter = { category: req.query.id };
    }

    const service = await Service.find(filter).populate('category');

    if (!service) {
        res.status(500).json({ success: false });
    }
    res.send(service);
});

module.exports =router;