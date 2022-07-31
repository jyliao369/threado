import React from "react";

const Profile = ({ currentUser }) => {
  return (
    <div className="profile">
      <p>Profile</p>
      <p>{currentUser.username}</p>
      <p>{currentUser.email}</p>
    </div>
  );
};

export default Profile;
