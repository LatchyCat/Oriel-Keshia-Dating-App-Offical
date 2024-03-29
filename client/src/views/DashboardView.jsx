import { useState, useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import style from '../css/DashboardView.module.css';
import axios from 'axios';

const DashboardView = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch all users when the component mounts
        axios.get("http://localhost:8000/api/dashboard")
            .then(res => setUsers(res.data))
            .catch(err => setError("Error fetching users. Please try again later."));
    }, []);

    // Function to calculate compatibility score
    const calculateCompatibilityScore = (user1, user2) => {
        let compatibilityScore = 0;

        // Calculate compatibility score based on common interests
        const commonInterests = user1.interests.filter(interest => user2.interests.includes(interest));
        compatibilityScore += commonInterests.length * 10; // Each common interest adds 10 to the score

        // Add or subtract score based on age difference
        const ageDifference = Math.abs(user1.age - user2.age);
        compatibilityScore += (100 - ageDifference); // More age difference reduces compatibility score

        // Add or subtract score based on distance between users
        const distance = calculateDistance(user1.location, user2.location);
        compatibilityScore -= distance;

        return compatibilityScore;
    };

    // Function to handle finding matches
    const handleFindMatches = () => {
        // Sort users based on compatibility score
        const sortedUsers = users.sort((user1, user2) => {
            const compatibilityScore1 = calculateCompatibilityScore(currentUser, user1);
            const compatibilityScore2 = calculateCompatibilityScore(currentUser, user2);
            return compatibilityScore2 - compatibilityScore1; // Sort in descending order
        });

        // Select the top 5 profiles with the highest compatibility score
        const matchedUsers = sortedUsers.slice(0, 5);
        console.log(matchedUsers);
        // Implement further logic as needed
    };

     // Function to handle sending match request
     const handleSendMatchRequest = async (userId) => {
        try {
            const response = await axios.post(`http://localhost:8000/api/send-match-request/${userId}`);
            console.log("Match request sent successfully:", response.data);
            // Implement further logic as needed after sending the match request
        } catch (error) {
            console.error("Error sending match request:", error.message);
            // Implement error handling logic as needed
        }
    };

    const fetchMatches = () => {
        axios.get("http://localhost:8000/api/my-matches")
            .then(res => setMatches(res.data))
            .catch(err => setError("Error fetching matches. Please try again later."));
    };

    // Function to handle deleting a potential match
    const handleDeleteMatch = async (userId) => {
        try {
            const response = await axios.delete(`http://localhost:8000/api/delete-match/${userId}`);
            console.log("Match deleted successfully:", response.data);
            // Implement further logic as needed after deleting the match
        } catch (error) {
            console.error("Error deleting match:", error.message);
            // Implement error handling logic as needed
        }
    };

    return (
        <div className={style.DashboardContainer}>
        <h1>Start Matching Now!</h1>
        <div className={style.FeatureList}>
            <button onClick={handleFindMatches}>Find Matches</button>
            <div className={style.ProfilesContainer}>
                <h2>All Profiles</h2>
                <table>
                    <thead>
                        <tr>
                            <th>Profile Name</th>
                            <th>State</th>
                            <th>Created At</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={index}>
                                <td>{user.profile && user.profile.profile_name ? user.profile.profile_name : "N/A"}</td>
                                <td>{user.profile && user.profile.state ? user.profile.state : "N/A"}</td>
                                <td>{user.createdAt}</td>
                                <td>
                                    <button onClick={() => handleDeleteMatch(user._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>

                <NavLink to="/my-matches">
                    <button>My Matches</button>
                </NavLink>


        <div className={marriedButton}>
            <NavLink to="/recently-married"> <button>Recently Married</button> </NavLink>
        </div>
    </div>

    );
};

export default DashboardView;
