const db = require('../config/db');

// @desc    Create a new project
// @route   POST /api/projects
const createProject = async (req, res) => {
  const { name, description, start_date, end_date, status } = req.body;
  if (!name) return res.status(400).json({ message: 'Project Name is required' });

  try {
    const sql = `INSERT INTO projects (name, description, start_date, end_date, status) VALUES (?, ?, ?, ?, ?)`;
    const [result] = await db.query(sql, [name, description, start_date, end_date, status || 'Planning']);
    res.status(201).json({ id: result.insertId, message: 'Project created' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get all projects
// @route   GET /api/projects
const getAllProjects = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM projects ORDER BY created_at DESC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a required skill to a project
// @route   POST /api/projects/:id/skills
const addProjectRequirement = async (req, res) => {
  const { id } = req.params;
  const { skill_id, min_proficiency_level } = req.body;

  try {
    const sql = `
      INSERT INTO project_skills (project_id, skill_id, min_proficiency_level) 
      VALUES (?, ?, ?) 
      ON DUPLICATE KEY UPDATE min_proficiency_level = VALUES(min_proficiency_level)
    `;
    await db.query(sql, [id, skill_id, min_proficiency_level]);
    res.json({ message: 'Project requirement added' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Find matching personnel for a project
// @route   GET /api/projects/:id/matches
const getProjectMatches = async (req, res) => {
  const { id } = req.params; // Project ID
  const [projectInfo] = await db.query('SELECT * FROM projects WHERE project_id = ?', [id]);
  const projectDetails = projectInfo[0];
  try {
    // 1. Get Project Requirements
    const [requirements] = await db.query(`
      SELECT ps.skill_id, s.name, ps.min_proficiency_level 
      FROM project_skills ps
      JOIN skills s ON ps.skill_id = s.skill_id
      WHERE ps.project_id = ?
    `, [id]);

    if (requirements.length === 0) {
      return res.json({ message: 'No skills required for this project yet.' });
    }

    // 2. Get All Personnel with their Skills
    // We fetch everyone and filter in JS (Easier logic to maintain)
    const [candidates] = await db.query(`
      SELECT p.person_id, p.name, p.role, p.email,
             ps.skill_id, ps.proficiency_level
      FROM personnel p
      JOIN personnel_skills ps ON p.person_id = ps.person_id
    `);

    // Group skills by person
    const personnelMap = {};
    candidates.forEach(row => {
      if (!personnelMap[row.person_id]) {
        personnelMap[row.person_id] = {
          id: row.person_id,
          name: row.name,
          role: row.role,
          skills: {}
        };
      }
      personnelMap[row.person_id].skills[row.skill_id] = row.proficiency_level;
    });

    // Helper to convert levels to numbers for comparison
    const levels = { 'Beginner': 1, 'Intermediate': 2, 'Advanced': 3, 'Expert': 4 };

    // 3. The Matching Logic
    const matches = Object.values(personnelMap).filter(person => {
      // Check if person has ALL required skills at the required level
      return requirements.every(req => {
        const personSkillLevel = person.skills[req.skill_id];
        if (!personSkillLevel) return false; // Doesn't have the skill
        return levels[personSkillLevel] >= levels[req.min_proficiency_level];
      });
    });

    res.json({
      project_id: id,
      project: projectDetails,
      required_skills: requirements,
      matches: matches
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createProject, getAllProjects, addProjectRequirement, getProjectMatches };