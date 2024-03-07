const express = require('express')
const mongoose = require('mongoose')
const memeModel = require('../data/schema')
const userModel = require('../data/userschema')
const joi_model = require('../joi')
const router = express.Router()
require("dotenv").config()
const Joi_schema= ((req,res,next)=>{
    const { error } = joi_model.validate(req.body,{
        abortEarly:false,
    });
    if(error){
        res.status(400).send(error.details)
    }
    else{
        next()
    }

})

//Register
router.post('/Register', async (req,res)=>{
    console.log(req.body)
    const user = new userModel(req.body)
    await user.save()
    res.send({message : "data saved successfully"})
})

router.post('/auth/Login', async (req,res)=>{
    const { email, password }  = req.body;
    console.log(email, password)
    try {
        const user = await userModel.findOne({ email });
    
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        
        const isPasswordValid = user.comparePassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        res.status(200).json({ message: 'Login successful'});
        
    } catch (err) {
        console.error('Error:', err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
})

router.delete("/auth/logout/:_id", async (req,res)=>{
    const id  = req.params._id
    console.log(id)
    const data = await memeModel.deleteOne({_id : id})
    console.log(data);
    res.send({msg : true , message : "data deleted successfully"})
})
router.get('/users',async (req,res)=>{
    const data = await userModel.find()
    res.json({msg : true , data : data})
})

//read
router.get('/data',async (req,res)=>{
    const data = await memeModel.find()
    res.json({msg : true , data : data})
})
// create data 
router.post("/create",Joi_schema, async (req,res)=>{
    console.log(req.body)
    const data = new memeModel(req.body)
    await data.save()
    res.send({message : "data saved successfully"})
})
// update data 
router.put("/update/:_id", Joi_schema, async (req, res) => {
    let _id = req.params._id;
    let meme_id = req.body.memeId;
    let title = req.body.memeTitle;
    let meme_user = req.body.user;
    let meme_img = req.body.image;
    let tags = req.body.tags;
    const data = await memeModel.findOneAndUpdate({_id: _id}, { memeId: meme_id, memeTitle: title, user: meme_user, image: meme_img, tags: tags});
    console.log(data);
    res.send({msg : true , message : "Data updated successfully"});
});
//delete data
router.delete("/delete/:_id", async (req,res)=>{
    const id  = req.params._id
    console.log(id)
    const data = await memeModel.deleteOne({_id : id})
    console.log(data);
    res.send({msg : true , message : "data deleted successfully"})
})
module.exports = router;