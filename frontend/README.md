# EcoMart – Sustainable Product Store

EcoMart is a modern, eco-friendly e-commerce application built with Next.js 15/16 and Express.js. It features a premium design, role-based authentication, and a full product management system.

## 🚀 Features

- **Role-Based Authentication**: Secure login/signup system with NextAuth.js (User & Admin roles).
- **Dark/Light Mode**: Fully themeable UI with automatic system detection.
- **Product Management**:
  - Full CRUD operations for Admins.
  - Advanced filtering (Category, Price, Eco-Rating).
  - Search and Sorting functionalities.
- **Responsive Design**: Optimized for Mobile, Tablet, and Desktop.
- **Dashboard**:
  - User Dashboard: Order history, profile management.
  - Admin Dashboard: Product inventory, order tracking, analytics.
- **Sustainable UX**: Eco-friendly tips and impact indicators throughout the app.

## 🛠 Technology Stack

### Frontend

- **Framework**: Next.js 15/16 (App Router)
- **Styling**: Tailwind CSS + Framer Motion (Animations)
- **State Management**: React Hooks + URL Params
- **Authentication**: NextAuth.js v5
- **Icons**: Lucide React
- **Notifications**: SweetAlert2 & React Hot Toast

### Backend

- **Server**: Express.js
- **Database**: MongoDB (Mongoose ODM)
- **API**: RESTful API endpoints

## 📂 Project Structure

```
c:\Projects\EcoMart\
├── frontend\           # Next.js Frontend Application
│   ├── app\            # App Router Pages & Layouts
│   ├── components\     # Reusable UI Components
│   ├── lib\            # Utilities (Firebase, API)
│   └── public\         # Static Assets
├── backend\            # Express.js API Server
│   ├── models\         # Mongoose Schemas
│   ├── routes\         # API Routes
│   └── controllers\    # Request Handlers
```

## ⚡ Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB connection string

### Installation

1. **Clone the repository** (if applicable)

2. **Setup Backend**

   ```bash
   cd backend
   npm install
   # Create .env file with PORT and MONGODB_URI
   npm run dev
   ```

3. **Setup Frontend**

   ```bash
   cd frontend
   npm install
   # Create .env.local file with configuration
   npm run dev
   ```

4. **Access the App**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

## 🔑 Demo Credentials

**User Account:**

- Email: `user@ecomart.com`
- Password: `password123`

**Admin Account:**

- Email: `admin@ecomart.com`
- Password: `admin123`

## 📖 Route Summary

- `/` - Landing Page (Public)
- `/products` - Product Listing (Public)
- `/products/[id]` - Product Details (Public)
- `/login` & `/register` - Authentication
- `/dashboard` - Protected User Dashboard
- `/dashboard/admin/*` - Protected Admin Routes

## 🤝 Contribution

Feel free to fork this project and submit pull requests.
