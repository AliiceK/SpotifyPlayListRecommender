//Controllers will handle incoming HTTP requests and delegate data handling to services.
const querystring = require('querystring');

const { generateRandomString, exchangeCodeForToken } = require('../services/tokenService');


exports.login = (req, res, config) => {
    const { CLIENT_ID, CLIENT_SECRET} = config;

    const state = generateRandomString(16);
    const scope = 'user-read-private user-read-playback-state user-read-currently-playing user-read-email playlist-read-private user-top-read playlist-read-collaborative';
    res.redirect(`https://accounts.spotify.com/authorize?${querystring.stringify({
        response_type: 'code',
        client_id: process.env.CLIENT_ID,
        scope: scope,
        redirect_uri: process.env.REDIRECT_URI,
        state: state
    })}`);
};

exports.callback = async (req, res, config) => {
    const { CLIENT_ID, CLIENT_SECRET, REDIRECT_URI } = config;
    console.log("REDEC URI IS" + REDIRECT_URI)
    const code = req.query.code || null;
    const token = await exchangeCodeForToken(code);
    if (token) {
        res.cookie('accessToken', token, { httpOnly: true, secure: true, sameSite: 'strict' });
        res.redirect(`http://localhost:3000`);
    } else {
        res.status(400).send("Error getting the token for the user");
    }
};

exports.logout = (req, res) => {
    // Clear the accessToken cookie by setting its expiration date to the past
    res.cookie('accessToken', '', { expires: new Date(0), httpOnly: true, secure: true, sameSite: 'strict' });
    res.send('Logged out successfully');
};
