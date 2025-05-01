# 💅 Cosmetic Clinic Dashboard

A modern and feature-rich dashboard for managing a cosmetic clinic. Built using **React**, **Vite**, **Tailwind CSS**, and powered by **Supabase** and **React Query**, this app offers an interactive UI for managing appointments, patients, doctors, products, treatments, and more.

<img src="https://imgur.com/0cDhzr1.jpg"/>

---

## 🚀 Features
- 📊 **Dashboard**
 - View today’s appointments
 - Dynamic charts for:
   - Appointment distribution by day of the week
   - Product and treatment statistics
<img src="https://imgur.com/zxI7N4W.jpg"/>
<img src="https://imgur.com/j4vkLQJ.jpg"/>
<img src="https://imgur.com/eW4QnHD.jpg"/>

- 📆 **Appointments Management**
  - View today's appointments on the dashboard.
  - Weekly chart of appointments distribution.
  - Calendar (Month/Week/Day) view for all appointments using **FullCalendar**.
  - Book appointments based on doctor availability and working hours.
  - Edit appointment details.
<img src="https://imgur.com/WP3swvv.jpg"/>
<img src="https://imgur.com/3YJMQc7.jpg"/>

- 👩‍⚕️ **Doctor Module**
 - Full list of doctors with search, sorting, and pagination
 - View doctor details & upcoming appointments
 - Real-time chat with doctors
 - Allow doctors to change their passwords securely
<img src="https://imgur.com/40xG9Yu.jpg"/>
<img src="https://imgur.com/FffrkjE.jpg"/>
<img src="https://imgur.com/IH135t1.jpg"/>
<img src="https://imgur.com/a5cl0sP.jpg"/>
<img src="https://imgur.com/RbfJ01C.jpg"/>

- 🧑‍💼 **Patient Module**
  - Full patient listing with filtering (e.g., name, gender)
  - View and manage medical records
  - View upcoming and past appointments
  - Secure patient chat with admins
  - Password management support
<img src="https://imgur.com/Eq29VlG.jpg"/>
<img src="https://imgur.com/XEkVuyS.jpg"/>
<img src="https://imgur.com/ilPkj6P.jpg"/>
<img src="https://imgur.com/CIbLiHb.jpg"/>
<img src="https://imgur.com/6Y2REVJ.jpg"/>
<img src="https://imgur.com/2PWdr6E.jpg"/>
<img src="https://imgur.com/GyC5oWO.jpg"/>

- 🛍️ **Products Management**
  - View all products with price, stock, ingredients, usage instructions, and side effects.
  - Sort and filter products by name, price, and category.
  - Add, edit, or delete products.
<img src="https://imgur.com/Paaosdg.jpg"/>
<img src="https://imgur.com/h4YcRyU.jpg"/>
<img src="https://imgur.com/mlOWc4Q.jpg"/>

- 🧴 **Treatments Management**
  - Similar to products with full CRUD functionality.
  - Filtering and categorization supported.
<img src="https://imgur.com/aaBGfdI.jpg"/>
<img src="https://imgur.com/grp9h9u.jpg"/>
<img src="https://imgur.com/vk6SYzV.jpg"/>

- 💬 **Chat System**
  - Real-time chat between admins, doctors, and patients via **SignalR**.

- ⚙️ **Settings Page**
  - Clinic details like address, name, and working hours.
  - User profile section with password change option.
<img src="https://imgur.com/0Sjsn1k.jpg"/>
<img src="https://imgur.com/vk6SYzV.jpg"/>

- 🔍 **Global Search and Filters**
  - Search and filter all entities: users, products, treatments, appointments.

- 🖼️ **Supabase for Image Storage**
  - Images uploaded for products, treatments, and user profiles are securely stored and retrieved from **Supabase Storage**.
 

## 🛡️ Authentication, Authorization & Security

Robust access control and secure communication mechanisms are implemented throughout the app:

- **Protected Routes**  
  Only authenticated users can access specific routes. Unauthorized users are redirected or shown fallback UIs with clear permission messages.

- **Role-Based Access Control (RBAC)**  
  Permissions are enforced per action based on user roles (e.g., `admin`, `doctor`, `patient`). Fallback UI is displayed when the user lacks required permissions.

- **Axios Interceptors**  
  - Automatic token refresh using stored refresh tokens.  
  - Access tokens and session data are securely injected into each request.  
  - Centralized error handling for unauthorized or expired sessions.


- **Page Not Found Handling**  
  A custom `404 - Page Not Found` component is implemented to improve user experience and guide users when a route doesn't exist.

  <img src="https://imgur.com/MqZ5jzh.jpg"/>
  <img src="https://imgur.com/MZjWidq.jpg"/>
 <img src="https://imgur.com/sGW1b3h.jpg"/>

 ---

## 🧱 Tech Stack

| Technology       | Purpose                                  |
|------------------|-------------------------------------------|
| React            | Frontend library                          |
| Vite             | Lightning-fast bundler                    |
| Tailwind CSS     | Utility-first styling                     |
| Styled Components| Custom styling and theming                |
| Supabase         | storage                                   |
| React Query      | Data fetching and caching                 |
| Axios            | HTTP client with interceptors             |
| FullCalendar     | Calendar component                        |
| React Hook Form  | Forms and validation                      |
| Lucide Icons     | Modern icon set                           |
| Swiper.js        | Interactive sliders                       |
| SignalR          | Real-time communication                   |

---

## 🧠 Code Architecture & Design Patterns

To ensure scalability and maintainability, the project follows modern design principles and patterns:

### 🔁 Design Patterns

| **Pattern**                         | **Description**                                                                 |
|------------------------------------|----------------------------------------------------------------------------------|
| **Single Responsibility Principle (SRP)** | Each React component, file, or function has a well-defined and focused purpose. |
| **Custom Hooks**                   | Reusable logic is abstracted into hooks (e.g., `useAuth`, `useAppointments`) to avoid duplication and improve readability. |
| **Compound Component Pattern**     | Components like form controls or filters are built to be flexible and composable. |
| **Component Refactoring**          | Code is frequently refactored to maintain clarity, separation of concerns, and reduce side effects. |

### ✅ Best Practices

| **Practice**                   | **Description**                                                                 |
|--------------------------------|----------------------------------------------------------------------------------|
| **Component Reusability**      | Focused, modular components promote reuse and clarity.                          |
| **Custom Hooks**               | Logic is abstracted into reusable hooks like `useDebounce` and `useMediaQuery`. |
| **Responsive Design**          | Mobile-first design ensured using media queries and flexible layouts.           |
| **Separation of Concerns**     | Clear distinction between UI and business logic for cleaner architecture.       |
| **State Management**           | Uses hooks and context to manage app state efficiently.                         |
| **Error & Loading Handling**   | Graceful feedback with loading indicators and error components.                 |
| **Type Safety**                | Built with TypeScript to catch bugs early and ensure robust code.               |
 
 ---
## 🔐 Demo Login

You can explore the full features of the Cosmetic Clinic Dashboard using the following demo account:

- **Email**: `reem.alhamadi@example.com`  
- **Password**: `Password`

> 🔎 This account provides access to the app with patient-level permissions.
