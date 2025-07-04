import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export default function Logout() {

  const navigate = useNavigate();

  useEffect(() => {
    // sessionStorage.removeItem('jwt');
    window.location.replace("/");
  }, []);

  return null;
}