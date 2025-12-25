-- Create the Database
CREATE DATABASE IF NOT EXISTS consultancy_db;
USE consultancy_db;

-- 1. Personnel Table
CREATE TABLE IF NOT EXISTS personnel (
    person_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL UNIQUE,
    role VARCHAR(50),
    experience_level ENUM('Junior', 'Mid-Level', 'Senior') DEFAULT 'Junior',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Skills Table
CREATE TABLE IF NOT EXISTS skills (
    skill_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    category VARCHAR(50), -- e.g., 'Framework', 'Language'
    description TEXT
);

-- 3. Personnel_Skills (Junction Table for assignments)
CREATE TABLE IF NOT EXISTS personnel_skills (
    person_id INT,
    skill_id INT,
    proficiency_level ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') DEFAULT 'Beginner',
    PRIMARY KEY (person_id, skill_id),
    FOREIGN KEY (person_id) REFERENCES personnel(person_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE
);

-- 4. Projects Table
CREATE TABLE IF NOT EXISTS projects (
    project_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    start_date DATE,
    end_date DATE,
    status ENUM('Planning', 'Active', 'Completed') DEFAULT 'Planning',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 5. Project_Skills (Junction Table for requirements)
CREATE TABLE IF NOT EXISTS project_skills (
    project_id INT,
    skill_id INT,
    min_proficiency_level ENUM('Beginner', 'Intermediate', 'Advanced', 'Expert') DEFAULT 'Beginner',
    PRIMARY KEY (project_id, skill_id),
    FOREIGN KEY (project_id) REFERENCES projects(project_id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id) ON DELETE CASCADE
);

-- Optional: Insert some dummy data to test immediately
INSERT INTO skills (name, category, description) VALUES 
('React', 'Frontend', 'JS Library'),
('Node.js', 'Backend', 'JS Runtime'),
('MySQL', 'Database', 'Relational DB');