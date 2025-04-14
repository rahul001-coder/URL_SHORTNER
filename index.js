const express = require('express');
const urlRoutes = require("./routes/url");
const userRoutes = require("./routes/user");
const { connecttomongodb } = require('./connect');
const { restricttologgedinuseronly, checkauth } = require('./middelware/auth');
const cookieParser = require("cookie-parser");
const URL = require("./models/url");
const app = express();
const path = require("path");
const staticRoute = require('./routes/staticrouter');
const PORT = 3001; //This tells Express: ✅ "Parse incoming JSON data"
//✅ "Store the parsed data in req.body"
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
connecttomongodb("mongodb://127.0.0.1:27017/short_url")
    .then(() => console.log("Mongodb connected"));
app.use(express.urlencoded({ extended: false })); // form parsing
app.use(express.json());
app.use(cookieParser()); // json parsing 
app.use("/", checkauth, staticRoute);
app.use("/user", userRoutes);
app.use("/url", restricttologgedinuseronly, urlRoutes);
app.get('/url/:shortId', async(req, res) => {
    const shortId = req.params.shortId;
    const entry = await URL.findOneAndUpdate({ shortId }, { $push: { visitHistory: { timestamp: Date.now() } } }, { new: true } // Ensures updated document is returned
    );

    if (!entry) {
        return res.status(404).send("Short URL not found"); // ✅ Handle missing entry
    }

    res.redirect(entry.redirectURL); // ✅ Redirect only if entry exists
});

app.listen((PORT), () => console.log("server started at port 3001"));