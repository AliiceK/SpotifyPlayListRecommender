// Dynamically load the fetch module
let fetch;
import('node-fetch').then(module => {
    fetch = module.default;
}).catch(err => console.error('Failed to load node-fetch:', err));

exports.Recommendations = async (accessToken, seed_tracks, seed_artists, seed_genre) => {
    if (!fetch) {
        console.error('Fetch is not initialized.');
        return;
    }
    
    try {
      const baseUrl = 'https://api.spotify.com/v1/recommendations';
      let url = `${baseUrl}?limit=20&market=from_token`;

      if (seed_tracks.length) url += `&seed_tracks=${seed_tracks.join(',')}`;
      if (seed_artists.length) url += `&seed_artists=${seed_artists.join(',')}`;
      if (seed_genre.length) url += `&seed_genres=${seed_genre}`;

      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken}`
        }
      });
      if (!response.ok) {
        console.error("Error fetching recommendations: ", response.status, response.statusText);
        const responseBody = await response.text();
        console.error("Response body: ", responseBody);
        return null;
      }
      const result = await response.json();
      return result.tracks;
    } catch (error) {
      console.error("Error fetching recommendations: " + error);
      return null;
    }
}
