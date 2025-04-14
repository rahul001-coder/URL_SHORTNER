 const USER = require('../models/users');
 const { v4: uuidv4 } = require('uuid');
 const { setUser } = require('../services/auth');
 async function handleureserrequest(req, res) {
     const { name, email, passward } = req.body;
     await USER.create({
         name: name,
         email: email,
         passward: passward,
     })
     return res.render("home");
 }
 async function handleureserlogin(req, res) {
     const { email, passward } = req.body;
     const user = await USER.findOne({ email, passward });
     if (!user) return res.render("login", { error: "invalid USER" });

     const token = setUser(user);
     // res.cookie("uuid", token);
     return res.json({ token });
 }
 module.exports = { handleureserrequest, handleureserlogin };