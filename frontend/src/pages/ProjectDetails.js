import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import { generateProjectPDF } from '../services/reportGenerator';

const ProjectDetails = () => {
    const { id } = useParams(); 
    const [projectData, setProjectData] = useState(null);
    const [allSkills, setAllSkills] = useState([]);
    const [allPersonnel, setAllPersonnel] = useState([]); // Used for Gap Analysis

    const [selectedSkill, setSelectedSkill] = useState('');
    const [minLevel, setMinLevel] = useState('Beginner');
    const [message, setMessage] = useState('');

    const fetchData = useCallback(async () => {
        try {
            const matchRes = await api.get(`/projects/${id}/matches`);
            setProjectData(matchRes.data);

            const skillsRes = await api.get('/skills');
            setAllSkills(skillsRes.data);

            // Fetch all personnel to analyze why matches failed
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

    // --- GAP ANALYSIS LOGIC ---
    const renderGapAnalysis = () => {
        if (!projectData || projectData.matches.length > 0) return null;
        if (projectData.required_skills.length === 0) return null;

        return (
            <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #ffc107', borderRadius: '8px', backgroundColor: '#fff9e6' }}>
                <h3 style={{ color: '#856404', marginTop: 0 }}>⚠️ Gap Analysis Report</h3>
                <p style={{ fontSize: '0.95em', color: '#666' }}>
                   No perfect matches found. The system has analyzed your workforce to find the bottleneck:
                </p>
                
                <ul style={{ paddingLeft: '20px', marginTop: '15px' }}>
                    {projectData.required_skills.map(req => {
                        return (
                            <li key={req.skill_id} style={{ marginBottom: '15px', lineHeight: '1.5' }}>
                                <strong>Missing Requirement: {req.name} ({req.min_proficiency_level}+)</strong>
                                <br/>
                                <span style={{ fontSize: '0.9em', color: '#444' }}>
                                    💡 <strong>Strategic Advice:</strong> This skill is currently a blocker. 
                                    Consider hiring a specific <em>{req.name} Specialist</em> or enrolling existing 
                                    Junior developers in a training program.
                                </span>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    if (!projectData) return <div>Loading...</div>;

    const { required_skills, matches } = projectData;

    const styles = {
        container: { maxWidth: '1000px', margin: '0 auto', paddingBottom: '50px' },
        section: { marginBottom: '30px', padding: '20px', background: '#f8f9fa', borderRadius: '8px' },
        form: { display: 'flex', gap: '10px', alignItems: 'center', marginTop: '10px' },
        select: { padding: '8px', minWidth: '150px' },
        btn: { padding: '9px 15px', background: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' },
        tag: { display: 'inline-block', padding: '5px 10px', background: '#007bff', color: '#white', borderRadius: '15px', marginRight: '5px', fontSize: '14px' },
        matchCard: { padding: '15px', border: '1px solid #ddd', marginBottom: '10px', borderRadius: '5px', background: '#fff', borderLeft: '5px solid #28a745' }
    };

    return (
        <div style={styles.container}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h2>Project Matching Dashboard</h2>
                <button
                    onClick={() => generateProjectPDF(projectData.project, required_skills, matches)}
                    style={{ padding: '10px 20px', background: '#dc3545', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                >
                    📄 Download PDF Report
                </button>
            </div>

            {/* SECTION 1: REQUIREMENTS */}
            <div style={styles.section}>
                <h3>1. Project Requirements</h3>
                <p>Define what skills are needed for this project.</p>

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
                            <h4>{person.name} <span style={{ fontSize: '0.8em', color: '#666' }}>({person.role})</span></h4>
                            <div>
                                <strong>Skills: </strong>
                                {Object.entries(person.skills).map(([skillId, level]) => {
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
                    <>
                        <p>No personnel match all the current requirements.</p>
                        
                        {renderGapAnalysis()}
                    </>
                )}
            </div>
        </div>
    );
};

export default ProjectDetails;