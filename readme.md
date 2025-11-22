# TinyLink – URL Shortener

A simple, efficient, MongoDB-based URL shortener with analytics, REST APIs, and a clean dashboard UI.

🚀 Features
🔗 URL Shortening

Convert long URLs into short codes (6–8 characters)

Optional custom short codes

Automatic code generation

📊 Analytics

Track total clicks

See last clicked timestamp

Dedicated stats page per link

Dashboard listing all links

🌐 Web UI

Clean dashboard page

Create, search, delete links

Auto-copy short URLs

TailwindCSS UI

🧩 REST API

POST /api/links → Create short link

GET /api/links → List links

GET /api/links/:code → Get stats

DELETE /api/links/:code → Delete link


📁 Project Structure
tinylink/
│
├── src/
│   ├── server.js
│   ├── db.js
│   ├── models/
│   │   └── Link.js
│   ├── routes/
│   │   ├── api.js
│   │   └── pages.js
│   ├── middleware/
│   │   └── validate.js
│   └── utils/
│       └── codeGen.js
│
├── views/
│   ├── dashboard.ejs
│   ├── stats.ejs
│   └── partials/
│       ├── header.ejs
│       └── footer.ejs
│
├── public/
│   └── css/
│       └── style.css
│
├── .env
├── .env.example
├── package.json
└── README.md

🛠️ Installation
1️⃣ Clone or create folder
cd E:\tinylink

2️⃣ Install dependencies
npm install

3️⃣ Create .env
MONGODB_URI=mongodb://127.0.0.1:27017/tinylink
PORT=3000
BASE_URL=http://localhost:3000
APP_VERSION=1.0

4️⃣ Run development server
npm run dev


Open browser:
👉 http://localhost:3000

🧪 REST API Documentation
➤ Create Short Link

POST /api/links
Request body (JSON):

{
  "targetUrl": "https://example.com",
  "code": "custom01"
}


Response:

{
  "code": "custom01",
  "targetUrl": "https://example.com",
  "totalClicks": 0,
  "lastClicked": null
}

➤ Get All Links

GET /api/links

Response:

[
  {
    "code": "abc123",
    "targetUrl": "https://google.com",
    "totalClicks": 10,
    "lastClicked": "2024-01-12T12:00:00.000Z"
  }
]

➤ Get Single Link Stats

GET /api/links/:code

➤ Delete Link

DELETE /api/links/:code

Returns: 204 No Content

🌐 Web UI Pages
/ – Dashboard

Create new short link

Search links

View table of all links

Delete a link

/code/:code – Stats page

Full analytics for one link

/:code – Redirect

Redirects to the original URL

Increases click count

📦 Scripts
Command	Description
npm run dev	Start dev server
npm start	Start production server
npm install	Install dependencies
🧑‍💻 Technologies Used

Node.js

Express

MongoDB + Mongoose

EJS Templates

TailwindCSS

Nodemon

dotenv

✔️ Completed Requirements (for assignment)

URL Shortener

Unique short codes

Redirect logic

Dashboard UI

Stats page

Delete functionality

REST APIs

MongoDB storage

Full folder structure

EJS templating