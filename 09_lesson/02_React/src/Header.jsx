import { useEffect, useState } from 'react';

export default function Header() {

    const [data, setData] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem('jwt');

        if (token) {
            const payload = parseJwt(token);
            if (payload && payload.username) {
                setData(payload.username)
            }
        } else {
            console.log('JWT not found');
        }
    }, []);

    function parseJwt(token) {
        try {
            const base64Payload = token.split('.')[1]; // get payload from token
            const jsonPayload = atob(base64Payload.replace(/-/g, '+').replace(/_/g, '/'));
            return JSON.parse(jsonPayload);
        } catch (e) {
            console.error('Token decode error:', e);
            return null;
        }
    }


    return (
        <>{data}</>
    );
}