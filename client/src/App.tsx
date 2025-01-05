import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignUpPge from './pages/SignUpPge';
import Dashboard from './pages/Dashboard';
import ProjectPage from './pages/ProjectPage';
import ProjectSettingsPage from './pages/ProjectSettingsPage';
import TaskPage from './pages/TaskPage';


const App: React.FC = () => (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <HomePage/> } />
        <Route path='/sign-in' element = { <LoginPage /> } />
        <Route path='/sign-up' element = { <SignUpPge/>} />
        <Route path='/dashboard' element = { <Dashboard /> } />
        <Route path="/projects/:projectId" element = { <ProjectPage /> } />
        <Route path="/projects/:projectId/settings" element = { <ProjectSettingsPage /> } />
        <Route path="/tasks/:taskId" element = { <TaskPage /> } />
      </Routes>
    </BrowserRouter>

);

export default App;
