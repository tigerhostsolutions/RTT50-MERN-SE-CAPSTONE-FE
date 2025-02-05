import React from 'react';
import PropTypes from 'prop-types';

const ProfileSummary = ({ member, expandDetails }) => {
    return (
        <div className="profile-summary">
            <img
                src={member.photo}
                alt={member.name}
                className="profile-photo"
            />
            <h3>{member.name}</h3>
            {expandDetails && (
                <p>
                    <label>Age:</label> {member.age}
                </p>
            )}
        </div>
    );
};

// Define PropTypes for better type checking
ProfileSummary.propTypes = {
    member: PropTypes.shape({
        photo: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        age: PropTypes.number.isRequired,
    }).isRequired,
    expandDetails: PropTypes.bool.isRequired,
};

export default ProfileSummary;