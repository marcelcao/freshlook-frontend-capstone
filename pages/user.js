/* eslint-disable @next/next/no-img-element */
import React from 'react';
import { useAuth } from '../utils/context/authContext';

export default function UserProfile() {
  const { user } = useAuth();

  return (
    <div className="user-page">
      <img src={user.photoURL} alt="user" width="100px" height="100px" className="user-display-photo" />
      <div className="infos">
        <h1 className="user-info">username: {user.displayName}</h1>
        <h2 className="user-info">user e-mail: {user.email}</h2>
        <h2 className="user-info">last login: {user.metadata.lastSignInTime}</h2>
      </div>
    </div>
  );
}
