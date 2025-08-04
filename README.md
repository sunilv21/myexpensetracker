# Expense Tracker 💸

A full-stack MERN (MongoDB, Express, React, Node.js) application to manage and track your personal expenses with authentication, category-wise tracking, and dashboards.

---

## 🚀 Live Links

- 🔗 **Frontend (Vercel)**:  https://expensetracker-six-sigma.vercel.app/ 
- 🔗 **Backend (Render)**: https://myexpensetracker-1da1.onrender.com
- 🔗 **GitHub Repository**: https://github.com/sunilv21/myexpensetracker.git

---

## 📦 Features

- User Registration & Login (JWT-based)
- Add, and Delete Expenses
- Expense Filtering by Date and Category
- Dashboard for Total and Recent Expenses
- Admin Panel to View All Expenses and Audit Logs
- CSV Export for Admins
- Insight Charts using Recharts
- Responsive UI with TailwindCSS / Material UI
- Toast Notifications for Feedback

---

## 🧰 Tech Stack

- **Frontend:** React, Redux Toolkit, TailwindCSS or MUI, Axios
- **Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT
- **Deployment:** Render (Backend), Vercel/Render (Frontend)
- **Charting:** Recharts (Insights)

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/sunilv21/myexpensetracker.git
cd myexpensetracker
```

### 2. Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in `backend/`:

```env
PORT=5000
MONGO_URI=your_mongo_db_uri
JWT_SECRET=your_jwt_secret
```

Start the server:

```bash
npm run dev
```

### 3. Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_BASE_URL=https://myexpensetracker-1da1.onrender.com/api
```

Start the frontend:

```bash
npm run dev
```

---

## ⚙️ Deployment

### Backend (Render):

- Connect GitHub repo
- Add Environment Variables (`MONGO_URI`, `JWT_SECRET`)
- Set build command: `npm install`
- Set start command: `node index.js` or `npm start`

### Frontend (Vercel or Render):

- Set `VITE_API_BASE_URL` to backend's deployed URL
- Set build command: `npm run build`
- Output directory: `dist` (for Vite)

---

## 📁 Folder Structure

```txt
myexpensetracker/
├── server/
│   ├── server.js
│   ├── config/db.js
│   ├── package.json
│   ├── package-lock.json
│   ├── middlewares/
│   │   ├── authMiddleware.js
│   │   ├── errorHandler.js
│   │   └── notFound.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── expenseRoutes.js
│   │   └── auditRoutes.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── expenseController.js
│   │   └── auditController.js
│   ├── models/
│   │   ├── User.js
│   │   ├── Expense.js
│   │   └── AuditLog.js
│   └── utils/
│       └── generateToken.js
│
├── client/
│  ├───.gitignore
│  ├───eslint.config.js
│  ├───index.html
│  ├───package-lock.json
│  ├───package.json
│  ├───README.md
│  ├─ ──vercel.json
│  ├───vite.config.js
│  ├───public\
│  │   ├───favicon.png
│  └───vite.svg
│  └───src\
│      ├───App.css
│      ├───App.jsx
│      ├───index.css
│      ├───main.jsx
│      ├───api\
│      │   ├───audit.js
│      │   ├───auth.js
│      │   ├───axios.js
│      │   └───expense.js
│      ├───assets\
│      │   └───react.svg
│      ├───components\
│      │   ├───Footer.jsx
│      │   ├───Header.jsx
│      │   ├───Loader.jsx
│      │   └───ProtectedRoute.jsx
│      ├───context\
│      │   └───AuthContext.jsx
│      └───pages\
│          ├───AdminPanel.jsx
│          ├───AuditLogs.jsx
│          ├───Dashboard.jsx
│          ├───ExpenseForm.jsx
│          ├───Insights.jsx
│          ├───LoginPage.jsx
│          ├───NotFound.jsx
│          └───RegisterPage.jsx
│
├── screenshots/
│   ├── login.png
│   ├── register.png
│   ├── dashboard.png
│   ├── add expenses.png
│   ├── admin panel.png
│   ├── audit logs.png
│   └── insight Pie Chart.png
│   └── insight Line Graph.png
```

---


## 🧑‍💻 Author

**Harshit Sharma**  
mail- radsting16@gmail.com  
MOb- 9826878405  
GitHub Profile - https://github.com/sunilv21
