import { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../css/RegisterView.module.css';

const RegisterView = ({ history }) => {
    const [error, setError] = useState(null);
    const [formData, setFormData] = useState({
        first: '',
        last: '',
        birthday: '',
        email: '',
        password: '',
        confirmPassword: '',
        security_key_hint: ''
    });

    const nav = useNavigate()

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Password validation regex
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

        // Check if password meets the criteria
        if (!passwordRegex.test(formData.password)) {
            setError("Password must contain at least one lowercase letter, one uppercase letter, one number, one special character, and be at least 8 characters long!");
            return;
        }

        // Continue with user registration if password is valid
        axios.post("http://localhost:8000/api/register", formData)
            .then((res) => {
                // Navigate to '/edit' route after successful registration
                nav(`/edit/${res.data._id}`);
            })
            .catch(err => {
                if (err.response && err.response.status === 409) {
                    setError("Email address is already in use. Please choose a different email.");
                } else {
                    setError("Error registering user. Please try again later.");
                }
            });
    };
    return (
        <div className={style.RegisterBox}>
            <form onSubmit={handleSubmit}>

                    <input type="text" name="first" value={formData.first} onChange={handleInputChange} placeholder="First Name" />
                    <input type="text" name="last" value={formData.last} onChange={handleInputChange} placeholder="Last Name" />
                    <input type="date" name="birthday" value={formData.birthday} onChange={handleInputChange} placeholder="Birthday" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Email" />
                    <input type="password" name="password" value={formData.password} onChange={handleInputChange} placeholder="Password" />
                    <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} placeholder="Confirm Password" />
                    <input type="text" name="security_key_hint" value={formData.security_key_hint} onChange={handleInputChange} placeholder="Security Key Hint" />

                    <button type="submit">Register</button>
            </form>
           {error && <div className={style.error}>{error}</div>}
        </div>
    );
};

export default RegisterView;
