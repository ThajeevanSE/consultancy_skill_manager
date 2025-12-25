// backend/controllers/personnelController.js
const db = require('../config/db');

// @desc    Get all personnel
// @route   GET /api/personnel
const getAllPersonnel = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM personnel ORDER BY created_at DESC');
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create new personnel
// @route   POST /api/personnel
const createPersonnel = async (req, res) => {
    const { name, email, role, experience_level } = req.body;

    // Basic Validation
    if (!name || !email) {
        return res.status(400).json({ message: 'Name and Email are required' });
    }

    try {
        const sql = `INSERT INTO personnel (name, email, role, experience_level) VALUES (?, ?, ?, ?)`;
        const [result] = await db.query(sql, [name, email, role, experience_level]);

        res.status(201).json({
            id: result.insertId,
            name,
            email,
            role,
            experience_level
        });
    } catch (error) {
        // Check for duplicate email error (MySQL error 1062)
        if (error.code === 'ER_DUP_ENTRY') {
            res.status(400).json({ message: 'Email already exists' });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

// @desc    Update personnel
// @route   PUT /api/personnel/:id
const updatePersonnel = async (req, res) => {
    const { id } = req.params;
    const { name, email, role, experience_level } = req.body;

    try {
        const sql = `UPDATE personnel SET name = ?, email = ?, role = ?, experience_level = ? WHERE person_id = ?`;
        const [result] = await db.query(sql, [name, email, role, experience_level, id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Personnel not found' });
        }

        res.json({ message: 'Personnel updated successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Delete personnel
// @route   DELETE /api/personnel/:id
const deletePersonnel = async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await db.query('DELETE FROM personnel WHERE person_id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Personnel not found' });
        }

        res.json({ message: 'Personnel deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
const assignSkill = async (req, res) => {
    console.log("Received Body:", req.body);
    const { id } = req.params; // Person ID
    const { skill_id, proficiency_level } = req.body;

    if (!skill_id || !proficiency_level) {
        return res.status(400).json({ message: 'Skill ID and Proficiency Level are required' });
    }

    try {
        // Check if skill exists first
        const [skillCheck] = await db.query('SELECT * FROM skills WHERE skill_id = ?', [skill_id]);
        if (skillCheck.length === 0) return res.status(404).json({ message: 'Skill not found' });

        // Insert or Update (if already exists)
        const sql = `
      INSERT INTO personnel_skills (person_id, skill_id, proficiency_level) 
      VALUES (?, ?, ?) 
      ON DUPLICATE KEY UPDATE proficiency_level = VALUES(proficiency_level)
    `;

        await db.query(sql, [id, skill_id, proficiency_level]);
        res.status(200).json({ message: 'Skill assigned successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getAllPersonnel, createPersonnel, updatePersonnel, deletePersonnel, assignSkill };