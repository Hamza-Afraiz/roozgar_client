const {Client} = require('../models/client');
const express = require('express');
const router = express.Router();

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');




router.post('/register', async (req,res)=>{
    const user = await Client.findOne({userName: req.body.userName,cnic:req.body.cnic})
    const secret = process.env.secret;
    if(user) {
        return res.status(400).send('This user already exist');
    }

    let client = new Client({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        userName:req.body.userName,
        phone:req.body.phone,
        cnic:req.body.cnic,
        email:req.body.email,
        image:req.body.image,
        passwordHash: bcrypt.hashSync(req.body.password, 10),
       
       
      
        



        
    })
    client = await client.save();

    if(!client)
    return res.status(400).send('the client cannot be created!')

    res.send(client);
})

router.get(`/`, async (req, res) =>{
    const userList = await Client.find().select('-passwordHash');

    if(!userList) {
        res.status(500).json({success: false})
    } 
    res.send(userList);
})

router.get('/:id', async(req,res)=>{
    const user = await Client.findById(req.params.id).select('-passwordHash');

    if(!user) {
        res.status(500).json({message: 'The user with the given ID was not found.'})
    } 
    res.status(200).send(user);
})



router.put('/:id',async (req, res)=> {

    const userExist = await Client.findById(req.params.id);
    let newPassword
    if(req.body.password) {
        newPassword = bcrypt.hashSync(req.body.password, 10)
    } else {
        newPassword = userExist.passwordHash;
    }

    const user = await Client.findByIdAndUpdate(
        req.params.id,
        {
            name: req.body.name,
            email: req.body.email,
            passwordHash: newPassword,
            phone: req.body.phone,
            isAdmin: req.body.isAdmin,
            street: req.body.street,
            apartment: req.body.apartment,
            zip: req.body.zip,
            city: req.body.city,
            country: req.body.country,
        },
        { new: true}
    )

    if(!user)
    return res.status(400).send('the user cannot be created!')

    res.send(user);
})

router.post('/login', async (req,res) => {
    const user = await Client.findOne({userName: req.body.userName})
    const secret = process.env.secret;
    if(!user) {
        return res.status(400).send('The user not found');
    }

    if(user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
        const token = jwt.sign(
            {
                userId: user.id,
               
            },
            secret,
            {expiresIn : '1d'}
        )
       
        res.status(200).send({user: user , token: token}) 
    } else {
       res.status(400).send('password is wrong!');
    }

    
})



router.delete('/:id', (req, res)=>{
    Client.findByIdAndRemove(req.params.id).then(user =>{
        if(user) {
            return res.status(200).json({success: true, message: 'the user is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "user not found!"})
        }
    }).catch(err=>{
       return res.status(500).json({success: false, error: err}) 
    })
})

router.get(`/get/count`, async (req, res) =>{
    const userCount = await Client.countDocuments((count) => count)

    if(!userCount) {
        res.status(500).json({success: false})
    } 
    res.send({
        userCount: userCount
    });
})

module.exports =router;