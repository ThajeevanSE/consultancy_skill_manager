const express = require('express');
const router = express.Router();
const { 
  createProject, 
  getAllProjects, 
  addProjectRequirement, 
  getProjectMatches 
} = require('../controllers/projectController');

router.post('/', createProject);
router.get('/', getAllProjects);
router.post('/:id/skills', addProjectRequirement);
router.get('/:id/matches', getProjectMatches); 

module.exports = router;