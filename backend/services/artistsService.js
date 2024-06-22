const fetch = require('node-fetch');

exports.getUserTopArtists = async (accessToken) => {
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