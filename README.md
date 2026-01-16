# Smart Email Categorization Service

AI-powered email classification system that automatically categorizes emails into Work, Personal, Promotion, Social, Finance, Updates, and Spam using OpenAI API with manual correction capability.

## 🎯 Features

-  ✅ Automatic email classification using AI (with fallback to keyword-based classification)
-  ✅ 7 category classification: Work, Personal, Promotion, Social, Finance, Updates, Spam
-  ✅ Manual correction with improved UX
-  ✅ Real-time accuracy tracking
-  ✅ 40+ realistic sample emails
-  ✅ MongoDB for data persistence
-  ✅ React frontend with Tailwind CSS
-  ✅ Express.js REST API backend

## 📁 Project Structure

```
Email service/
├── README.md
│
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── EmailCard.jsx       # Email card with correction UI
│   │   │   ├── EmailList.jsx       # Email list container
│   │   │   └── AccuracyStats.jsx   # Accuracy display with progress bar
│   │   ├── services/
│   │   │   └── api.js              # API client
│   │   ├── assets/                 # Static assets
│   │   ├── App.jsx                 # Main app component
│   │   ├── index.css               # Tailwind CSS
│   │   └── main.jsx                # React entry point
│   ├── public/
│   ├── index.html
│   ├── eslint.config.js
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── package.json
│   └── README.md
│
└── server/                          # Node.js Backend
    ├── src/
    │   ├── data/
    │   │   └── sampleEmails.js      # 40+ sample emails
    │   ├── services/
    │   │   └── classifyEmail.js     # AI classification with fallback
    │   ├── controllers/
    │   │   └── emailController.js   # Request handlers
    │   ├── models/
    │   │   └── Email.js             # MongoDB schema
    │   ├── routes/
    │   │   └── emailRoutes.js       # API routes
    │   ├── config/
    │   │   ├── db.js                # MongoDB connection
    │   │   └── openai.js            # OpenAI configuration
    │   └── app.js                   # Express app
    ├── .env                         # Environment variables
    ├── package.json
    └── README.md
```

## 🚀 Quick Start

### Prerequisites

-  Node.js (v16 or higher)
-  MongoDB Atlas account (or local MongoDB)
-  OpenAI API key (optional - has fallback classification)

### Backend Setup

1. **Navigate to server directory**

   ```bash
   cd server
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   The `.env` file should contain:

   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   OPENAI_API_KEY=your_openai_api_key
   ```

4. **Start the server**
   ```bash
   npm run dev
   ```
   Server will run on: **http://localhost:5000**

### Frontend Setup

1. **Navigate to client directory**

   ```bash
   cd client
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend will run on: **http://localhost:5173**

### Seed Database

Open the application in browser and click the **"Refresh"** button to seed the database with 40 sample emails.

## 📡 API Endpoints

### Get All Emails

```http
GET /api/emails
```

Returns all emails sorted by creation date (newest first).

### Seed Database

```http
POST /api/emails/seed
```

Deletes existing emails and seeds database with 40 sample emails.

### Update Email Category

```http
PUT /api/emails/:id
Body: { "category": "Work" }
```

Updates the user-corrected category for an email.

### Get Accuracy Stats

```http
GET /api/emails/accuracy/stats
```

Returns classification accuracy and category distribution.

Response:

```json
{
   "total": 40,
   "correct": 35,
   "accuracy": "87.50",
   "categories": {
      "Work": 6,
      "Personal": 4,
      "Promotion": 5,
      "Social": 4,
      "Finance": 4,
      "Updates": 5,
      "Spam": 4
   }
}
```

## 🎨 Categories

The system classifies emails into 7 categories:

1. **Work** - Professional emails, meetings, projects, HR communications
2. **Personal** - Friends, family, personal invitations
3. **Promotion** - Marketing, deals, discounts, special offers
4. **Social** - Social media notifications (Facebook, LinkedIn, Twitter, Instagram)
5. **Finance** - Bank statements, invoices, payment notifications
6. **Updates** - Software updates, newsletters, service notifications
7. **Spam** - Scams, phishing, unwanted promotional content

## 🧠 Classification Logic

1. **AI Classification** (Primary): Uses OpenAI API (gpt-3.5-turbo) for intelligent classification
2. **Keyword-based Fallback**: If OpenAI is unavailable, uses keyword matching
3. **Default**: If no patterns match, defaults to "Spam"

## 💾 Database Schema

```javascript
{
  from: String,           // Sender email address
  subject: String,        // Email subject
  body: String,          // Email body content
  category: String,      // AI-predicted category
  isCorrect: Boolean,    // Whether user correction matches AI
  userCategory: String,  // User-corrected category
  timestamps: true       // createdAt, updatedAt
}
```

## 🛠️ Technologies Used

### Frontend

-  React 18
-  Tailwind CSS
-  Vite
-  Fetch API

### Backend

-  Node.js
-  Express.js
-  MongoDB + Mongoose
-  OpenAI API
-  dotenv

## 📝 Sample Data

The application includes 40 realistic sample emails covering all 7 categories. Each category contains 4-6 examples with realistic content including:

-  Company communications
-  Online shopping deals
-  Personal messages
-  Social media notifications
-  Banking and finance updates
-  Software notifications
-  Spam and phishing attempts

## 🎯 Usage

1. Click **"Refresh"** to load sample emails
2. View AI-classified emails with color-coded category badges
3. Click **"Correct Category"** on any email to change its classification
4. Select the correct category and click **"Save"**
5. View accuracy percentage at the top
6. Success message confirms when category is updated

## 🔧 Development

### Backend Development

```bash
cd server
npm run dev  # Runs with nodemon for auto-reload
```

### Frontend Development

```bash
cd client
npm run dev  # Runs Vite dev server with HMR
```

### Build for Production

```bash
cd client
npm run build  # Creates optimized production build
```

## 📦 Dependencies

### Backend

-  express
-  mongoose
-  cors
-  dotenv
-  openai

### Frontend

-  react
-  react-dom
-  tailwindcss
-  vite

## 🤝 Contributing

This is an educational project demonstrating AI-powered email classification with manual correction workflows.

## 📄 License

MIT License - Feel free to use this project for learning purposes.
