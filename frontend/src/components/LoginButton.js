import React from 'react';
import './LoginButton.css';

const LoginButton = () => {
  return (
    <button id="button" onClick={() => window.location.href = 'http://localhost:5000/login'}>
      Log in with Spotify
    </button>
  );
};

export default LoginButton;
