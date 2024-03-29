import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import style from '../css/LoginView.module.css';

const LoginView = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [securityKeyHint, setSecurityKeyHint] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Check if the entered email address exists in the database
        axios.get("http://localhost:8000/api/users/emails")
            .then((res) => {
                const userEmails = res.data;
                if (userEmails.includes(email)) {
                    // Email exists, proceed with login
                    // Make another request to authenticate the user with the provided credentials
                    axios.post("http://localhost:8000/api/login", { email, password })
                        .then((res) => {
                            // Handle successful login
                            console.log("Logged in successfully");
                            window.location.href = '/dashboard';
                        })
                        .catch(err => setError("Invalid email or password. Please try again."));
                } else {
                    // Email does not exist
                    setError("Email address not registered.");
                }
            })
            .catch(err => setError("Failed to fetch user emails. Please try again later."));
    };


    const handleForgotPassword = () => {
        axios.post("http://localhost:8000/api/security_hint", { email })
            .then((res) => {
                // Handle success, display security key hint
                setSecurityKeyHint(res.data.securityKeyHint);
            })
            .catch(err => setError("Failed to retrieve security key hint. Please try again."));
    };

    return (
        <div className={style.LoginPage}>
            <div className={style.TitleForm}>
                <div className={style.hTitle}>
                    <h1>Log into the Lowered Expectations Website</h1>
                </div>
                <div className={style.forming}>
                    <form onSubmit={handleLogin} className={style.LoginForm}>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email Address" required />
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
            <div className={style.Error}>{error}</div>
            <div className={style.ForgotPassword}>
                <button onClick={handleForgotPassword}>Security Key Hint</button>
                {securityKeyHint && <p className={style.SecurityKeyHint}>Your security key hint: {securityKeyHint}</p>}
            </div>
            <div className={style.linkingNav}>
                <NavLink to="/register">Don't have an account? Register here</NavLink>
            </div>
        </div>
    );
};

export default LoginView;
