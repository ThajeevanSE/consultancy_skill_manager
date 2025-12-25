const db = require('../config/db');

// @desc    Get all skills
// @route   GET /api/skills
const getAllSkills = async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM skills ORDER BY name ASC');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create new skill
// @route   POST /api/skills
const createSkill = async (req, res) => {
  const { name, category, description } = req.body;

  if (!name) return res.status(400).json({ message: 'Skill name is required' });

  try {
    const sql = `INSERT INTO skills (name, category, description) VALUES (?, ?, ?)`;
    const [result] = await db.query(sql, [name, category, description]);
    res.status(201).json({ id: result.insertId, name, category, description });
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      res.status(400).json({ message: 'Skill already exists' });
    } else {
      res.status(500).json({ message: error.message });
    }
  }
};

// @desc    Update skill
// @route   PUT /api/skills/:id
const updateSkill = async (req, res) => {
  const { id } = req.params;
  const { name, category, description } = req.body;

  try {
    const sql = `UPDATE skills SET name = ?, category = ?, description = ? WHERE skill_id = ?`;
    const [result] = await db.query(sql, [name, category, description, id]);
    
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Skill not found' });
    
    res.json({ message: 'Skill updated successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete skill
// @route   DELETE /api/skills/:id
const deleteSkill = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.query('DELETE FROM skills WHERE skill_id = ?', [id]);
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllSkills, createSkill, updateSkill, deleteSkill };