import { useEffect, useState } from 'react';
import authFetch from './utils/auth_fetch';

export default function Login() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginFunction = async (event) => {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const res = await fetch('http://localhost:3100/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await res.json();

            if (res.ok && data.token) {
                sessionStorage.setItem('jwt', data.token);
                // можно зберігати в LS
                // localStorage.setItem('jwt', data.token);
                alert('Login successful! Token saved.');
                window.location.replace("/");
            } else {
                alert(data.message || 'Login error');
            }
        } catch (err) {
            console.error(err);
            alert('Server connection error');
        }
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