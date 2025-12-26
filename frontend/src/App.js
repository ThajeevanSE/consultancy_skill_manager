import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import PersonnelList from './pages/PersonnelList';
import SkillList from './pages/SkillList';
import ProjectList from './pages/ProjectList';

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
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;