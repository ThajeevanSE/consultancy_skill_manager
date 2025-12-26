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

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/skills', formData);
      setMessage('Skill Added Successfully!');
      setFormData({ name: '', category: '', description: '' }); 
      fetchSkills(); 
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error adding skill. Name might be duplicate.');
    }
  };

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

  const styles = {
    container: { 
        maxWidth: '900px', 
        margin: '0 auto', 
        padding: '40px 20px',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        color: '#1F2937'
    },
    header: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '30px'
    },
    title: {
        fontSize: '1.8rem',
        fontWeight: '700',
        color: '#111827',
        letterSpacing: '-0.025em'
    },
    // Form Styles
    formCard: { 
        background: '#ffffff', 
        padding: '25px', 
        borderRadius: '12px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        marginBottom: '40px',
        border: '1px solid #E5E7EB'
    },
    formTitle: {
        fontSize: '1.1rem',
        fontWeight: '600',
        marginBottom: '20px',
        color: '#374151',
        borderBottom: '1px solid #F3F4F6',
        paddingBottom: '10px'
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '15px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '6px'
    },
    label: {
        fontSize: '0.85rem',
        fontWeight: '500',
        color: '#6B7280'
    },
    input: { 
        padding: '10px 12px', 
        fontSize: '0.95rem', 
        border: '1px solid #D1D5DB', 
        borderRadius: '6px',
        outline: 'none',
        transition: 'border-color 0.2s',
        width: '100%',
        boxSizing: 'border-box'
    },
    button: { 
        padding: '10px 24px', 
        background: '#4F46E5', 
        color: '#fff', 
        border: 'none', 
        borderRadius: '6px', 
        cursor: 'pointer', 
        fontWeight: '600',
        alignSelf: 'flex-start',
        transition: 'background 0.2s'
    },
    // Table Styles
    tableContainer: {
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        border: '1px solid #E5E7EB'
    },
    table: { 
        width: '100%', 
        borderCollapse: 'collapse', 
        textAlign: 'left'
    },
    th: { 
        background: '#F9FAFB', 
        color: '#6B7280', 
        padding: '16px 24px', 
        fontSize: '0.75rem', 
        fontWeight: '700', 
        textTransform: 'uppercase', 
        letterSpacing: '0.05em',
        borderBottom: '1px solid #E5E7EB'
    },
    td: { 
        padding: '16px 24px', 
        borderBottom: '1px solid #F3F4F6',
        color: '#111827',
        fontSize: '0.95rem'
    },
    categoryBadge: {
        background: '#EEF2FF',
        color: '#4338CA',
        padding: '4px 10px',
        borderRadius: '20px',
        fontSize: '0.75rem',
        fontWeight: '600',
        display: 'inline-block',
        border: '1px solid #C7D2FE'
    },
    deleteBtn: { 
        background: 'transparent', 
        color: '#EF4444', 
        border: 'none', 
        cursor: 'pointer',
        fontSize: '0.9rem',
        fontWeight: '500',
        transition: 'color 0.2s'
    },
    message: {
        padding: '10px',
        background: '#DEF7EC',
        color: '#03543F',
        borderRadius: '6px',
        marginBottom: '20px',
        fontSize: '0.9rem',
        border: '1px solid #84E1BC'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Skill Inventory</h2>
        <div style={{color: '#6B7280', fontSize: '0.9rem'}}>
             Total Skills: <strong>{skills.length}</strong>
        </div>
      </div>
      
      {message && <div style={styles.message}>✓ {message}</div>}

      {/* Add Skill Form */}
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>Define New Competency</h3>
        <form onSubmit={onSubmit}>
            <div style={styles.formGrid}>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Skill Name</label>
                    <input 
                        type="text" name="name" placeholder="e.g. React.js" 
                        value={formData.name} onChange={onChange} required style={styles.input} 
                    />
                </div>
                <div style={styles.inputGroup}>
                    <label style={styles.label}>Category</label>
                    <input 
                        type="text" name="category" placeholder="e.g. Frontend" 
                        value={formData.category} onChange={onChange} style={styles.input} 
                    />
                </div>
            </div>
            
            <div style={{...styles.inputGroup, marginBottom: '20px'}}>
                <label style={styles.label}>Description (Optional)</label>
                <input 
                    type="text" name="description" placeholder="Brief details about this skill..." 
                    value={formData.description} onChange={onChange} style={styles.input} 
                />
            </div>
            
            <button type="submit" style={styles.button}>Add Skill to Catalog</button>
        </form>
      </div>

      {/* Skills Table */}
      <div style={styles.tableContainer}>
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
            {skills.length > 0 ? skills.map((skill) => (
                <tr key={skill.skill_id} style={{ transition: 'background-color 0.2s' }}>
                    <style>{`tr:hover { background-color: #F9FAFB; }`}</style>
                    <td style={styles.td}><strong>{skill.name}</strong></td>
                    <td style={styles.td}>
                        {skill.category ? (
                            <span style={styles.categoryBadge}>{skill.category}</span>
                        ) : (
                            <span style={{color: '#9CA3AF', fontSize: '0.85rem'}}>—</span>
                        )}
                    </td>
                    <td style={styles.td}>
                        {skill.description || <span style={{color: '#9CA3AF', fontStyle: 'italic'}}>No description</span>}
                    </td>
                    <td style={styles.td}>
                        <button 
                            onClick={() => handleDelete(skill.skill_id)} 
                            style={styles.deleteBtn}
                        >
                            Remove
                        </button>
                    </td>
                </tr>
            )) : (
                <tr>
                    <td colSpan="4" style={{...styles.td, textAlign: 'center', color: '#9CA3AF'}}>
                        No skills found. Add your first skill above.
                    </td>
                </tr>
            )}
            </tbody>
        </table>
      </div>
    </div>
  );
};

export default SkillList;