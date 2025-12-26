# Consultancy Skill & Project Manager

A full-stack web application designed for tech consultancies to manage personnel, track skills, and intelligently match employees to projects based on skill requirements and proficiency levels.

## 🚀 Features

### Core Functionality
* **Personnel Management:** CRUD operations for employees, including roles and experience levels.
* **Skill Catalog:** Manage a centralized database of technical and soft skills.
* **Skill Assignment:** Link skills to personnel with specific proficiency levels (Beginner to Expert).
* **Project Management:** Create projects with start/end dates and status tracking.
* **Smart Matching Algorithm:** Automatically suggests the best team members for a project by comparing project requirements against employee skills and proficiency levels.

---

### 🌟 Advanced & Creative Features

I went beyond the core requirements to implement **three** strategic features that simulate real-world business intelligence.

#### 1. Strategic Insights Dashboard (Visual Analytics)
* **Problem Solved:** Managers struggle to see the "big picture" of workforce capabilities.
* **Solution:** A real-time visual dashboard using **Recharts** that provides:
    * **Workforce Distribution:** Pie chart showing Junior vs. Senior staff ratio.
    * **Skill Supply Analysis:** Bar chart highlighting the most common skills (identifying hiring strengths).
    * **Project Status:** Quick view of Active vs. Completed projects.

#### 2. Smart Gap Analysis (AI-Simulated Logic)
* **Problem Solved:** When a project search returns "0 Matches," it usually results in a dead end.
* **Solution:** An intelligent fallback algorithm that analyzes *why* the match failed. It identifies exactly which skill is the bottleneck and suggests strategic actions (e.g., *"Hiring Recommendation: We lack Senior React Developers"*).

#### 3. Professional PDF Reporting
* **Problem Solved:** Consultancies need to share staffing proposals with clients, not just view them on a screen.
* **Solution:** A "Download Report" feature using **jsPDF** that auto-generates a formatted PDF containing the project summary, required skills, and the list of matched candidates (or gap analysis notes).

---

## 🛠️ Technology Stack

* **Frontend:** React.js, React Router, Axios, Recharts (Charts), jsPDF (Reporting)
* **Backend:** Node.js, Express.js
* **Database:** MySQL
* **API Testing:** Postman

---

## 📋 Prerequisites

Before running the application, ensure you have the following installed:
* **Node.js** (v14 or higher)
* **MySQL Server** (v8.0 or higher)
* **Git**

---

## ⚙️ Setup & Installation Guide

### 1. Database Setup
1.  Open your MySQL Workbench or Command Line.
2.  Create the database and tables by running the provided SQL script:
    * File: `schema.sql` (located in the root directory).
3.  Ensure the database `consultancy_db` is created successfully.

### 2. Backend Setup
1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    * Create a `.env` file in the `backend` folder.
    * Add your database credentials:
        ```env
        PORT=5000
        DB_HOST=localhost
        DB_USER=root
        DB_PASSWORD=your_password_here
        DB_NAME=consultancy_db
        ```
4.  Start the Server:
    ```bash
    npm run dev
    ```
    * *Server should run on http://localhost:5000*

### 3. Frontend Setup
1.  Open a new terminal and navigate to the frontend folder:
    ```bash
    cd frontend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the React App:
    ```bash
    npm start
    ```
    * *App should open at http://localhost:3000*

---

## 🖥️ Application Screenshots (Frontend UI)

### 1. Strategic Dashboard (Creative Feature)
![Dashboard Screenshot](PLACE_YOUR_DASHBOARD_IMAGE_LINK_HERE)

### 2. Project Details with Matches & PDF Download
![Project Details Screenshot](PLACE_YOUR_PROJECT_DETAILS_IMAGE_LINK_HERE)

### 3. Smart Gap Analysis (No Matches Scenario)
![Gap Analysis Screenshot](PLACE_YOUR_GAP_ANALYSIS_IMAGE_LINK_HERE)

### 4. Personnel List
![Personnel List Screenshot](PLACE_YOUR_PERSONNEL_LIST_IMAGE_LINK_HERE)

---

## 📸 API Testing Screenshots

*(Note: These are required proofs of functionality)*

### 1. Create Personnel (POST)
<img width="622" height="509" alt="Screenshot 2025-12-25 174804" src="https://github.com/user-attachments/assets/d76ce229-b164-425d-88de-1f5ce10952d5" />

### 2. Get All Personnel (GET)
<img width="622" height="507" alt="Screenshot 2025-12-25 174914" src="https://github.com/user-attachments/assets/2b4f77df-51df-42c5-b8d9-8c02d672414f" />

### 3. Update Skill (PUT)
<img width="626" height="507" alt="Screenshot 2025-12-25 180342" src="https://github.com/user-attachments/assets/0d8d90ee-ee76-4bdb-8c45-0c07b4135c7a" />

### 4. Assign Skill to Personnel (POST)
<img width="618" height="503" alt="Screenshot 2025-12-25 184141" src="https://github.com/user-attachments/assets/b87814db-437a-454f-a5dc-a5454ac33123" />

### 5. Matching Algorithm Result (GET)
<img width="625" height="506" alt="Screenshot 2025-12-26 005132" src="https://github.com/user-attachments/assets/2d8b8e60-1292-4f5d-9bea-249b75e71850" />

---

## 🧪 How to Test the Advanced Features

### Test 1: The Matching Algorithm
1.  **Create a Skill:** Go to the "Skills" page and add "React" (Category: Frontend).
2.  **Create a Person:** Go to "Personnel", add "John Doe", then click "Manage Skills" and assign him "React" at "Advanced" level.
3.  **Create a Project:** Go to "Projects", create "New App".
4.  **Add Requirement:** Click "Manage Matches", add a requirement for "React" (Level: Intermediate).
5.  **Result:** John Doe will appear in the "Suggested Team Members" list automatically.

### Test 2: PDF Generation
1.  While viewing the Project Matches from Test 1, click the red **"📄 Download PDF Report"** button.
2.  **Result:** A PDF file will download containing the project details and John Doe's information in a table.

### Test 3: Gap Analysis
1.  Create a new requirement for a skill nobody has (e.g., "AI Expert" at "Expert" level).
2.  **Result:** The matches list will disappear, and a yellow **"Gap Analysis Report"** will appear, suggesting that you need to hire an AI Expert.

---

## 📂 Folder Structure

/consultancy-manager │ 
├── /backend # Node.js/Express Server 
│ ├── /config # DB Connection 
│ ├── /controllers # Route Logic 
│ ├── /routes # API Endpoints 
│ └── server.js # Entry Point 
│ ├── /frontend # React Application 
│ ├── /src 
│ │ ├── /components # Reusable UI (Navbar) 
│ │ ├── /pages # Main Views (Dashboard, Lists) 
│ │ └── /services # Axios Configuration 
│ ├── schema.sql # Database Creation Script 
└── README.md # Project Documentation


**Author:** Thajeevan  
**Submission Date:** January 7, 2026
