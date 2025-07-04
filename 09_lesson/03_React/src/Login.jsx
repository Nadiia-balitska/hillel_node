import { useEffect, useState } from 'react';
import authFetch from './utils/auth_fetch';

export default function Login() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginFunction = async (event) => {
    }

    return (
        <>
            <form id="login-form" onSubmit={loginFunction}>
                <input type="text" id="username" placeholder="Логін" required defaultValue="admin" />
                <br />
                <input type="password" id="password" placeholder="Пароль" required defaultValue="123" />
                <br />
                <button type="submit">Login</button>
            </form>
        </>
    )
}