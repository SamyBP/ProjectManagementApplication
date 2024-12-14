import React from 'react'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';


const App: React.FC = () => (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = { <HomePage/> } />
        <Route path='/sign-in' element = { <LoginPage /> } />
      </Routes>
    </BrowserRouter>

);

export default App;
