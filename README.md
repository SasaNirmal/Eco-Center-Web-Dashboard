# 🌿 Eco-Center Web Dashboard

A feature-rich web application designed to streamline the management of vegetable data for economic centers. This dashboard enables users to perform CRUD operations efficiently, ensuring seamless data handling and visualization.

---

## 📜 Table of Contents
- [🌟 Features](#-features)
- [🚀 Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [⚙️ Installation](#️-installation)
- [💻 Usage](#-usage)
- [📊 Screenshots](#-screenshots)
- [🛠️ Features in Progress](#%EF%B8%8F-features-in-progress)
- [🤝 Contributing](#-contributing)
- [📞 Contact](#-contact)

---

## 🌟 Features
- **CRUD Operations**: Manage vegetable details including name, code, price, quantity, and image.
- **Admin Dashboard**: A responsive interface for admins to add, update, view, and delete vegetables.
- **Data Visualization**: Charts and graphs to analyze inventory trends.
- **Notifications**: Display real-time notifications for system events.
- **Authentication**: Secure admin sign-up and sign-in functionality.
- **Image Uploads**: Upload and display vegetable images effortlessly.

---

## 🚀 Tech Stack
### Frontend
- React.js
- Chart.js (for data visualization)
- Axios (for API communication)

### Backend
- Node.js
- Express.js
- MongoDB (with Mongoose for schema management)

### Others
- Multer (for file uploads)
- SweetAlert2 (for pop-up notifications)

---

## 📂 Project Structure
```plaintext
Eco-Center-Web-Dashboard/
├── backend/
│   ├── models/          # Mongoose schemas
│   ├── routes/          # API routes
│   ├── middleware/      # Authentication and other middlewares
│   ├── server.js        # Main backend server
│   └── config/          # Environment variables and database configuration
├── frontend/
│   ├── src/
│   │   ├── components/  # React components
│   │   ├── pages/       # Main pages (Dashboard, Login, etc.)
│   │   ├── App.js       # App entry point
│   │   └── index.js     # Main ReactDOM render
├── .env                 # Environment variables
├── package.json         # Dependencies
└── README.md            # Project documentation
