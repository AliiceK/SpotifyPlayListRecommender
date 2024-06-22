const querystring = require('querystring');

// Dynamically import the fetch module
let fetch; // We declare fetch here to use it later in the function
import('node-fetch').then(module => {
    fetch = module.default; // Assign the default export to fetch
}).catch(err => console.error('Failed to load node-fetch:', err));

function generateRandomString(length) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

async function exchangeCodeForToken(code) {
    if (!fetch) {
        console.error('Fetch is not initialized.');
        return;
    }

    const clientId = process.env.CLIENT_ID;
    const clientSecret = process.env.CLIENT_SECRET;
    const redirectUri = process.env.REDIRECT_URI;
    console.log("This is the redirectUri" + redirectUri);
    
        const authOptions = {
        method: 'POST',
        url: 'https://accounts.spotify.com/api/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + Buffer.from(`${clientId}:${clientSecret}`).toString('base64')
        },
        body: querystring.stringify({
            code: code,
            redirect_uri: redirectUri,
            grant_type: 'authorization_code'
        })
    };
    try {
        const response = await fetch(authOptions.url, {
            method: authOptions.method,
            headers: authOptions.headers,
            body: authOptions.body
        });
        if (!response.ok) {
            console.error(`HTTP Error Response: ${response.status} ${response.statusText}`);
            const errorBody = await response.text();
            console.error('Error response body:', errorBody);
            return null;
        }
        const data = await response.json();
        return data.access_token;
    } catch (error) {
        console.error('Failed to fetch access token:', error);
        return null;
    }
}


module.exports.generateRandomString = generateRandomString;
module.exports.exchangeCodeForToken = exchangeCodeForToken;
