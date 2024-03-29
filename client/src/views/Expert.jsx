import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import style from '../css/Expert.module.css';
import Expert_Intro from '../utils/videos/expert_intro.mp4';

const Expert = () => {
    const [videoEnded, setVideoEnded] = useState(false);

    const handleVideoEnd = () => {
        setVideoEnded(true);
    };

    return (
        <div className={style.MainExpert}>
            <div className={style.ExpertCell}>
                <h1>Expert Advice</h1>
                <div className={style.VideoBox}>
                    <video controls autoPlay onEnded={handleVideoEnd}>
                        <source src={Expert_Intro} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </div>
                {videoEnded && (
                    <div className={style.RegisterButton}>
                        <NavLink to="/register" className={style.ButtonRegister}>
                            Register Now
                        </NavLink>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Expert;
