const express = require('express');
const { handleureserrequest, handleureserlogin } = require('../controller/user'); // ✅ Import both functions in one line

const router = express.Router();

router.post("/", handleureserrequest);

// ✅ Fix the incorrect route path
router.post("/login", handleureserlogin); // Removed "user/" prefix

module.exports = router;