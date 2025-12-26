import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

const PersonnelSkills = () => {
  const { id } = useParams(); 
  const [person, setPerson] = useState(null);
  const [allSkills, setAllSkills] = useState([]);
  
  // Form State
  const [selectedSkill, setSelectedSkill] = useState('');
  const [level, setLevel] = useState('Beginner');
  const [message, setMessage] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const personnelRes = await api.get('/personnel');
      const currentPerson = personnelRes.data.find(p => p.person_id === parseInt(id));
      setPerson(currentPerson);

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

  if (!person) return (
    <div style={{display: 'flex', justifyContent: 'center', paddingTop: '50px', color: '#666'}}>
        Loading profile...
    </div>
  );

  const styles = {
    container: { 
        maxWidth: '600px', 
        margin: '0 auto', 
        padding: '40px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    },
    backLink: {
        display: 'inline-block',
        marginBottom: '20px',
        color: '#6B7280',
        textDecoration: 'none',
        fontSize: '0.9rem',
        fontWeight: '500'
    },
    profileCard: {
        background: 'linear-gradient(135deg, #4F46E5 0%, #4338CA 100%)',
        color: 'white',
        padding: '30px',
        borderRadius: '16px 16px 0 0',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        textAlign: 'center'
    },
    avatarPlaceholder: {
        width: '60px',
        height: '60px',
        background: 'rgba(255,255,255,0.2)',
        borderRadius: '50%',
        margin: '0 auto 15px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '1.5rem'
    },
    roleBadge: {
        background: 'rgba(255,255,255,0.2)',
        padding: '4px 12px',
        borderRadius: '20px',
        fontSize: '0.8rem',
        marginTop: '8px',
        display: 'inline-block'
    },
    formSection: {
        background: '#ffffff',
        padding: '30px',
        borderRadius: '0 0 16px 16px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
        border: '1px solid #E5E7EB',
        borderTop: 'none'
    },
    sectionTitle: {
        fontSize: '1.1rem',
        fontWeight: '600',
        color: '#111827',
        marginBottom: '20px',
        borderBottom: '1px solid #F3F4F6',
        paddingBottom: '10px'
    },
    inputGroup: {
        marginBottom: '20px'
    },
    label: {
        display: 'block',
        marginBottom: '8px',
        fontSize: '0.9rem',
        fontWeight: '500',
        color: '#374151'
    },
    select: {
        width: '100%',
        padding: '12px',
        fontSize: '1rem',
        border: '1px solid #D1D5DB',
        borderRadius: '8px',
        backgroundColor: '#fff',
        outline: 'none',
        transition: 'border-color 0.2s',
        color: '#1F2937'
    },
    button: {
        width: '100%',
        padding: '12px',
        background: '#10B981', 
        color: '#white',
        border: 'none',
        borderRadius: '8px',
        fontSize: '1rem',
        fontWeight: '600',
        cursor: 'pointer',
        transition: 'background 0.2s',
        marginTop: '10px'
    },
    successMessage: {
        background: '#DEF7EC',
        color: '#03543F',
        padding: '12px',
        borderRadius: '8px',
        marginBottom: '20px',
        textAlign: 'center',
        fontWeight: '500',
        border: '1px solid #84E1BC'
    },
    note: {
        marginTop: '20px',
        fontSize: '0.85rem',
        color: '#6B7280',
        textAlign: 'center',
        fontStyle: 'italic'
    }
  };

  return (
    <div style={styles.container}>
      {/* Back Link */}
      <Link to="/personnel" style={styles.backLink}>
        ← Back to Directory
      </Link>

      {/* 1. Profile Header Card */}
      <div style={styles.profileCard}>
        <div style={styles.avatarPlaceholder}>👤</div>
        <h2 style={{margin: 0, fontSize: '1.5rem'}}>{person.name}</h2>
        <span style={styles.roleBadge}>{person.role}</span>
        <div style={{fontSize: '0.9rem', marginTop: '5px', opacity: 0.9}}>{person.email}</div>
      </div>

      {/* 2. Assignment Form Section */}
      <div style={styles.formSection}>
        <h3 style={styles.sectionTitle}>Update Skill Set</h3>

        {message && <div style={styles.successMessage}>✓ {message}</div>}

        <form onSubmit={assignSkill}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Select Skill</label>
            <select value={selectedSkill} onChange={(e) => setSelectedSkill(e.target.value)} style={styles.select}>
              <option value="">-- Choose from Catalog --</option>
              {allSkills.map(s => (
                <option key={s.skill_id} value={s.skill_id}>{s.name} ({s.category})</option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Proficiency Level</label>
            <select value={level} onChange={(e) => setLevel(e.target.value)} style={styles.select}>
              <option value="Beginner">Beginner (Level 1)</option>
              <option value="Intermediate">Intermediate (Level 2)</option>
              <option value="Advanced">Advanced (Level 3)</option>
              <option value="Expert">Expert (Level 4)</option>
            </select>
          </div>

          <button type="submit" style={styles.button}>Assign Skill</button>
        </form>

        <div style={styles.note}>
          * Note: Re-assigning an existing skill will update the proficiency level.
        </div>
      </div>
    </div>
  );
};

export default PersonnelSkills;