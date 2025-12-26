import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PersonnelList from './pages/PersonnelList';
import SkillList from './pages/SkillList';
import ProjectList from './pages/ProjectList';
import ProjectDetails from './pages/ProjectDetails';
import PersonnelSkills from './pages/PersonnelSkills';
import Login from './pages/Login'; // Import Login

function App() {
  // Check if token exists in localStorage initially
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

 
  if (!token) {
    return (
      <Router>
        <Routes>
          <Route path="*" element={<Login setToken={setToken} />} />
        </Routes>
      </Router>
    );
  }

 
  return (
    <Router>
      <div className="App">
       
        <Navbar />
        
       
        <button 
            onClick={handleLogout}
            style={{
                position: 'fixed', bottom: '20px', right: '20px',
                padding: '10px 20px', background: '#374151', color: 'white',
                border: 'none', borderRadius: '30px', cursor: 'pointer',
                boxShadow: '0 4px 6px rgba(0,0,0,0.2)', zIndex: 1000
            }}
        >
            Logout
        </button>

        <div style={{ padding: '0px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/personnel" element={<PersonnelList />} />
            <Route path="/personnel/:id" element={<PersonnelSkills />} />
            <Route path="/skills" element={<SkillList />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;