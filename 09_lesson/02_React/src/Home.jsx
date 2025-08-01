import { useEffect, useState } from 'react';
import authFetch from './utils/auth_fetch';

export default function Home() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('http://localhost:3100/')
            .then((res) => res.json())
            .then((json) => {
                setData(json);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error:', err);
                setLoading(false);
            });
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
    <>
        <h1>{data.title}</h1>
        <div>{data.data}</div>
    </>
    )
}