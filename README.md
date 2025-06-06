# 🪙 EarnZone - Micro-Task & Earning Platform

EarnZone is a full-stack MERN-based web application that allows users to earn coins by completing micro tasks. The platform has three types of users: **Workers**, **Buyers**, and **Admins** — each with dedicated role-based dashboards.

## 🚀 Live Link

[👉 Visit EarnZone Live](https://earn-zone-client.firebaseapp.com/)
 (https://earn-zone-client.web.app/)
---

## 📌 Features

### ✅ General
- Firebase authentication with email/password & Google login
- Role-based access control using JWT and Firebase
- Protected routes for workers, buyers, and admins
- Responsive UI with Tailwind CSS

### 👨‍💼 Worker Features
- View available tasks
- Submit task proofs (image, description)
- Earn coins upon approval
- See ranking among top earners

### 💼 Buyer Features
- Create new tasks with details & coin rewards
- See list of submitted task proofs
- Approve or reject submissions

### 🛡️ Admin Features
- View all users
- Change user roles (make worker/buyer/admin)
- Delete user accounts
- Manage all tasks

### 🧩 Common Features
- Real-time notifications (submitted, approved, rejected)
- Image uploads via imgBB API
- Coin-based system
- Stripe / Dummy payment integration
- Dynamic dashboard with role info and available coins

---

## 🛠️ Tech Stack

### Frontend:
- React.js
- Tailwind CSS
- React Router DOM
- Axios
- React Hook Form
- Firebase (Auth)
- imgBB API

### Backend:
- Node.js
- Express.js
- MongoDB
- JWT (Role-based authentication)
- CORS & dotenv

---

## ⚙️ How to Run Locally

### 1. Clone the Repo
```npm 
git clone https://github.com/joynul24/earn-zone-client
cd earnzone
