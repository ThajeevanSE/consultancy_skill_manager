import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { generateProjectPDF } from '../services/reportGenerator';

const ProjectDetails = () => {
    const { id } = useParams(); 
    const [projectData, setProjectData] = useState(null);
    const [allSkills, setAllSkills] = useState([]);
    const [allPersonnel, setAllPersonnel] = useState([]); 

    const [selectedSkill, setSelectedSkill] = useState('');
    const [minLevel, setMinLevel] = useState('Beginner');
    const [message, setMessage] = useState('');

    const fetchData = useCallback(async () => {
        try {
            const matchRes = await api.get(`/projects/${id}/matches`);
            setProjectData(matchRes.data);

            const skillsRes = await api.get('/skills');
            setAllSkills(skillsRes.data);

            const peopleRes = await api.get('/personnel');
            setAllPersonnel(peopleRes.data);
        } catch (err) {
            console.error('Error fetching details', err);
        }
    }, [id]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const addRequirement = async (e) => {
        e.preventDefault();
        if (!selectedSkill) return alert('Please select a skill');

        try {
            await api.post(`/projects/${id}/skills`, {
                skill_id: selectedSkill,
                min_proficiency_level: minLevel
            });
            setMessage('Requirement Added!');
            fetchData(); 
            setTimeout(() => setMessage(''), 3000);
        } catch (err) {
            alert('Error adding requirement');
        }
    };

    
    const styles = {
        container: { 
            maxWidth: '1200px', 
            margin: '0 auto', 
            padding: '40px 20px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            color: '#1F2937'
        },
        header: {
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginBottom: '30px',
            paddingBottom: '20px',
            borderBottom: '1px solid #E5E7EB'
        },
        title: {
            fontSize: '2rem',
            fontWeight: '800',
            color: '#111827',
            letterSpacing: '-0.025em',
            margin: 0
        },
        sectionCard: {
            background: '#ffffff',
            padding: '30px',
            borderRadius: '16px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
            marginBottom: '30px',
            border: '1px solid #E5E7EB'
        },
        sectionTitle: {
            fontSize: '1.25rem',
            fontWeight: '700',
            color: '#374151',
            marginBottom: '15px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        subText: {
            color: '#6B7280',
            marginBottom: '20px',
            fontSize: '0.95rem'
        },
        tagContainer: {
            display: 'flex',
            flexWrap: 'wrap',
            gap: '10px',
            marginBottom: '25px'
        },
        tag: {
            background: '#E0E7FF',
            color: '#4338CA',
            padding: '6px 14px',
            borderRadius: '9999px',
            fontSize: '0.85rem',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            border: '1px solid #C7D2FE'
        },
        form: { 
            display: 'flex', 
            gap: '15px', 
            alignItems: 'center', 
            marginTop: '20px',
            background: '#F9FAFB',
            padding: '15px',
            borderRadius: '8px',
            border: '1px solid #F3F4F6'
        },
        select: { 
            padding: '10px', 
            borderRadius: '6px', 
            border: '1px solid #D1D5DB',
            minWidth: '200px',
            fontSize: '0.9rem'
        },
        btnPrimary: { 
            padding: '10px 20px', 
            background: '#4F46E5', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: '600',
            transition: 'background 0.2s'
        },
        btnDanger: {
            padding: '10px 20px', 
            background: '#EF4444', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '6px', 
            cursor: 'pointer',
            fontWeight: '600',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 4px 6px rgba(239, 68, 68, 0.2)'
        },
        matchesGrid: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '20px'
        },
        matchCard: { 
            padding: '20px', 
            border: '1px solid #E5E7EB', 
            borderRadius: '12px', 
            background: '#ffffff', 
            borderLeft: '5px solid #10B981', 
            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
            transition: 'transform 0.2s',
        },
        matchName: {
            fontSize: '1.1rem',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '5px'
        },
        matchRole: {
            fontSize: '0.9rem',
            color: '#6B7280',
            marginBottom: '15px',
            display: 'block'
        },
        skillList: {
            fontSize: '0.85rem',
            color: '#4B5563',
            lineHeight: '1.6'
        },
        gapCard: { 
            marginTop: '20px', 
            padding: '25px', 
            border: '1px solid #FCD34D', 
            borderRadius: '12px', 
            backgroundColor: '#FFFBEB' 
        }
    };

    // --- GAP ANALYSIS LOGIC ---
    const renderGapAnalysis = () => {
        if (!projectData || projectData.matches.length > 0) return null;
        if (projectData.required_skills.length === 0) return null;

        return (
            <div style={styles.gapCard}>
                <h3 style={{ color: '#92400E', marginTop: 0, display: 'flex', alignItems: 'center', gap: '10px' }}>
                    ⚠️ Gap Analysis Report
                </h3>
                <p style={{ fontSize: '0.95em', color: '#78350F', marginBottom: '15px' }}>
                   No perfect matches found. The system has analyzed your workforce to find the bottleneck:
                </p>
                
                <ul style={{ paddingLeft: '20px', marginTop: '0' }}>
                    {projectData.required_skills.map(req => (
                        <li key={req.skill_id} style={{ marginBottom: '15px', color: '#92400E' }}>
                            <strong>Missing Requirement: {req.name} ({req.min_proficiency_level}+)</strong>
                            <div style={{ fontSize: '0.9em', color: '#B45309', marginTop: '5px', background: 'rgba(255,255,255,0.5)', padding: '10px', borderRadius: '6px' }}>
                                💡 <strong>Strategic Advice:</strong> This skill is currently a blocker. 
                                Consider hiring a specific <em>{req.name} Specialist</em> or enrolling existing 
                                Junior developers in a training program.
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    };

    if (!projectData) return (
        <div style={{display: 'flex', justifyContent: 'center', paddingTop: '50px'}}>Loading...</div>
    );

    const { required_skills, matches } = projectData;

    return (
        <div style={styles.container}>
            {/* 1. Header Section */}
            <div style={styles.header}>
                <div>
                    <h2 style={styles.title}>Project Matching</h2>
                    <span style={{color: '#6B7280'}}>Manage requirements and view team fit</span>
                </div>
                <button
                    onClick={() => generateProjectPDF(projectData.project, required_skills, matches)}
                    style={styles.btnDanger}
                >
                    <span>📄</span> Download Report PDF
                </button>
            </div>

            {/* 2. Requirements Section */}
            <div style={styles.sectionCard}>
                <h3 style={styles.sectionTitle}>🛠️ Project Requirements</h3>
                <p style={styles.subText}>Define what skills and proficiency levels are mandatory for this project.</p>

                <div style={styles.tagContainer}>
                    {required_skills && required_skills.length > 0 ? (
                        required_skills.map(req => (
                            <span key={req.skill_id} style={styles.tag}>
                                {req.name} • {req.min_proficiency_level}+
                            </span>
                        ))
                    ) : (
                        <div style={{ fontStyle: 'italic', color: '#9CA3AF' }}>No requirements defined yet.</div>
                    )}
                </div>

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

                    <button type="submit" style={styles.btnPrimary}>+ Add Requirement</button>
                </form>
                {message && <div style={{ color: '#059669', marginTop: '10px', fontWeight: '500' }}>✓ {message}</div>}
            </div>

            {/* 3. Matches Section */}
            <div style={styles.sectionCard}>
                <h3 style={styles.sectionTitle}>✅ Suggested Team Members</h3>
                <p style={styles.subText}>Personnel who meet <strong>ALL</strong> requirements above.</p>

                {matches && matches.length > 0 ? (
                    <div style={styles.matchesGrid}>
                        {matches.map(person => (
                            <div key={person.id} style={styles.matchCard}>
                                <div style={styles.matchName}>{person.name}</div>
                                <span style={styles.matchRole}>{person.role}</span>
                                <div style={{borderTop: '1px solid #F3F4F6', paddingTop: '10px', marginTop: '10px'}}>
                                    <div style={{fontSize: '0.8rem', fontWeight: '700', color: '#9CA3AF', marginBottom: '5px'}}>SKILL MATCHES</div>
                                    <div style={styles.skillList}>
                                        {Object.entries(person.skills).map(([skillId, level]) => {
                                            const skillName = allSkills.find(s => s.skill_id === parseInt(skillId))?.name || 'Unknown';
                                            return (
                                                <div key={skillId} style={{display: 'flex', justifyContent: 'space-between'}}>
                                                    <span>{skillName}</span>
                                                    <span style={{color: '#4F46E5', fontWeight: '600'}}>{level}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <>
                        <div style={{textAlign: 'center', padding: '20px', color: '#6B7280'}}>
                            No personnel match all the current requirements.
                        </div>
                        {renderGapAnalysis()}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;