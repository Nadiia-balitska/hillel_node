import { useEffect, useState } from 'react';
import authFetch from './utils/auth_fetch';

export default function Dashboard() {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const token = sessionStorage.getItem('jwt');
        if (token){
        authFetch('http://localhost:3100/dashboard')
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error:', err);
                setLoading(false);
            });
        }
        else {
            window.location.replace("/login");
        }
    }, []);
    

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <h1>{data.title}</h1>
            <div>{data?.data.map(item => <p key={item}>{item}</p>)}</div>
        </>
    )
}