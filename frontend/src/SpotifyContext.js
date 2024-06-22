// The reason why this component is created is because we have the States ( Profile, Top Tracks..)
// In App.js . So let's extractr them into its own Component
import { useState } from "react";
import React from "react";

export const SpotifyContext = React.createContext();


export function SpotifyProvider({children}) {
    
  const [profile, setProfile] = useState(null);
  const [topTracks, setTopTracks] = useState([]);
 const [recommendedTracks, setrecommendedTracks] = useState([]);

    return (
        <SpotifyContext.Provider value={{profile, topTracks, setProfile, setTopTracks, setrecommendedTracks, recommendedTracks}}>
            {children}
        </SpotifyContext.Provider>
    )
    
}

// so when you were writting <SpotifyContext.Provider value={Profile, setProfile..} > This is replaced by simply <SpotifyProvider>