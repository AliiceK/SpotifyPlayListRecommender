const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
// import request from 'request-promise';
// import querystring from 'querystring';
// import fetch from 'node-fetch';
const { login } = require('./controllers/authController.js');
const { callback } = require('./controllers/authController.js');
const { logout } = require("./controllers/authController.js");
const { getRecommendations} = require('./controllers/recommendationsController.js');
const { getTopTracks } = require('./controllers/tracksController.js');
const { getUserProfile } = require('./controllers/userController.js');




var app = express();
const router = express.Router();

app.use(cors());
app.use(cookieParser());
// REMEMBER !!! by express handler is gonna handle authentication flow therefore so
//  /login and /callback should go to the same port !!!

const PORT = 5000 || process.env.PORT;


const config = {
  CLIENT_ID: process.env.CLIENT_ID,
  CLIENT_SECRET: process.env.CLIENT_SECRET,
  REDIRECT_URI: process.env.REDIRECT_URI
};

router.get('/login', (req, res) => login(req, res, config));
router.get('/callback', (req, res) => callback(req, res, config));
router.get('/user-profile', getUserProfile);
router.get('/user-top-tracks', getTopTracks);
router.get('/recommendations', getRecommendations);
router.get('/logout', logout);

app.use(router);


app.get('/', (req, res) => {
  res.send('Hello from Backend!');
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});


module.exports = app;

// app.get('/login', function (req, res) {
//   console.log("Redirecting user to Spotify's authorization Page");
//   console.log("This is the request : " + req)
//   var state = generateRandomString(16) // protection against attacks
//   var scope = 'user-read-private user-read-playback-state user-read-currently-playing user-read-email playlist-read-private user-top-read playlist-read-collaborative';
//   //user-read-private: Read access to user’s subscription details (type of user account).
//   // user-read-email: Read access to user’s email address.
//   // playlist-read-playlist: read private playlists.
//   //user-top-read : top artists and tracks

//   res.redirect('https://accounts.spotify.com/authorize?' +
//     querystring.stringify({
//       response_type: 'code',
//       client_id: client_id,
//       scope: scope,
//       redirect_uri: redirect_uri + '/callback',
//       state: state
//     }));
// });

// app.get('/callback', async (req, res) => {
//   console.log("Now it's time to trade the code for the access_token")
//   const code = req.query.code || null;

//   const token = await getToken(code);

//   if (token) {
//     res.cookie('accessToken', token, { httpOnly: true, secure: true, sameSite: 'strict' }); // Set the cookie
//     // To securely manage the access token after authentication, use HTTP-Only and Secure cookies. This prevents client-side JavaScript from accessing the token, thus reducing the risk of XSS attacks, and ensures the token is only sent over HTTPS,
//     // reducing the risk of MITM (Man-In-The-Middle) attacks.


//     // QUESTION: How can i access it ? like this const accessToken = req.cookies.accessToken;
//     // const userInfo = await getUserProfile(token); // let me also get the display name for the respective user 
//     // const displayName = userInfo.display_name;
//     // console.log("this is the display name: " + displayName);
//     res.redirect(`http://localhost:3000`);

//   } else {
//     res.status(400).send(`Error getting the token for the user`);
//   }
// });

//Remember if the user accepts these conditions, I dont have a accesstoken yet. i have a CODE
// thsi code can be later exchnaged for an access_token

//Used as a CSRF token to protect against cross-site request forgery attacks. its for security basically
// function generateRandomString(length) {
//   let text = '';
//   let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

//   for (let i = 0; i < length; i++) {
//     text += possible.charAt(Math.floor(Math.random() * possible.length));
//   }
//   return text;
// }


//function that will Handle getting th token for userA and/or userB 
// async function getToken(code) {
//   var authOptions = {
//     method: 'POST',
//     url: 'https://accounts.spotify.com/api/token',
//     form: {
//       code: code,
//       redirect_uri: redirect_uri + '/callback',
//       grant_type: 'authorization_code'
//     },
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       'Authorization': 'Basic ' + (new Buffer.from(client_id + ':' + client_secret).toString('base64'))
//     },
//     json: true
//   };
//   try {
//     const response = await request(authOptions);
//     console.log("This is the token:" + response.access_token);
//     return response.access_token;
//   } catch (error) {
//     console.error('Error getting token:', error);
//     return null;
//   }
// };


// async function getUserProfile(accessToken) {
//   try {
//     const response = await fetch("https://api.spotify.com/v1/me", {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`
//       }
//     });

//     if (!response.ok) {
//       console.error("Error fetching user profile: ", response.status, response.statusText);
//       const responseBody = await response.text();
//       console.error("Response body: ", responseBody);
//       return null;
//     }

//     const result = await response.json();;
//     return result;
//   } catch (error) {
//     console.error("Error fetching user profile" + error);
//   }
// }

// app.get('/user-profile', async (req, res) => {
//   const accessToken = req.cookies.accessToken;
//   if (!accessToken) {
//     return res.status(403).send('No access token provided');
//   }

//   const userProfile = await getUserProfile(accessToken);
//   if (userProfile) {
//     res.json(userProfile);
//   } else {
//     res.status(404).send('Display name not found');
//   }
// });


