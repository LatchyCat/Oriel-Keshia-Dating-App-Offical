import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import style from '../css/EditView.module.css';

const EditView = () => {
    const [formData, setFormData] = useState({
        profile_name: '',
        interests: '',
        ethnicity: '',
        isEmployed: false,
        city: '',
        state: '',
    });
    const [error, setError] = useState(null);
    const { id } = useParams();

    const nav = useNavigate();

    useEffect(() => {
        if (id) {
            axios.get(`http://localhost:8000/api/profile/${id}`)
                .then(res => {
                    const { profile_name, interests, ethnicity, isEmployed, city, state } = res.data;
                    setFormData({
                        profile_name,
                        interests,
                        ethnicity,
                        isEmployed,
                        city,
                        state
                    });
                })
                .catch(err => console.log(err));
        }
    }, [id]);

    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Add validation logic for profile form fields if needed
        if (id) {
            axios.put(`http://localhost:8000/api/profile/${id}`, formData)
                .then(res => {
                    // Navigate to the dashboard route upon successful profile update
                    nav(`/dashboard/${id}`);
                })
                .catch(err => {
                    if (err.response && err.response.status === 400) {
                        setError("Invalid data provided. Please check your inputs.");
                    } else {
                        setError("Error updating profile. Please try again later.");
                    }
                });
        } else {
            axios.post(`http://localhost:8000/api/profile`, formData)
                .then(res => {
                    // Navigate to the dashboard route upon successful profile creation
                    nav(`/dashboard/${id}`);
                })
                .catch(err => {
                    if (err.response && err.response.status === 400) {
                        setError("Invalid data provided. Please check your inputs.");
                    } else {
                        setError("Error creating profile. Please try again later.");
                    }
                });
        }
    };

    return (
        <div className={style.ProfileBox}>
            <form onSubmit={handleSubmit}>
                <input type="text" name="profile_name" value={formData.profile_name} onChange={handleInputChange} placeholder="Profile Name" />
                <input type="text" name="interests" value={formData.interests} onChange={handleInputChange} placeholder="Interests" />
                <input type="text" name="ethnicity" value={formData.ethnicity} onChange={handleInputChange} placeholder="Ethnicity" />
                <input type="text" name="city" value={formData.city} onChange={handleInputChange} placeholder="City" />
                <input type="text" name="state" value={formData.state} onChange={handleInputChange} placeholder="State" />
                <label>
                    Employed:
                    <input type="checkbox" name="isEmployed" checked={formData.isEmployed} onChange={() => setFormData({...formData, isEmployed: !formData.isEmployed})} />
                </label>
                <button type="submit">Submit</button>
            </form>
            {error && <div className={style.error}>{error}</div>}
        </div>
    );
};

export default EditView;
