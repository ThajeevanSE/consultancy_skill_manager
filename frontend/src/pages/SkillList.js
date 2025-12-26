import React, { useState, useEffect } from 'react';
import api from '../services/api';

const SkillList = () => {
  const [skills, setSkills] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    description: ''
  });
  const [message, setMessage] = useState('');

  //Fetch Skills on Load
  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    try {
      const res = await api.get('/skills');
      setSkills(res.data);
    } catch (err) {
      console.error('Error fetching skills', err);
    }
  };

  //Handle Input
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  //Submit Form
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/skills', formData);
      setMessage('Skill Added Successfully!');
      setFormData({ name: '', category: '', description: '' }); // Reset
      fetchSkills(); // Refresh
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error adding skill. Name might be duplicate.');
    }
  };

  //Delete Skill
  const handleDelete = async (id) => {
    if (window.confirm('Delete this skill? This will remove it from all personnel and projects.')) {
      try {
        await api.delete(`/skills/${id}`);
        fetchSkills();
      } catch (err) {
        alert('Error deleting skill');
      }
    }
  };

  // Consistent Styles
  const styles = {
    container: { maxWidth: '800px', margin: '0 auto' },
    form: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', padding: '20px', background: '#e9ecef', borderRadius: '5px' },
    input: { padding: '8px', fontSize: '16px' },
    button: { padding: '10px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' },
    deleteBtn: { background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
    th: { background: '#333', color: '#fff', padding: '10px', textAlign: 'left' },
    td: { borderBottom: '1px solid #ddd', padding: '10px' }
  };

  return (
    <div style={styles.container}>
      <h2>Skill Catalog</h2>
      
      {message && <p style={{ color: 'blue' }}>{message}</p>}

      {/* Add Skill Form */}
      <form onSubmit={onSubmit} style={styles.form}>
        <h3>Add New Skill</h3>
        <input 
          type="text" name="name" placeholder="Skill Name (e.g. Python)" 
          value={formData.name} onChange={onChange} required style={styles.input} 
        />
        <input 
          type="text" name="category" placeholder="Category (e.g. Backend)" 
          value={formData.category} onChange={onChange} style={styles.input} 
        />
        <input 
          type="text" name="description" placeholder="Description (Optional)" 
          value={formData.description} onChange={onChange} style={styles.input} 
        />
        <button type="submit" style={styles.button}>Add Skill</button>
      </form>

      {/* Skills Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Skill Name</th>
            <th style={styles.th}>Category</th>
            <th style={styles.th}>Description</th>
            <th style={styles.th}>Action</th>
          </tr>
        </thead>
        <tbody>
          {skills.map((skill) => (
            <tr key={skill.skill_id}>
              <td style={styles.td}><strong>{skill.name}</strong></td>
              <td style={styles.td}>{skill.category}</td>
              <td style={styles.td}>{skill.description}</td>
              <td style={styles.td}>
                <button onClick={() => handleDelete(skill.skill_id)} style={styles.deleteBtn}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkillList;