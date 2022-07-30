import React from "react";

const Profile = ({ currentUser }) => {
  return (
    <div className="explore">
      <p>Profile</p>
      <p>{currentUser[0].username}</p>
      <p>{currentUser[0].email}</p>
    </div>
  );
};

export default Profile;
