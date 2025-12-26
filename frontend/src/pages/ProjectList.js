import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    status: 'Planning'
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await api.get('/projects');
      setProjects(res.data);
    } catch (err) {
      console.error('Error fetching projects', err);
    }
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/projects', formData);
      setMessage('Project Created Successfully!');
      setFormData({ name: '', description: '', start_date: '', end_date: '', status: 'Planning' });
      fetchProjects();
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error creating project.');
    }
  };

  // Helper for Status Colors
  const getStatusStyle = (status) => {
    switch (status) {
      case 'Active': return { bg: '#DEF7EC', text: '#03543F' };
      case 'Completed': return { bg: '#F3F4F6', text: '#1F2937' };
      case 'Planning': return { bg: '#E1EFFE', text: '#1E429F' }; 
      default: return { bg: '#F3F4F6', text: '#374151' };
    }
  };

  const styles = {
    container: { 
      maxWidth: '1100px', 
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
        padding: '30px', 
        borderRadius: '16px', 
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
        marginBottom: '40px',
        border: '1px solid #E5E7EB'
    },
    formTitle: {
        fontSize: '1.2rem',
        fontWeight: '600',
        marginBottom: '20px',
        color: '#374151',
        borderBottom: '1px solid #F3F4F6',
        paddingBottom: '15px'
    },
    formGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px'
    },
    inputGroup: {
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
    },
    label: {
        fontSize: '0.9rem',
        fontWeight: '500',
        color: '#6B7280'
    },
    input: { 
        padding: '12px', 
        fontSize: '0.95rem', 
        border: '1px solid #D1D5DB', 
        borderRadius: '8px',
        outline: 'none',
        transition: 'all 0.2s',
        backgroundColor: '#F9FAFB'
    },
    textarea: {
        padding: '12px', 
        fontSize: '0.95rem', 
        border: '1px solid #D1D5DB', 
        borderRadius: '8px',
        outline: 'none',
        minHeight: '80px',
        fontFamily: 'inherit',
        resize: 'vertical',
        backgroundColor: '#F9FAFB'
    },
    button: { 
        padding: '12px 24px', 
        background: '#2563EB', 
        color: '#fff', 
        border: 'none', 
        borderRadius: '8px', 
        cursor: 'pointer', 
        fontWeight: '600',
        fontSize: '1rem',
        marginTop: '10px',
        transition: 'background 0.2s',
        width: 'fit-content'
    },
    // Table Styles
    tableContainer: {
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
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
        fontSize: '0.8rem', 
        fontWeight: '700', 
        textTransform: 'uppercase', 
        letterSpacing: '0.05em',
        borderBottom: '1px solid #E5E7EB'
    },
    td: { 
        padding: '20px 24px', 
        borderBottom: '1px solid #F3F4F6',
        color: '#111827',
        fontSize: '0.95rem',
        verticalAlign: 'middle'
    },
    badge: (status) => {
        const style = getStatusStyle(status);
        return {
            background: style.bg,
            color: style.text,
            padding: '4px 12px',
            borderRadius: '9999px',
            fontSize: '0.75rem',
            fontWeight: '700',
            textTransform: 'uppercase',
            display: 'inline-block'
        };
    },
    actionBtn: {
        display: 'inline-flex',
        alignItems: 'center',
        padding: '8px 16px',
        background: '#EEF2FF',
        color: '#4F46E5',
        borderRadius: '6px',
        textDecoration: 'none',
        fontSize: '0.85rem',
        fontWeight: '600',
        transition: 'background 0.2s'
    },
    message: {
        padding: '12px',
        background: '#DEF7EC',
        color: '#03543F',
        borderRadius: '8px',
        marginBottom: '20px',
        fontSize: '0.95rem',
        border: '1px solid #84E1BC'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2 style={styles.title}>Project Portfolio</h2>
        <div style={{color: '#6B7280'}}>
            Active Projects: <strong>{projects.filter(p => p.status === 'Active').length}</strong>
        </div>
      </div>

      {message && <div style={styles.message}>✓ {message}</div>}

      {/* Modern Form */}
      <div style={styles.formCard}>
        <h3 style={styles.formTitle}>🚀 Kickoff New Project</h3>
        <form onSubmit={onSubmit} style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
          
          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Project Name</label>
                <input type="text" name="name" placeholder="e.g. Website Redesign" value={formData.name} onChange={onChange} required style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Current Status</label>
                <select name="status" value={formData.status} onChange={onChange} style={styles.input}>
                    <option value="Planning">Planning</option>
                    <option value="Active">Active</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <textarea name="description" placeholder="Brief overview of the project scope..." value={formData.description} onChange={onChange} style={styles.textarea} />
          </div>

          <div style={styles.formGrid}>
            <div style={styles.inputGroup}>
                <label style={styles.label}>Start Date</label>
                <input type="date" name="start_date" value={formData.start_date} onChange={onChange} style={styles.input} />
            </div>
            <div style={styles.inputGroup}>
                <label style={styles.label}>End Date</label>
                <input type="date" name="end_date" value={formData.end_date} onChange={onChange} style={styles.input} />
            </div>
          </div>

          <div style={{textAlign: 'right'}}>
            <button type="submit" style={styles.button}>Create Project</button>
          </div>
        </form>
      </div>

      {/* Modern Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Project Details</th>
              <th style={styles.th}>Timeline</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Action</th>
            </tr>
          </thead>
          <tbody>
            {projects.length > 0 ? projects.map((p) => (
              <tr key={p.project_id}>
                <td style={styles.td}>
                  <div style={{fontWeight: '700', fontSize: '1.05rem', color: '#111827'}}>{p.name}</div>
                  <div style={{color: '#6B7280', fontSize: '0.9rem', marginTop: '4px', maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>
                    {p.description || 'No description provided'}
                  </div>
                </td>
                <td style={styles.td}>
                  <div style={{fontSize: '0.9rem'}}>
                    {p.start_date ? new Date(p.start_date).toLocaleDateString() : 'N/A'} 
                    <span style={{margin: '0 8px', color: '#9CA3AF'}}>→</span>
                    {p.end_date ? new Date(p.end_date).toLocaleDateString() : 'TBD'}
                  </div>
                </td>
                <td style={styles.td}>
                  <span style={styles.badge(p.status)}>
                    {p.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <Link to={`/projects/${p.project_id}`} style={styles.actionBtn}>
                    Manage Staffing →
                  </Link>
                </td>
              </tr>
            )) : (
                <tr>
                    <td colSpan="4" style={{...styles.td, textAlign: 'center', color: '#9CA3AF'}}>
                        No projects found. Create one above to get started.
                    </td>
                </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;