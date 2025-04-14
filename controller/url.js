const { nanoid } = require("nanoid"); // Import nanoid to generate unique short IDs
const URL = require('../models/url'); // Import the URL model

async function HandlegenerateNewShurl(req, res) {
    const body = req.body;

    // Check if the request body contains a URL
    if (!body.redirectURL) return res.status(400).json({ error: "URL required" });

    const shortID = nanoid(8); // Generate a unique 8-character short ID

    // Store the new short URL entry in the MongoDB database
    await URL.create({
        shortId: shortID,
        redirectURL: body.redirectURL, // ✅ Corrected
        visitHistory: []
    });

    return res.render("home", { id: shortID }); // Send back the generated short ID
}

module.exports = {
    HandlegenerateNewShurl,
};