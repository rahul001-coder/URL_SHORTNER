const express = require("express");
const app = express();
const { HandlegenerateNewShurl } = require("../controller/url");
const router = express.Router();
router.post("/", HandlegenerateNewShurl);
module.exports = router;