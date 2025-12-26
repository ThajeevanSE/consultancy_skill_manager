const db = require('../config/db');

// @desc    Get dashboard statistics
// @route   GET /api/reports/stats
const getDashboardStats = async (req, res) => {
  try {
    // 1. Count Total Personnel by Experience Level
    const [experienceStats] = await db.query(`
      SELECT experience_level, COUNT(*) as count 
      FROM personnel 
      GROUP BY experience_level
    `);

    // 2. Count Most Popular Skills (Supply)
    // How many people know each skill?
    const [skillSupply] = await db.query(`
      SELECT s.name, COUNT(ps.person_id) as count
      FROM skills s
      JOIN personnel_skills ps ON s.skill_id = ps.skill_id
      GROUP BY s.name
      ORDER BY count DESC
      LIMIT 5
    `);

    // 3. Project Status Distribution
    const [projectStatus] = await db.query(`
      SELECT status, COUNT(*) as count 
      FROM projects 
      GROUP BY status
    `);

    res.json({
      experience: experienceStats,
      topSkills: skillSupply,
      projectStatus: projectStatus
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };