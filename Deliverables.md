# 📌 Project Deliverables – Weekendly (Weekend Planner)

## 1. Working Application

-   Live URL: [https://weekendly.arnabsamanta.in](https://weekendly.arnabsamanta.in)
-   Deployment:
    -   Frontend → Netlify
    -   Backend → DigitalOcean

---

## 2. Code Repository

-   GitHub Repo: [Weekendly](https://github.com/learner-enthusiast/React_calender_app)
-   Stack: React (frontend) + Node/Express (backend) + MongoDB (storage)

---

## 3. Documentation

### Problem Statement (Addressed)

-   Browse and choose activities from a predefined set (brunch, hiking, movie night, reading, etc.)
-   Add selected activities into a **weekend schedule (Saturday + Sunday)**
-   View the plan in a **visual, calendar-style format**
-   Edit or remove activities from the schedule
-   Extended features for personalization, categories, vibes, and thematic planning

### Major Design Decisions & Trade-offs

-   **Activity Library vs Free-form Input**: Chose a predefined library of activities (with categories, icons, and vibes) to keep UX simple, but allowed extensibility for future custom activities.
-   **State Management**: Used Redux to manage global state (activities, categories, schedule, vibes). Chose Redux over Context for predictable updates and debugging.
-   **Thematic Sub-calendars**: Created a system for separate “mini-calendars” (e.g., Work, Family, Fitness), enabling filtering and isolated views.
-   **Persistence**: Implemented MongoDB storage for activities and schedules instead of localStorage, trading off simplicity for scalability.
-   **Hosting Choice**: Used Netlify for frontend (lightweight SPA hosting) and DigitalOcean for backend (control + scalability).

### Component Design & State Management

-   **Reusable Components**: Built modular components for Activity Cards, Category Filters, Schedule Timeline, Mood Picker, and Sub-calendars.
-   **Visual Schedule**: Schedule displayed in a calendar/timeline format, with drag-and-drop positioning considered for future versions.
-   **Category & Vibe Metadata**: Each activity has metadata (category, color scheme, vibe icon) to allow easy filtering and identification.
-   **Filters**: Users can toggle categories or sub-calendars to focus on one type of task at a time.

### UI & Experience

-   **Responsive Design**: Works across desktop, tablet, and mobile.
-   **Clear Visuals**: Activities color-coded by category; vibe icons for mood context.
-   **Smooth Interactions**: Animations and polished transitions to make scheduling fun.
-   **Thematic Planning**: Ability to create “Adventurous Weekend,” “Lazy Weekend,” etc. with filtered sub-calendars.

### Creative Features / Integrations

-   Category system with **color schemes** for quick recognition
-   **Icons for vibes** (happy, relaxed, energetic) and categories (food, travel, fitness, etc.)
-   **Sub-calendar creation** for thematic separation of different task types
-   **Filtering system** to isolate tasks/events by category or sub-calendar
-   Persistence of plans in MongoDB for long-term storage
-   Holiday-awareness integration for suggesting upcoming long weekends

---

## 4. Deployment Summary

-   Frontend → Netlify (SPA routing with `_redirects`)
-   Backend → DigitalOcean (Express.js API)
-   Database → MongoDB Atlas

---

## 5. Super Stretch Goals (Attempted)

-   **Persistence**: Plans stored in MongoDB instead of only local state
-   **Scalability**: Architecture supports 50+ activities with smooth performance
-   **Offline-first exploration**: Initial work done with caching static assets and storing data in local storage in offline mode once connectivity is there stores in mongoDB
-   **Reusable Components**: Designed with scalability in mind (mini design system approach)

---

## 6. Evaluation Mapping

**Feature Depth**

-   Core: Browse, select, add, edit, remove, and visualize activities in a weekend schedule
-   Bonus: Categories, color schemes, vibes, sub-calendars, filtering
-   Super Stretch: Persistence with MongoDB, scalable design

**Engineering Depth**

-   Clear component-based architecture
-   Redux for predictable state management
-   MongoDB backend for persistence
-   Responsive, optimized rendering

**UI/UX Quality**

-   Mobile-first responsive design
-   Color-coded categories and vibe icons for clarity
-   Smooth navigation and polished interactions

**Creativity & Innovation**

-   Sub-calendars for thematic separation
-   Category + vibe system for personalization
-   Filtering for focused views

**Maintainability**

-   Clean component-based structure
-   Scoped styling with CSS Modules
-   Centralized state management

**Communication**

-   Documentation (this file)

---

## 7. Conclusion

Weekendly delivers a fun, visually rich, and interactive way to plan weekends.  
It goes beyond the basics with **categories, vibes, and thematic sub-calendars**, while maintaining strong engineering depth through state management, persistence, and scalability.
