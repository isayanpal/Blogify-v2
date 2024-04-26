const express = require("express");
const bcrypt =  require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const router = express.Router();

router.post("/register", async(req,res)=>{
    const {username,email, password} = req.body;

    try {
        if (!username || !email || !password) {
          return res.status(400).json({ message: "Please enter all fields" });
        }
        // check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({
            message: "User already exists",
          });
        }
        // hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        // create User
        const user = await User.create({
          username,
          email,
          password: hashedPassword,
        });
        if (user) {
          return res.status(201).json({
            _id: user.id,
            username: user.username,
            email: user.email,
            message: "User registered",
          });
        } else {
          throw new Error("Invalid user data");
        }
      } catch (error) {
        return res.status(500).json({
          message: error.message,
        });
      }
});

router.post("/login", async(req,res)=>{
    const {username, password} = req.body;
    const user = await User.findOne({username});
    const passOk = bcrypt.compareSync(password, user.password);
    if(passOk){
        // logged in
        jwt.sign({username, id: user._id}, process.env.JWT_SECRET,{},(err,token)=>{
            if(err) throw err;
            res.cookie("token",token).json({
                id:user._id,
                username,
                token
            });
        })
    } else {
        res.status(400).json("Wrong credentials");
    }
});

router.get("/profile", (req,res)=>{
    const {token}= req.cookies;
    jwt.verify(token, process.env.JWT_SECRET,{},(err,info)=>{
      if(err) throw err;
      res.json(info);
    });
});

router.post("/logout",(req,res)=>{
  res.cookie("token","").json("ok logged out");
})

module.exports = router; 