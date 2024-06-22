import React from 'react';
import { SpotifyContext } from '../SpotifyContext';
import { useEffect } from 'react';
import { useContext } from 'react';
import "./Recommendations.css"


const Recommendations = () => {
  const { recommendedTracks, setrecommendedTracks } = useContext(SpotifyContext);

  useEffect(() => {
    const fetchRecommendations = async () => {
      const response = await fetch('/recommendations');
      if (response.ok) {
        const data = await response.json();
        setrecommendedTracks(data);
      } else {
        console.error('Failed to get user Recommendations');
      }
    };
    fetchRecommendations();
  }, [setrecommendedTracks]);


  return (
    <div id="recommended">
      <h2>Recommended for You</h2>
      {recommendedTracks.length > 0 ? (
        <ul>
          {recommendedTracks.map((track, index) => (
            <li key={index}>{track.name} by {track.artists.map(artist => artist.name).join(", ")}</li>
          ))}
        </ul>
      ) : (
        <p>No recommendations available at the moment.</p>
      )}
    </div>
  );
};

export default Recommendations;
