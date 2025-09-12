# 📌 Project Deliverables – Weekendly

## 1. Working Application

-   Live URL: [https://weekendly.arnabsamanta.in](https://weekendly.arnabsamanta.in)
-   Deployment:
    -   Frontend → Netlify
    -   Backend → DigitalOcean

---

## 2. Code Repository

-   GitHub Repo: [Weekendly](https://github.com/learner-enthusiast/React_calender_app)
-   Tech Stack: MERN (MongoDB, Express, React, Node.js) + React Big Calendar

---

## 3. Documentation

### Requirements

-   Full-stack calendar application
-   Responsive and modern interface
-   Secure authentication and authorization
-   Holiday integration using Calendarific API
-   Persistent storage with MongoDB

### Major Design Decisions & Trade-offs

-   Chose **React Big Calendar** for calendar functionality instead of building from scratch
-   Adopted **Redux** for predictable state management
-   Used **CSS Modules** to avoid naming conflicts and improve maintainability
-   Implemented **JWT authentication** with role-based access control for security
-   Split deployment with **Netlify** (frontend) and **DigitalOcean** (backend)

### Component & State Management

-   Modular and reusable components for events, forms, and calendar views
-   Centralized global state in **Redux store** (auth, events, holidays)
-   Custom hooks for API calls, data handling, and form logic

### UI & UX Enhancements

-   Fully responsive across desktop, tablet, and mobile
-   Multiple calendar views: **Month, Week, Agenda**
-   Consistent design with polished styles and navigation
-   Integrated notifications and smooth user flow

### Creative Features / Integrations

-   Holiday data integration from **Calendarific API**
-   **Role-based access**: User, Moderator, Admin
-   Database **seeding script** for holiday events
-   Hot Module Reloading enabled for development
-   Optimizations: code splitting, lazy loading, memoization, MongoDB indexing
-   **Category system** with custom color schemes for task types
-   **Icons for vibes and categories** to enhance identification
-   **Sub-calendar creation** for thematic segregation of tasks
-   **Filtering** by category or sub-calendar for focused task isolation

---

## 4. Deployment Summary

-   Frontend → Netlify (SPA routing with `_redirects`)
-   Backend → DigitalOcean (Express + MongoDB)
-   Database → MongoDB Atlas / Local MongoDB

---

## 5. Performance Optimizations

-   Code splitting and lazy loading
-   React.memo and useMemo for heavy computations
-   Indexed queries in MongoDB
-   API response caching

---

## 6. Security Features

-   JWT-based authentication with refresh tokens
-   Password encryption
-   Protected routes and role-based access control
-   Secure HTTP-only cookies

---

## 7. Testing & Development Tools

-   Jest for testing
-   ESLint and Prettier for code quality and consistency
-   Webpack with Hot Module Reloading for faster development

---

## 8. Contribution & Community

-   Contributions welcome via GitHub pull requests
-   Guidelines for commits, testing, and documentation
-   Licensed under MIT

---
