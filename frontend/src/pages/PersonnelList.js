import React, { useState, useEffect } from 'react';
import api from '../services/api';

const PersonnelList = () => {
  const [personnel, setPersonnel] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    experience_level: 'Junior' // Default value
  });
  const [message, setMessage] = useState('');

  // Fetch Personnel on Component Mount
  useEffect(() => {
    fetchPersonnel();
  }, []);

  const fetchPersonnel = async () => {
    try {
      const res = await api.get('/personnel');
      setPersonnel(res.data);
    } catch (err) {
      console.error('Error fetching data', err);
    }
  };

  // Handle Input Change
  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Form Submit (Create)
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/personnel', formData);
      setMessage('Personnel Added Successfully!');
      setFormData({ name: '', email: '', role: '', experience_level: 'Junior' }); // Reset form
      fetchPersonnel(); // Refresh list
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(''), 3000);
    } catch (err) {
      setMessage('Error adding personnel. Email might be duplicate.');
    }
  };

  // Handle Delete
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this person?')) {
      try {
        await api.delete(`/personnel/${id}`);
        fetchPersonnel(); 
      } catch (err) {
        alert('Error deleting personnel');
      }
    }
  };

  // Simple Styles
  const styles = {
    container: { maxWidth: '800px', margin: '0 auto' },
    form: { display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px', padding: '20px', background: '#f4f4f4', borderRadius: '5px' },
    input: { padding: '8px', fontSize: '16px' },
    button: { padding: '10px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' },
    deleteBtn: { background: '#dc3545', color: '#fff', border: 'none', padding: '5px 10px', cursor: 'pointer', marginLeft: '10px' },
    table: { width: '100%', borderCollapse: 'collapse', marginTop: '20px' },
    th: { background: '#333', color: '#fff', padding: '10px', textAlign: 'left' },
    td: { borderBottom: '1px solid #ddd', padding: '10px' }
  };

  return (
    <div style={styles.container}>
      <h2>Personnel Management</h2>
      
      {/* Feedback Message */}
      {message && <p style={{ color: 'blue' }}>{message}</p>}

      {/* Add Personnel Form */}
      <form onSubmit={onSubmit} style={styles.form}>
        <h3>Add New Person</h3>
        <input 
          type="text" name="name" placeholder="Name" 
          value={formData.name} onChange={onChange} required style={styles.input} 
        />
        <input 
          type="email" name="email" placeholder="Email" 
          value={formData.email} onChange={onChange} required style={styles.input} 
        />
        <input 
          type="text" name="role" placeholder="Role (e.g. Designer)" 
          value={formData.role} onChange={onChange} style={styles.input} 
        />
        <select name="experience_level" value={formData.experience_level} onChange={onChange} style={styles.input}>
          <option value="Junior">Junior</option>
          <option value="Mid-Level">Mid-Level</option>
          <option value="Senior">Senior</option>
        </select>
        <button type="submit" style={styles.button}>Add Personnel</button>
      </form>

      {/* Personnel List Table */}
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>Role</th>
            <th style={styles.th}>Experience</th>
            <th style={styles.th}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {personnel.map((person) => (
            <tr key={person.person_id}>
              <td style={styles.td}>{person.name}</td>
              <td style={styles.td}>{person.role}</td>
              <td style={styles.td}>{person.experience_level}</td>
              <td style={styles.td}>
                <button 
                  onClick={() => handleDelete(person.person_id)} 
                  style={styles.deleteBtn}
                >
                  Delete
                </button>
                {/* add an "Assign Skills" here */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonnelList;