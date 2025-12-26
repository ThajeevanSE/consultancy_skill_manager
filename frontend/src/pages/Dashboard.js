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

  if (!stats) return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh', color: '#555', fontFamily: 'sans-serif' }}>
      <div className="loader">Loading Analytics...</div>
    </div>
  );


  const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444']; 
  const styles = {
    container: { 
      maxWidth: '1280px', 
      margin: '0 auto', 
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
      color: '#1F2937'
    },
    header: {
      marginBottom: '40px',
      textAlign: 'center'
    },
    heading: {
      fontSize: '2.5rem',
      fontWeight: '800',
      background: 'linear-gradient(90deg, #4F46E5 0%, #3B82F6 100%)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '10px',
      letterSpacing: '-0.025em'
    },
    subHeading: {
      fontSize: '1.1rem',
      color: '#6B7280',
      maxWidth: '600px',
      margin: '0 auto'
    },
    grid: { 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))', 
      gap: '24px', 
      marginTop: '20px' 
    },
    card: { 
      background: '#ffffff', 
      padding: '30px', 
      borderRadius: '16px', 
      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.025)', // Soft shadow
      border: '1px solid #F3F4F6',
      transition: 'transform 0.2s ease',
      height: '400px', 
      display: 'flex',
      flexDirection: 'column'
    },
    cardTitle: { 
      fontSize: '1.25rem',
      fontWeight: '600',
      color: '#111827',
      marginBottom: '20px',
      display: 'flex',
      alignItems: 'center',
      gap: '10px'
    },
    summaryCard: {
      background: 'linear-gradient(135deg, #4F46E5 0%, #6366F1 100%)',
      color: 'white',
      padding: '30px',
      borderRadius: '16px',
      boxShadow: '0 20px 25px -5px rgba(79, 70, 229, 0.3)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    },
    summaryItem: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '15px 0',
      borderBottom: '1px solid rgba(255,255,255,0.2)',
      fontSize: '1.1rem'
    },
    summaryValue: {
      fontWeight: 'bold',
      fontSize: '1.4rem'
    }
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.heading}>Consultancy Analytics</h1>
        <p style={styles.subHeading}>Real-time strategic insights into your workforce capabilities and project utilization.</p>
      </header>

      <div style={styles.grid}>
        
        {/* CHART 1: Experience Distribution */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>👥 Workforce Experience</h3>
          <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.experience}
                  cx="50%"
                  cy="50%"
                  innerRadius={60} // Donut chart looks more modern
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="count"
                  nameKey="experience_level"
                  paddingAngle={5}
                >
                  {stats.experience.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 2: Top Skills Supply */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>🔥 Top Skill Supply</h3>
          <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.topSkills} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#6B7280', fontSize: 12}}
                  dy={10}
                />
                <YAxis 
                  allowDecimals={false} 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#6B7280', fontSize: 12}}
                />
                <Tooltip 
                  cursor={{fill: '#F3F4F6'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#4F46E5" 
                  radius={[4, 4, 0, 0]} 
                  barSize={40}
                  name="Experts"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* CHART 3: Project Status */}
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>📂 Project Pipeline</h3>
          <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stats.projectStatus} layout="vertical" margin={{ top: 10, right: 30, left: 40, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#E5E7EB" />
                <XAxis type="number" allowDecimals={false} hide />
                <YAxis 
                  dataKey="status" 
                  type="category" 
                  axisLine={false} 
                  tickLine={false}
                  tick={{fill: '#374151', fontWeight: 500}}
                />
                <Tooltip 
                  cursor={{fill: '#F3F4F6'}}
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}
                />
                <Bar 
                  dataKey="count" 
                  fill="#10B981" 
                  radius={[0, 4, 4, 0]} 
                  barSize={30}
                  name="Projects"
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* TEXT SUMMARY CARD */}
        <div style={styles.summaryCard}>
          <h3 style={{...styles.cardTitle, color: 'white', marginBottom: '30px'}}>⚡ Executive Summary</h3>
          
          <div style={styles.summaryItem}>
            <span>Skill Categories</span>
            <span style={styles.summaryValue}>{stats.experience.length}</span>
          </div>
          
          <div style={styles.summaryItem}>
            <span>Dominant Skill</span>
            <span style={styles.summaryValue}>{stats.topSkills[0]?.name || 'N/A'}</span>
          </div>
          
          <div style={{...styles.summaryItem, borderBottom: 'none'}}>
            <span>Active Projects</span>
            <span style={styles.summaryValue}>{stats.projectStatus.find(p => p.status === 'Active')?.count || 0}</span>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;
