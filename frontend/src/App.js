import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PersonnelList from './pages/PersonnelList';
import SkillList from './pages/SkillList';
import ProjectList from './pages/ProjectList';
import ProjectDetails from './pages/ProjectDetails';
import PersonnelSkills from './pages/PersonnelSkills';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div style={{ padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/personnel" element={<PersonnelList />} />
            <Route path="/skills" element={<SkillList />} />
            <Route path="/projects" element={<ProjectList />} />
            <Route path="/projects/:id" element={<ProjectDetails />} />
            <Route path="/personnel/:id" element={<PersonnelSkills />} />
            
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;