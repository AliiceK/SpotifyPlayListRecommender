let fetch; // Declare fetch at the top to use later in the functions
import('node-fetch').then(module => {
    fetch = module.default; // Assign the default export to fetch
}).catch(err => console.error('Failed to load node-fetch:', err));

async function getUserTopTracks(accessToken) {
    if (!fetch) {
        console.error('Fetch is not initialized.');
        return;
    }
    try {
        const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });
        if (!response.ok) {
            console.error("Error fetching user top tracks: ", response.status, response.statusText);
            const responseBody = await response.text();
            console.error("Response body: ", responseBody);
            return null;
        }
        const result = await response.json();
        return result.items;  // 'items' contains the array of top tracks
    } catch (error) {
        console.error("Error fetching user top tracks: " + error);
        return null;
    }
}

async function getUserTopArtists(accessToken) {
      try {
        const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
          headers: {
            'Authorization': `Bearer ${accessToken}`
          }
        });
        if (!response.ok) {
          console.error("Error fetching user top artists: ", response.status, response.statusText);
          const responseBody = await response.text();
          console.error("Response body: ", responseBody);
          return null;
        }
        const result = await response.json();
        return result.items;
      } catch (error) {
        console.error("Error fetching user top artists: " + error);
        return null;
    }
}

module.exports.getUserTopTracks = getUserTopTracks;
module.exports.getUserTopArtists = getUserTopArtists;
