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

I went beyond the core requirements to implement **strategic features** that simulate real-world business intelligence and enterprise standards.

#### 1. Strategic Insights Dashboard (Visual Analytics)
* **Problem Solved:** Managers struggle to see the "big picture" of workforce capabilities.
* **Solution:** A real-time visual dashboard using **Recharts** that provides workforce distribution, skill supply analysis, and project status overview.

#### 2. Smart Gap Analysis (AI-Simulated Logic)
* **Problem Solved:** When a project search returns "0 Matches," it usually results in a dead end.
* **Solution:** An intelligent fallback algorithm that analyzes *why* the match failed. It identifies if the gap is due to a lack of seniority (suggesting **Training**) or a complete lack of the skill (suggesting **Hiring**).

#### 3. Professional PDF Reporting
* **Solution:** A "Download Report" feature using **jsPDF** that auto-generates a formatted PDF containing the project summary and the list of matched candidates.

#### 4. Secure Authentication (Login System)
* **Feature:** A secure, token-based (JWT) login system that protects the dashboard. Only authorized administrators can access the data.

#### 5. Dockerized Backend
* **Feature:** The backend is fully containerized using **Docker**, ensuring consistency across different development environments.

---

## 🛠️ Technology Stack

* **Frontend:** React.js, React Router, Axios, Recharts (Charts), jsPDF (Reporting)
* **Backend:** Node.js, Express.js, JWT (Auth)
* **Database:** MySQL
* **DevOps:** Docker
* **API Testing:** Postman

---

## 📋 Prerequisites

Before running the application, ensure you have the following installed:
* **Node.js** (v14 or higher)
* **MySQL Server** (v8.0 or higher)
* **Git**
* **Docker Desktop** (Optional, for containerized backend)

---

## ⚙️ Setup & Installation Guide

### 1. Database Setup
1.  Open your MySQL Workbench or Command Line.
2.  Create the database and tables by running the provided SQL script:
    * File: `schema.sql` (located in the root directory).
3.  Ensure the database `consultancy_db` is created successfully.
4.  **Important:** The script creates a default admin user.
    * **Email:** `admin@consultancy.com`
    * **Password:** `admin123`

### 2. Backend Setup (Local)
1.  Navigate to the backend folder:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    * Create a `.env` file in the `backend` folder with your DB credentials.
4.  Start the Server:
    ```bash
    npm run dev
    ```

### 3. Backend Setup (Docker 🐳)
Alternatively, you can run the backend in a container:
1.  Build the image:
    ```bash
    docker build -t consultancy-backend .
    ```
2.  Run the container:
    ```bash
    docker run -p 5000:5000 --env-file .env consultancy-backend
    ```

### 4. Frontend Setup
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

<div align="center">
  <h3>🔒 Secure Login Page</h3>
  <img width="960" height="476" alt="Screenshot 2025-12-26 203038" src="https://github.com/user-attachments/assets/1a551d5a-6b50-4276-aaf2-27aa1e4be7ff" />
  <p><em>Token-based authentication protecting the dashboard</em></p>
</div>

<br>

<table width="100%">
  <tr>
    <td width="50%">
      <h3 align="center">1. Strategic Dashboard</h3>
      <div align="center">
        <img src="https://github.com/user-attachments/assets/e66a5625-0c8d-417d-b62a-84c67773f52d" alt="Strategic Dashboard">
        <p><em>Real-time analytics for workforce & projects</em></p>
      </div>
    </td>
    <td width="50%">
      <h3 align="center">2. Project Details & PDF Report</h3>
      <div align="center">
        <img src="https://github.com/user-attachments/assets/16b702d1-64e1-423c-baaa-73b6f8b8d9d0" alt="Project Details">
        <p><em>Requirement management and team matching</em></p>
      </div>
    </td>
  </tr>
  <tr>
    <td width="50%">
      <h3 align="center">3. Smart Gap Analysis</h3>
      <div align="center">
        <img src="https://github.com/user-attachments/assets/4279e071-9960-4807-b54f-1958b4fcc473" alt="Smart Gap Analysis">
        <p><em>AI-logic suggesting training vs. hiring</em></p>
      </div>
    </td>
    <td width="50%">
      <h3 align="center">4. Personnel Directory</h3>
      <div align="center">
        <img src="https://github.com/user-attachments/assets/ff25ab80-79f2-4df8-83a3-2c791e293d3d" alt="Personnel List">
        <p><em>Clean, badge-based staff management</em></p>
      </div>
    </td>
  </tr>
</table>

---

## 📸 API Testing Screenshots (Postman)

*(Required proofs of backend functionality)*

<table width="100%">
  <tr>
    <td width="50%">
      <strong>1. Create Personnel (POST)</strong>
      <img src="https://github.com/user-attachments/assets/d76ce229-b164-425d-88de-1f5ce10952d5" alt="Create Personnel">
    </td>
    <td width="50%">
      <strong>2. Get All Personnel (GET)</strong>
      <img src="https://github.com/user-attachments/assets/2b4f77df-51df-42c5-b8d9-8c02d672414f" alt="Get Personnel">
    </td>
  </tr>
  <tr>
    <td>
      <strong>3. Update Skill (PUT)</strong>
      <img src="https://github.com/user-attachments/assets/0d8d90ee-ee76-4bdb-8c45-0c07b4135c7a" alt="Update Skill">
    </td>
    <td>
      <strong>4. Assign Skill (POST)</strong>
      <img src="https://github.com/user-attachments/assets/b87814db-437a-454f-a5dc-a5454ac33123" alt="Assign Skill">
    </td>
  </tr>
</table>

<div align="center">
  <strong>5. Matching Algorithm Result (GET)</strong><br>
  <img src="https://github.com/user-attachments/assets/2d8b8e60-1292-4f5d-9bea-249b75e71850" width="70%" alt="Matching Result">
</div>

---

## 🧪 How to Test the Advanced Features

### Test 1: Authentication
1.  Open the app. You will be redirected to the Login Screen.
2.  Enter Email: `admin@consultancy.com` / Password: `admin123`.
3.  **Result:** Successful redirection to the Dashboard.

### Test 2: The Matching Algorithm
1.  **Create a Project:** Go to "Projects", create "New App".
2.  **Add Requirement:** Click "Manage Matches", add a requirement for "React" (Level: Intermediate).
3.  **Result:** Qualified personnel appear in the "Suggested Team Members" list automatically.

### Test 3: PDF Generation
1.  While viewing the Project Matches, click the red **"📄 Download PDF Report"** button.
2.  **Result:** A PDF file downloads containing the project details and matched candidates.

### Test 4: Gap Analysis
1.  Create a new requirement for a skill nobody has (e.g., "AI Expert").
2.  **Result:** The matches list disappears, and a yellow **"Gap Analysis Report"** appears, providing strategic hiring advice.

---

## 📂 Folder Structure

/consultancy-manager 
│
├── /backend # Node.js/Express Server 

│ ├── /config # DB Connection 

│ ├── /controllers # Route Logic 

│ ├── /routes # API Endpoints 

│ ├── Dockerfile # Docker Configuration 

│ └── server.js # Entry Point 

│ ├── /frontend # React Application 

│ ├── /src 

│ │ ├── /components # Reusable UI (Navbar) 

│ │ ├── /pages # Main Views (Dashboard, Lists, Login) 

│ │ └── /services # Axios Configuration & PDF Generator 

│ ├── schema.sql # Database Creation Script 

└── README.md # Project Documentation


**Author:** Thajeevan  
**Submission Date:** December 26, 2026
