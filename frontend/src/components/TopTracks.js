import React, { useContext } from 'react';
import { SpotifyContext } from '../SpotifyContext';
import { useEffect } from 'react';
import './TopTracks.css'

const TopTracks = () => {
  const { topTracks, setTopTracks } = useContext(SpotifyContext);


  useEffect(() => {
    const fetchTopTracks = async () => {
      const response = await fetch('/user-top-tracks');
      if (response.ok) {
        const data = await response.json();
        setTopTracks(data);
      } else {
        console.error('Failed to fetch top tracks');
      }
    };
    fetchTopTracks();
  }, [setTopTracks]);


  return (
    <div id="top-tracks" >
      <h2>Your Top Tracks</h2>
      {topTracks.length > 0 ? (
        <ul>
          {topTracks.map((track, index) => (
            <li key={index}>{track.name} by {track.artists.map(artist => artist.name).join(", ")}</li>
          ))}
        </ul>
      ) : (
        <p>No top tracks available or log in to view your top tracks.</p>
      )}
    </div>
  );
};

export default TopTracks;
