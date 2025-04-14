🔗 URL Shortener
A simple and secure URL shortener built with Node.js, Express, and MongoDB, with user authentication, short URL creation, and visit tracking.

🚀 Features
✂️ Shorten URLs

🔐 User Sign Up / Login

📊 Track visits with timestamps

🔒 Protected routes using token-based auth

📄 EJS templating for frontend

⚙️ Setup
bash
Copy
Edit
git clone https://github.com/your-username/url-shortener.git
cd url-shortener
npm install
node app.js
Make sure MongoDB is running on mongodb://127.0.0.1:27017/short_url.

📁 Key Routes
/ — Home (with checkAuth)

/signup, /login — Auth pages

/url — Protected routes for shortening (requires auth)

/url/:shortId — Redirect with visit tracking

🔐 Auth Middleware
checkAuth({ protected: true }) → Redirects if not logged in

checkAuth() → Attaches user if available (non-blocking)

🧠 Tech
Node.js • Express • MongoDB • EJS • Custom Middleware

