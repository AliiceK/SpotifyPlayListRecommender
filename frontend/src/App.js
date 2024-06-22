import React from 'react';
// import { BrowserRouter as Router, Route, Switch, BrowserRouter, Routes } from 'react-router-dom';
// import MainPage from './components/MainPage';

import { SpotifyProvider } from './SpotifyContext';
import LoginButton from './components/LoginButton';
import UserProfile from './components/UserProfile';
import TopTracks from './components/TopTracks';
import Recommendations from './components/Recommendations';
import LogoutButton from './components/LogoutButton';
import "./App.css"


function App() {


  // const [profile, setProfile] = useState(null);
  // const [topTracks, setTopTracks] = useState([]);
  // const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  // const [recommendedTracks, setrecommendedTracks] = useState([]);



  return (
    // Provider wraps the code that needs access of your context
    // Value: the value of your context
    // REMEMBER!! Every component inside your Provider has access to the values

    // Now instead of SpotifyContext.Provider we have only SpotifyProvider
    <SpotifyProvider>
      <div>
        <LoginButton />
        <UserProfile />
        <div id="layout">
          <TopTracks />
          <Recommendations />
        </div>
        <LogoutButton />
      </div>
    </SpotifyProvider>
  );
}

export default App;
