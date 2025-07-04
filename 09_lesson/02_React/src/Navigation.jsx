import { NavLink } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function Navigation() {


  const [data, setData] = useState(null);

  useEffect(() => {
    const token = sessionStorage.getItem('jwt');
    if (token) setData(token);
  }, []);

  return (
    <nav>
      <NavLink
        to="/"
        className={({ isActive }) => isActive ? 'active-link' : ''}
      >
        Home
      </NavLink>  {' | '}
      <NavLink
        to="/dashboard"
        className={({ isActive }) => isActive ? 'active-link' : ''}
      >
        Dashboard
      </NavLink>
      {' | '}
      <NavLink
        to="/about"
        className={({ isActive }) => isActive ? 'active-link' : ''}
      >
        About
      </NavLink>
      {' | '}
   { !data ? <NavLink to="/login" className={({ isActive }) => isActive ? 'active-link' : ''} >Login</NavLink> : ''}    
      
      { data ? <NavLink to="/logout"className={({ isActive }) => isActive ? 'active-link' : ''}> Logout</NavLink>: ''} 
    </nav>
  );
}
