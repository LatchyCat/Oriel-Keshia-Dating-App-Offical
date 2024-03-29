import { useState } from 'react';
import axios from 'axios';

const MatchRequestView = ({ userId, onMatchSent }) => {
    const [isLoading, setIsLoading] = useState(false);

    const handleMatchButtonClick = () => {
        setIsLoading(true);
        // Make API call to send match request
        axios.post(`http://your-api-endpoint/match-request/${userId}`)
            .then(response => {
                // Handle successful match request
                console.log('Match request sent successfully');
                setIsLoading(false);
                // Trigger callback function if provided
                if (onMatchSent) {
                    onMatchSent();
                }
            })
            .catch(error => {
                // Handle error
                console.error('Error sending match request:', error);
                setIsLoading(false);
            });
    };

    return (
        <button onClick={handleMatchButtonClick} disabled={isLoading}>
            {isLoading ? 'Sending Match Request...' : 'Send Match Request'}
        </button>
    );
};

export default MatchRequestView;
