# 🌿 EcoMart | Sustainable E-Commerce Platform

EcoMart is a premium, full-stack e-commerce application designed for the environmentally conscious consumer. It offers a seamless shopping experience for sustainable, ethically sourced, and eco-friendly products.

---

## 📖 Table of Contents
1. [Short Description](#short-description)
2. [Technologies Used](#technologies-used)
3. [Core Features](#core-features)
4. [The Process](#the-process)
5. [Challenges Faced](#challenges-faced)
6. [What I Learned](#what-i-learned)
7. [Possible Improvements](#possible-improvements)
8. [Future Enhancements](#future-enhancements)
9. [Getting Started](#getting-started)

---

## 🌟 Short Description
EcoMart is built to bridge the gap between sustainability and modern e-commerce. It features a high-performance frontend with Next.js 15, a robust backend with Express and MongoDB, and secure authentication via Firebase and Google. The platform emphasizes a "Forest-Dark" aesthetic, providing a premium feel while promoting ethical consumption.

---

## 🛠️ Technologies Used

### Frontend
- **Next.js 15 (App Router):** Chosen for its advanced Server Components and excellent SEO capabilities.
- **Tailwind CSS:** Used for rapid UI development and maintaining a consistent "Forest-Dark" theme.
- **Framer Motion:** Implemented to add smooth micro-animations and enhance user engagement.
- **Lucide React:** For a sleek, consistent iconography across the app.
- **Recharts:** Used in the dashboard for real-time data visualization.

### Backend
- **Node.js & Express:** Used to build a scalable and efficient RESTful API.
- **MongoDB & Mongoose:** Provide a flexible schema-less database for product and order management.
- **Firebase Admin SDK:** Ensures secure server-side verification of user sessions.

### Authentication
- **Firebase Authentication:** Handles Google and Email/Password login flows securely.
- **Next-Auth (v5 Beta):** Integrated for clean session management and protected routes.

---

## ✨ Core Features

| Problem | Solution |
| :--- | :--- |
| **Finding Truly Eco-Friendly Products** | Verified Eco-Rating system and detailed sustainable specs for every item. |
| **Complex Search and Filtering** | Advanced multi-criteria filtering (Category, Price, Rating) with instant UI updates. |
| **Cluttered Shopping Experience** | A premium "Forest-Dark" design system that reduces eye strain and emphasizes content. |
| **Uncertain Environmental Impact** | Dedicated Dashboard for users to track their cumulative "Eco Impact" (e.g., Plastic saved, Trees planted). |
| **Complex Onboarding** | Social Login integration with Google for one-click access. |

---

## 🏗️ The Process
1.  **Conceptualization:** Defined the core mission of authentic sustainability.
2.  **UI/UX Design:** Developed a custom "Forest-Dark" color palette and design system in vanilla CSS and Tailwind.
3.  **Backend Architecture:** Designed a MongoDB schema to handle complex product attributes (materials, certifications, impact metrics).
4.  **Frontend Implementation:** Built responsive components starting from a sticky Navbar to dynamic Product Detail pages.
5.  **Auth Integration:** Set up Firebase for social login and linked it with Next-Auth for session persistence.
6.  **Dashboard Development:** Created role-based dashboards (User/Admin) with data visualization using Recharts.

---

## 🧗 Challenges Faced
-   **Next.js 15 Migration:** Adapting to the breaking change where `params` and `searchParams` are now promises in the App Router.
-   **Theme Consistency:** Ensuring that "Dark Mode" remained highly readable (sufficient contrast) while maintaining the deep forest green aesthetic.
-   **Complex Filters:** Handling simultaneous URL-syncing and server-side fetching for multiple filter fields without degrading performance.

---

## 🎓 What I Learned
-   **Server Components vs. Client Components:** Mastering the balance between SEO-friendly static content and interactive client-side logic.
-   **Middleware Security:** Implementing role-based access control (RBAC) to protect dashboard routes effectively.
-   **Scalable CSS:** Organizing design tokens and reusable classes to maintain a large UI footprint without redundancy.

---

## 🚀 Possible Improvements
-   **Optimistic UI:** Adding optimistic updates for actions like "Wishlist" or "Add to Cart" to make the app feel even faster.
-   **Skeleton Loaders:** Refining skeleton states for all data-heavy sections to reduce perceived latency.
-   **Better Error Handling:** Implementing more granular error boundaries and user-friendly "Toast" notifications for API failures.

---

## 🔮 Future Enhancements
-   **AI Recommendations:** Suggesting products based on a user's previous eco-friendly choices.
-   **Carbon Footprint Tracker:** A real-time calculator for the shipping-related carbon cost of an order.
-   **Artisan Marketplace:** Allowing small-scale eco-producers to list their products directly via an Admin Dashboard.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- MongoDB Atlas account (or local MongoDB)
- Firebase Project

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sohaibislam45/EcoMart.git
   cd EcoMart
   ```

2. **Backend Setup**
   ```bash
   cd backend
   npm install
   # Create .env with MONGODB_URI and PORT
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd ../frontend
   npm install
   # Create .env.local with NEXT_PUBLIC_FIREBASE_CONFIG and NEXTAUTH_SECRET
   npm run dev
   ```

4. **Visit the app**
   Open [http://localhost:3000](http://localhost:3000) in your browser.

---

Developed with ❤️ by [Sohaib Islam](https://github.com/sohaibislam45)
