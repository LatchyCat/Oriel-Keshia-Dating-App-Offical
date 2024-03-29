import React from 'react';
import { Link } from 'react-router-dom';
import style from '../css/ProfileView.module.css';
import MatchRequestButton from '../components/MatchRequestButton.jsx';

const ProfileView = ({ profile }) => {
    const { profile_name, interests, isEmployed, city, state, ethnicity } = profile;

    return (
        <div className={style.ProfileViewContainer}>
            <h1>Profile View</h1>
            <div className={style.ProfileInfo}>
                <p><strong>Profile Name:</strong> {profile_name}</p>
                <p><strong>Interests:</strong> {interests}</p>
                <p><strong>Employment Status:</strong> {isEmployed ? 'Employed' : 'Unemployed'}</p>
                <p><strong>Location:</strong> {city}, {state}</p>
                <p><strong>Ethnicity:</strong> {ethnicity}</p>
            </div>
            <MatchRequestButton userId={profile.id} />
            <Link to="/dashboard">Go to Dashboard</Link>
        </div>
    );
};

export default ProfileView;
