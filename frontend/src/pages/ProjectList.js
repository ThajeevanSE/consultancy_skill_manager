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

  // Styles
  const styles = {
    container: { maxWidth: '900px', margin: '0 auto' },
    form: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', padding: '20px', background: '#e3f2fd', borderRadius: '5px' },
    input: { padding: '8px', fontSize: '16px' },
    row: { display: 'flex', gap: '10px' },
    button: { padding: '10px', background: '#007bff', color: '#fff', border: 'none', cursor: 'pointer' },
    linkBtn: { textDecoration: 'none', background: '#17a2b8', color: '#fff', padding: '5px 10px', borderRadius: '3px', fontSize: '14px' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
    th: { background: '#333', color: '#fff', padding: '10px', textAlign: 'left' },
    td: { borderBottom: '1px solid #ddd', padding: '10px' }
  };

  return (
    <div style={styles.container}>
      <h2>Project Management</h2>
      {message && <p style={{ color: 'blue' }}>{message}</p>}

      {/* Create Project Form */}
      <form onSubmit={onSubmit} style={styles.form}>
        <h3>Create New Project</h3>
        <input type="text" name="name" placeholder="Project Name" value={formData.name} onChange={onChange} required style={styles.input} />
        <textarea name="description" placeholder="Description" value={formData.description} onChange={onChange} style={{...styles.input, height: '60px'}} />
        <div style={styles.row}>
          <div style={{flex: 1}}>
            <label>Start Date:</label>
            <input type="date" name="start_date" value={formData.start_date} onChange={onChange} style={{...styles.input, width: '100%'}} />
          </div>
          <div style={{flex: 1}}>
            <label>End Date:</label>
            <input type="date" name="end_date" value={formData.end_date} onChange={onChange} style={{...styles.input, width: '100%'}} />
          </div>
        </div>
        <select name="status" value={formData.status} onChange={onChange} style={styles.input}>
          <option value="Planning">Planning</option>
          <option value="Active">Active</option>
          <option value="Completed">Completed</option>
        </select>
        <button type="submit" style={styles.button}>Create Project</button>
      </form>

      {/* Project List */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Project Name</th>
            <th style={styles.th}>Status</th>
            <th style={styles.th}>Dates</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {projects.map((p) => (
            <tr key={p.project_id}>
              <td style={styles.td}>
                <strong>{p.name}</strong><br/>
                <small>{p.description}</small>
              </td>
              <td style={styles.td}>{p.status}</td>
              <td style={styles.td}>
                {p.start_date ? new Date(p.start_date).toLocaleDateString() : 'N/A'} - <br/>
                {p.end_date ? new Date(p.end_date).toLocaleDateString() : 'N/A'}
              </td>
              <td style={styles.td}>
                {/* This link will go to the detailed view we build next */}
                <Link to={`/projects/${p.project_id}`} style={styles.linkBtn}>
                  Manage Skills & Matches
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProjectList;