# Portfolio 2024 - AI Engineer Edition

Welcome to your new portfolio codebase! This project is a modern, responsive, and "Cyberpunk/Terminal" themed React application.

It includes a fully functional **Admin Dashboard** linked to **Supabase** for easy content management.

## 🚀 How to Run

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Start Development Server**:
    ```bash
    npm run dev
    ```
    Your site will be live at `http://localhost:3000`.

## 🛠 Project Structure

The project is simplified for ease of use:

-   `src/components/`: Contains all the visual parts of your site.
    -   `Navbar/`: The top navigation bar and all its links.
    -   `Profile/`: The main hero section with your photo and bio.
    -   `Skills/`: (aka TechnicalArsenal) Your skills grid.
    -   `Projects/`: (aka SelectedWorks) Your project case studies.
    -   `Experience/` & `Education/`: Your history timelines.
    -   `Contact/`: The contact form (connected to EmailJS).
-   `src/pages/`: The main separate pages.
    -   `Home`: The main portfolio website.
    -   `Login`: The login screen for the admin panel.
    -   `Admin`: The secret dashboard to manage your content.
-   `src/lib/`: Backend connections (Supabase).
-   `src/assets/`: Images and static files.

## ⚡️ Features

-   **Admin Panel**: Go to `/admin` to edit your profile, add skills, upload projects, and manage your resume.
-   **EmailJS**: The contact form sends real emails to your inbox.
-   **Supabase Database**: All your data is stored securely in the cloud.
-   **Responsive Design**: Looks great on mobile and desktop.
-   **Dark/Light Mode**: Toggle between two amazing themes.

## 📝 Admin Access

1.  Go to `http://localhost:3000/login`
2.  Enter your email and password (set up in Supabase).
3.  Use the dashboard to update your site content instantly!


---
Created by Antigravity
