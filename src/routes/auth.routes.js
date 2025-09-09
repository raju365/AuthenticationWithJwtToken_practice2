const express = require('express');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model')
const router = express.Router();

/* POST /register req.body = {username,password} */
router.post('/register', async (req, res) => {
    const { username, password } = req.body
    
    // checking user already exists or not
    const isUserAlreadyExists = await userModel.findOne({
        username
    })

    if (isUserAlreadyExists){
        return res.status(409).json({
            message:"User already exists"
        })
    }
    // register a new user
    const user = await userModel.create({username,password})

    // creating jsonwebtoken for authentication
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET)

    // send token in cookie
    res.cookie('token',token)
    res.status(201).send({
        message: "User registered successfully",
        user
    })

})

// protected api
router.get('/user', async (req, res) => {
    const { token } = req.cookies.token;
    if (!token) {
        return res.status(401).json({
            message: "Unauthorized token not found"
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findOne({
            _id: decoded.id
        })
        return res.status(200).json({
            message: "User fetched successfully",
            user
        })
    } catch (error) {
        return res.status(401).json({
            message: "Unauthorized invalid token"
        })
    }


})



module.exports = router;
