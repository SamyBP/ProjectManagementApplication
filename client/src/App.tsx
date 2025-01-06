import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './views/HomePage';
import SignUpController from './controllers/SignUpController';
import DashboardController from './controllers/DashboardController';
import ProjectController from './controllers/ProjectController';
import LoginController from './controllers/LoginController';
import TaskController from './controllers/TaskController';
import ProjectSettingsController from './controllers/ProjectSettingsController';


const App: React.FC = () => (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <HomePage/> } />
        <Route path='/sign-in' element = { <LoginController /> } />
        <Route path='/sign-up' element = { <SignUpController/>} />
        <Route path='/dashboard' element = { <DashboardController /> } />
        <Route path="/projects/:projectId" element = { <ProjectController /> } />
        <Route path="/projects/:projectId/settings" element = { <ProjectSettingsController /> } />
        <Route path="/tasks/:taskId" element = { <TaskController /> } />
      </Routes>
    </BrowserRouter>
);

export default App;
