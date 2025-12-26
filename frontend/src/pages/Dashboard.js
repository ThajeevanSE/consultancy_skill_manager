import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const Dashboard = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get('/reports/stats');
        setStats(res.data);
      } catch (err) {
        console.error("Error fetching stats", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div style={{padding: '20px'}}>Loading Analytics...</div>;

  // Colors for Charts
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const styles = {
    container: { maxWidth: '1200px', margin: '0 auto', padding: '20px' },
    grid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' },
    card: { background: '#fff', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' },
    title: { borderBottom: '2px solid #f4f4f4', paddingBottom: '10px', marginBottom: '20px', color: '#333' }
  };

  return (
    <div style={styles.container}>
      <h2> Consultancy Overview</h2>
      <p>Real-time insights into your workforce and projects.</p>

      <div style={styles.grid}>
        
        {/* CHART 1: Experience Distribution */}
        <div style={styles.card}>
          <h3 style={styles.title}>👥 Experience Levels</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={stats.experience}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
                nameKey="experience_level"
                label
              >
                {stats.experience.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* CHART 2: Top Skills Supply */}
        <div style={styles.card}>
          <h3 style={styles.title}>🔥 Top Skills Available</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.topSkills}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="count" fill="#8884d8" name="Number of Developers" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* CHART 3: Project Status */}
        <div style={styles.card}>
          <h3 style={styles.title}>📂 Project Status</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={stats.projectStatus} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" allowDecimals={false} />
              <YAxis dataKey="status" type="category" width={100} />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" name="Projects" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* TEXT SUMMARY */}
        <div style={styles.card}>
          <h3 style={styles.title}>⚡ Quick Summary</h3>
          <ul style={{ lineHeight: '2em', fontSize: '1.1em' }}>
            <li><strong>Total Personnel Categories:</strong> {stats.experience.length}</li>
            <li><strong>Top Skill:</strong> {stats.topSkills[0]?.name || 'N/A'}</li>
            <li><strong>Active Projects:</strong> {stats.projectStatus.find(p => p.status === 'Active')?.count || 0}</li>
          </ul>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;