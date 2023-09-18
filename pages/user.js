/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="user-page">
      <div className="profile-photo-page">
        <img src={user.photoURL} alt="user" width="200rem" height="200rem" className="user-display-photo" />
      </div>
      <div className="infos">
        <div className="info-category">
          <p className="user-info">username: </p><p>{user.displayName}</p>
        </div>
        <div className="info-category">
          <p className="user-info">user e-mail:</p><p>{user.email}</p>
        </div>
        <div className="info-category">
          <p className="user-info">last login:</p><p>{user.metadata.lastSignInTime}</p>
        </div>
      </div>
    </div>
  );
}
