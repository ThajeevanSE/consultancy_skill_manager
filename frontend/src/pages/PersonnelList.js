import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const PersonnelList = () => {
    const [personnel, setPersonnel] = useState([]);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: '',
        experience_level: 'Junior'
    });
    const [message, setMessage] = useState('');

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

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            await api.post('/personnel', formData);
            setMessage('Personnel Added Successfully!');
            setFormData({ name: '', email: '', role: '', experience_level: 'Junior' });
            fetchPersonnel();
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            setMessage('Error adding personnel. Email might be duplicate.');
        }
    };

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

    // Helper for Badge Colors
    const getBadgeColor = (level) => {
        switch (level) {
            case 'Senior': return { bg: '#DEF7EC', text: '#03543F' }; // Green
            case 'Mid-Level': return { bg: '#E1EFFE', text: '#1E429F' }; // Blue
            case 'Junior': return { bg: '#F3F4F6', text: '#374151' }; // Gray
            default: return { bg: '#F3F4F6', text: '#374151' };
        }
    };

    const styles = {
        container: { 
            maxWidth: '1000px', 
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
        formCard: { 
            background: '#ffffff', 
            padding: '25px', 
            borderRadius: '12px', 
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
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
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '15px',
            alignItems: 'end'
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '5px'
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
            transition: 'border-color 0.2s'
        },
        button: { 
            padding: '10px 20px', 
            background: '#4F46E5', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer', 
            fontWeight: '500',
            height: '42px', 
            transition: 'background 0.2s'
        },
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
            fontWeight: '600', 
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
        badge: (level) => {
            const colors = getBadgeColor(level);
            return {
                background: colors.bg,
                color: colors.text,
                padding: '4px 10px',
                borderRadius: '9999px',
                fontSize: '0.75rem',
                fontWeight: '600',
                display: 'inline-block'
            };
        },
        linkBtn: {
            color: '#4F46E5',
            textDecoration: 'none',
            fontWeight: '500',
            marginRight: '15px',
            fontSize: '0.9rem'
        },
        deleteBtn: {
            background: 'transparent',
            color: '#EF4444',
            border: 'none',
            cursor: 'pointer',
            fontSize: '0.9rem',
            fontWeight: '500'
        },
        message: {
            padding: '10px',
            background: '#DEF7EC',
            color: '#03543F',
            borderRadius: '6px',
            marginBottom: '20px',
            fontSize: '0.9rem'
        }
    };

    return (
        <div style={styles.container}>
            <div style={styles.header}>
                <h2 style={styles.title}>Personnel Directory</h2>
                <div style={{color: '#6B7280', fontSize: '0.9rem'}}>
                    Total Staff: <strong>{personnel.length}</strong>
                </div>
            </div>

            {message && <div style={styles.message}>{message}</div>}

            {/* Modern Form Card */}
            <div style={styles.formCard}>
                <h3 style={styles.formTitle}>Onboard New Employee</h3>
                <form onSubmit={onSubmit} style={styles.formGrid}>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Full Name</label>
                        <input 
                            type="text" name="name" placeholder="e.g. Alice Smith" 
                            value={formData.name} onChange={onChange} required style={styles.input} 
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Email Address</label>
                        <input 
                            type="email" name="email" placeholder="alice@company.com" 
                            value={formData.email} onChange={onChange} required style={styles.input} 
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Job Role</label>
                        <input 
                            type="text" name="role" placeholder="e.g. Frontend Dev" 
                            value={formData.role} onChange={onChange} style={styles.input} 
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label style={styles.label}>Experience</label>
                        <select 
                            name="experience_level" value={formData.experience_level} 
                            onChange={onChange} style={styles.input}
                        >
                            <option value="Junior">Junior</option>
                            <option value="Mid-Level">Mid-Level</option>
                            <option value="Senior">Senior</option>
                        </select>
                    </div>
                    <button type="submit" style={styles.button}>Add Person</button>
                </form>
            </div>

            {/* Clean Data Table */}
            <div style={styles.tableContainer}>
                <table style={styles.table}>
                    <thead>
                        <tr>
                            <style>{`tr:hover { background-color: #F9FAFB; }`}</style>
                            <th style={styles.th}>Name / Role</th>
                            <th style={styles.th}>Email</th>
                            <th style={styles.th}>Level</th>
                            <th style={styles.th}>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {personnel.length > 0 ? personnel.map((person) => (
                            <tr key={person.person_id} style={{transition: 'background-color 0.2s'}}>
                                <td style={styles.td}>
                                    <div style={{fontWeight: '600'}}>{person.name}</div>
                                    <div style={{fontSize: '0.85rem', color: '#6B7280'}}>{person.role}</div>
                                </td>
                                <td style={styles.td}>{person.email}</td>
                                <td style={styles.td}>
                                    <span style={styles.badge(person.experience_level)}>
                                        {person.experience_level}
                                    </span>
                                </td>
                                <td style={styles.td}>
                                    <Link to={`/personnel/${person.person_id}`} style={styles.linkBtn}>
                                        Manage Skills
                                    </Link>
                                    <button 
                                        onClick={() => handleDelete(person.person_id)} 
                                        style={styles.deleteBtn}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        )) : (
                            <tr>
                                <td colSpan="4" style={{...styles.td, textAlign: 'center', color: '#9CA3AF'}}>
                                    No personnel found. Add someone above.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PersonnelList;