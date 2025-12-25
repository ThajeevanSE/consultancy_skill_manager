const express = require('express');
const router = express.Router();
const { 
  getAllPersonnel, 
  createPersonnel, 
  updatePersonnel, 
  deletePersonnel 
} = require('../controllers/personnelController');

router.get('/', getAllPersonnel);
router.post('/', createPersonnel);
router.put('/:id', updatePersonnel);
router.delete('/:id', deletePersonnel);

module.exports = router;