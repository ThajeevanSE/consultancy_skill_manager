import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const PersonnelSkills = () => {
  const { id } = useParams(); // Get Person ID
  const [person, setPerson] = useState(null);
  const [allSkills, setAllSkills] = useState([]);
  const [mySkills, setMySkills] = useState([]);
  
  // Form State
  const [selectedSkill, setSelectedSkill] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [message, setMessage] = useState('');

  // Fetch Data
  const fetchData = useCallback(async () => {
    try {
        //Get Personnel Details
      
      const personnelRes = await api.get('/personnel');
      const currentPerson = personnelRes.data.find(p => p.person_id === parseInt(id));
      setPerson(currentPerson);

      //Get All Skills (for dropdown)
      const skillsRes = await api.get('/skills');
      setAllSkills(skillsRes.data);

      
    } catch (err) {
      console.error(err);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const assignSkill = async (e) => {
    e.preventDefault();
    if (!selectedSkill) return alert('Select a skill');

    try {
      await api.post(`/personnel/${id}/skills`, {
        skill_id: selectedSkill,
        proficiency_level: level
      });
      setMessage('Skill Assigned Successfully!');
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert('Error assigning skill');
    }
  };

  const styles = {
    container: { maxWidth: '600px', margin: '0 auto', padding: '20px' },
    form: { background: '#f4f4f4', padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '15px' },
    select: { padding: '10px' },
    btn: { padding: '10px', background: '#007bff', color: '#white', border: 'none', cursor: 'pointer' }
  };

  if (!person) return <div>Loading...</div>;

  return (
    <div style={styles.container}>
      <h2>Manage Skills for: <span style={{color: '#007bff'}}>{person.name}</span></h2>
      <p>Role: {person.role}</p>

      <div style={styles.form}>
        <h3>Assign New Skill</h3>
        <form onSubmit={assignSkill} style={{display: 'flex', flexDirection: 'column', gap: '10px'}}>
          <label>Select Skill:</label>
          <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)} style={styles.select}>
            <option value="">-- Choose Skill --</option>
            {allSkills.map(s => (
              <option key={s.skill_id} value={s.skill_id}>{s.name} ({s.category})</option>
            ))}
          </select>

          <label>Proficiency Level:</label>
          <select value={level} onChange={(e) => setLevel(e.target.value)} style={styles.select}>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>

          <button type="submit" style={styles.btn}>Assign Skill</button>
        </form>
        {message && <p style={{color: 'green'}}>{message}</p>}
      </div>
      
      <div style={{marginTop: '20px'}}>
        <small>*Note: Re-assigning a skill will update the proficiency level.*</small>
      </div>
    </div>
  );
};

export default PersonnelSkills;