// Server-side function to fetch user's top tracks
// this is a service btw
// async function getUserTopTracks(accessToken) {
//   try {
//     const response = await fetch('https://api.spotify.com/v1/me/top/tracks', {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`
//       }
//     });
//     if (!response.ok) {
//       console.error("Error fetching user top tracks: ", response.status, response.statusText);
//       const responseBody = await response.text();
//       console.error("Response body: ", responseBody);
//       return null;
//     }
//     const result = await response.json();
//     return result.items;  // 'items' contains the array of top tracks
//   } catch (error) {
//     console.error("Error fetching user top tracks: " + error);
//     return null;
//   }
// }

// async function getUserTopArtists(accessToken) {
//   try {
//     const response = await fetch('https://api.spotify.com/v1/me/top/artists', {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`
//       }
//     });
//     if (!response.ok) {
//       console.error("Error fetching user top artists: ", response.status, response.statusText);
//       const responseBody = await response.text();
//       console.error("Response body: ", responseBody);
//       return null;
//     }
//     const result = await response.json();
//     return result.items;
//   } catch (error) {
//     console.error("Error fetching user top artists: " + error);
//     return null;
//   }
// }

// app.get('/user-top-tracks', async (req, res) => {
//   const accessToken = req.cookies.accessToken;
//   if (!accessToken) {
//     return res.status(403).send('No access token provided');
//   }

//   const topTracks = await getUserTopTracks(accessToken);
//   if (topTracks) {
//     res.json(topTracks);
//   } else {
//     res.status(404).send('Top tracks not found');
//   }
// });



// async function getCurrentlyPlayingTrack(accessToken) {
//   try {
//     const response = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`
//       }
//     });
//     if (!response.ok) {
//       console.error("Error fetching currently playing track: ", response.status, response.statusText);
//       const responseBody = await response.text();
//       console.error("Response body: ", responseBody);
//       return null;
//     }
//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Error fetching currently playing track: " + error);
//     return null;
//   }
// }

// currently playing track
// app.get('/currently-playing', async (req, res) => {
//   const accessToken = req.cookies.accessToken;
//   if (!accessToken) {
//     return res.status(403).send('No access token provided');
//   }

//   const currentlyPlayingTrack = await getCurrentlyPlayingTrack(accessToken);
//   if (currentlyPlayingTrack) {
//     res.json(currentlyPlayingTrack);
//   } else {
//     res.status(404).send('No track currently playing');
//   }
// });

// async function getRecommendations(accessToken, seed_tracks, seed_artists, seed_genre) {
//   try {
//     const baseUrl = 'https://api.spotify.com/v1/recommendations';
//     let url = `${baseUrl}?limit=20&market=from_token`;

//     if (seed_tracks.length) url += `&seed_tracks=${seed_tracks.join(',')}`;
//     if (seed_artists.length) url += `&seed_artists=${seed_artists.join(',')}`;
//     if (seed_genre.length) url += `&seed_genres=${seed_genre}`;

//     const response = await fetch(url, {
//       headers: {
//         'Authorization': `Bearer ${accessToken}`
//       }
//     });
//     if (!response.ok) {
//       console.error("Error fetching recommendations: ", response.status, response.statusText);
//       const responseBody = await response.text();
//       console.error("Response body: ", responseBody);
//       return null;
//     }
//     const result = await response.json();
//     return result.tracks;
//   } catch (error) {
//     console.error("Error fetching recommendations: " + error);
//     return null;
//   }
// }

// app.get('/recommendations', async (req, res) => {
//   const accessToken = req.cookies.accessToken;
//   if (!accessToken) {
//     return res.status(403).send('No access token provided');
//   }

//   // Example: Fetch user's top tracks and use them as seeds for recommendations
//   const topTracks = await getUserTopTracks(accessToken);
//   const topArtists = await getUserTopArtists(accessToken);
//   if (!topTracks) {
//     return res.status(404).send('Failed to fetch top tracks for seeds');
//   }

//   if (!topArtists) {
//     return res.status(404).send('Failed to fetch top artists for seeds');
//   }

//   const seedTracks = topTracks.slice(0, 2).map(track => track.id);
//   const seedArtists = topArtists.slice(0, 2).map(artist => artist.id);
//   let allGenres = [];
//   topArtists.forEach(artist => {
//     allGenres = [...allGenres, ...artist.genres]; // Concatenate genres from each artist
//   });

//   // Optionally, select the most common genre or use a set to eliminate duplicates
//   const uniqueGenres = Array.from(new Set(allGenres)); // Convert to Set and back to Array to ensure uniqueness
//   const mostCommonGenre = uniqueGenres[0]; 


//   if (!mostCommonGenre) {
//     return res.status(404).send('Failed to fetch top genre based on Artists');
//   }

//   const recommendations = await getRecommendations(accessToken, seedTracks, seedArtists, mostCommonGenre);
//   if (recommendations) {
//     res.json(recommendations);
//   } else {
//     res.status(404).send('Failed to fetch recommendations');
//   }
// });

