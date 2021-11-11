/**
 * Avatar component
 *
 * Shows user photo if possible and fallbacks to showing user initials.
 */
import React from "react";
import "./styles.css";

const Avatar = ({ profile }) => (
  <div className="avatar">
    {profile.photoURL ? (
      <img src={profile.photoURL} alt="User avatar" className="avatar-photo" />
    ) : (
      <span className="avatar-letters">
        {profile.firstName?.charAt(0)}
        {profile.lastName?.charAt(0)}
      </span>
    )}
  </div>
);

export default Avatar;
