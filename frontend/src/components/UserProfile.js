import React from 'react';
import { useContext } from 'react';
import { SpotifyContext } from '../SpotifyContext';
import { useEffect } from 'react';
import './UserProfile.css'


const UserProfile = () => {
  const {profile , setProfile} = useContext(SpotifyContext);


  useEffect(() => {
    const fetchProfile = async () => {
      const response = await fetch('/user-profile');
      if (response.ok) {
        const data = await response.json();
        setProfile(data);
      } else {
        console.error('Failed to User Profile');
      }
    };
    fetchProfile();
  }, [setProfile]);

  // you could even define a custom hook let's say : like this 
  // export const useSpotify = () => useContext(SpotifyContext); in SPOTIFYCONTEXT.JS instead of writing useContext(SpotifyContext): every time
  return (
    <div id="welcome-message">
      {profile ? <h1>Welcome, {profile.display_name}!</h1> : <p>Log In!</p>}
    </div>
  );
};

export default UserProfile;
