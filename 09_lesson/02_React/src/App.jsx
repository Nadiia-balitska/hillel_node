import { Routes, Route, Link } from 'react-router-dom';

import Home from './Home';
import About from './About';
import Login from './Login';
import Navigation from './Navigation';
import Header from './Header';
import Logout from './Logout';
import Dashboard from './Dashboard';

export default function App() {
  
  return (
    <div>
      <Header />
      <Navigation />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
      </Routes>
    </div>
  );
}

