const express = require('express');
const router = express.Router();
router.get('/', (req, res) => { return res.render("home"); })
router.get('/sighnup', (req, res) => {
    return res.render("sighnup");
});
router.get('/login', (req, res) => {
    return res.render("login");
});
module.exports = router;