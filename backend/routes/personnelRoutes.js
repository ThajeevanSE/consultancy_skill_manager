const express = require('express');
const router = express.Router();
const { 
  getAllPersonnel, 
  createPersonnel, 
  updatePersonnel, 
  deletePersonnel ,
  assignSkill
} = require('../controllers/personnelController');

router.get('/', getAllPersonnel);
router.post('/', createPersonnel);
router.put('/:id', updatePersonnel);
router.delete('/:id', deletePersonnel);
router.post('/:id/skills', assignSkill);

module.exports = router;