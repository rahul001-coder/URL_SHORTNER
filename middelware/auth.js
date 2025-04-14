const { getUser } = require('../services/auth');

// ✅ Middleware to restrict access to logged-in users only
async function restricttologgedinuseronly(req, res, next) {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.redirect('/login');
    }

    const token = authHeader.split('Bearer ')[1].trim();

    try {
        const user = await getUser(token);
        if (!user) return res.redirect('/login');

        req.user = user;
        next();
    } catch (err) {
        console.error("Error verifying user:", err);
        return res.redirect('/login');
    }
}

// ✅ Middleware to optionally attach user info (for non-protected routes)
async function checkauth(req, res, next) {
    const authHeader = req.headers['authorization'];

    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split('Bearer ')[1].trim();

        try {
            const user = await getUser(token);
            req.user = user; // Might be undefined if token is invalid — that's fine for public pages
        } catch (err) {
            console.warn("Invalid token in checkauth:", err);
        }
    }

    next(); // Always proceed
}

module.exports = { restricttologgedinuseronly, checkauth };