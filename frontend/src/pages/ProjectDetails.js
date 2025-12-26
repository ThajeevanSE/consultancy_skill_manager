import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const ProjectDetails = () => {
  const { id } = useParams(); // Get Project ID from URL
  const [projectData, setProjectData] = useState(null);
  const [allSkills, setAllSkills] = useState([]); // For dropdown
  
  // Form State for adding a requirement
  const [selectedSkill, setSelectedSkill] = useState('');
  const [minLevel, setMinLevel] = useState('Beginner');
  const [message, setMessage] = useState('');

  // Use useCallback to memoize fetchData so it can be included in useEffect dependency array
  const fetchData = useCallback(async () => {
    try {
      // 1. Get Project Matches & Requirements
      const matchRes = await api.get(`/projects/${id}/matches`);
      setProjectData(matchRes.data);

      // 2. Get All Skills for the dropdown
      const skillsRes = await api.get('/skills');
      setAllSkills(skillsRes.data);
    } catch (err) {
      console.error('Error fetching details', err);
    }
  }, [id]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle Adding a Requirement
  const addRequirement = async (e) => {
    e.preventDefault();
    if (!selectedSkill) return alert('Please select a skill');

    try {
      await api.post(`/projects/${id}/skills`, {
        skill_id: selectedSkill,
        min_proficiency_level: minLevel
      });
      setMessage('Requirement Added!');
      fetchData(); // Refresh to see updated matches
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      alert('Error adding requirement');
    }
  };

  if (!projectData) return <div>Loading...</div>;

  const { required_skills, matches } = projectData;

  // Styles
  const styles = {
    container: { maxWidth: '1000px', margin: '0 auto' },
    section: { marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' },
    form: { display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' },
    select: { padding: '8px', minWidth: '150px' },
    btn: { padding: '9px 15px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' },
    tag: { display: 'inline-block', padding: '5px 10px', background: '#007bff', color: '#white', borderRadius: '15px', marginRight: '5px', fontSize: '14px' },
    matchCard: { padding: '15px', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '5px', background: '#fff', borderLeft: '5px solid #28a745' }
  };

  return (
    <div style={styles.container}>
      <h2>Project Matching Dashboard</h2>
      
      {/* SECTION 1: REQUIREMENTS */}
      <div style={styles.section}>
        <h3>1. Project Requirements</h3>
        <p>Define what skills are needed for this project.</p>
        
        {/* List current requirements */}
        <div style={{ marginBottom: '15px' }}>
          {required_skills && required_skills.length > 0 ? (
            required_skills.map(req => (
              <span key={req.skill_id} style={styles.tag}>
                {req.name} ({req.min_proficiency_level}+)
              </span>
            ))
          ) : (
            <p style={{ fontStyle: 'italic', color: '#666' }}>No requirements set yet.</p>
          )}
        </div>

        {/* Add Requirement Form */}
        <form onSubmit={addRequirement} style={styles.form}>
          <select 
            value={selectedSkill} 
            onChange={(e) => setSelectedSkill(e.target.value)} 
            style={styles.select}
          >
            <option value="">-- Select Skill --</option>
            {allSkills.map(s => <option key={s.skill_id} value={s.skill_id}>{s.name}</option>)}
          </select>

          <select 
            value={minLevel} 
            onChange={(e) => setMinLevel(e.target.value)} 
            style={styles.select}
          >
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
            <option value="Expert">Expert</option>
          </select>

          <button type="submit" style={styles.btn}>Add Requirement</button>
        </form>
        {message && <p style={{ color: 'green', marginTop: '5px' }}>{message}</p>}
      </div>

      {/* SECTION 2: MATCHING PERSONNEL */}
      <div style={styles.section}>
        <h3>2. Suggested Team Members (Matches)</h3>
        <p>These people have <strong>ALL</strong> the required skills at the required level.</p>
        
        {matches && matches.length > 0 ? (
          matches.map(person => (
            <div key={person.id} style={styles.matchCard}>
              <h4>{person.name} <span style={{fontSize: '0.8em', color: '#666'}}>({person.role})</span></h4>
              <div>
                <strong>Skills: </strong>
                {Object.entries(person.skills).map(([skillId, level]) => {
                  // Find skill name from allSkills array for display
                  const skillName = allSkills.find(s => s.skill_id === parseInt(skillId))?.name || 'Unknown';
                  return (
                    <span key={skillId} style={{ marginRight: '10px', color: '#444' }}>
                      {skillName}: {level}
                    </span>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <p>No personnel match all the current requirements.</p>
        )}
      </div>
    </div>
  );
};

export default ProjectDetails;