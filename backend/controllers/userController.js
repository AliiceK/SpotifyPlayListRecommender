
const { fetchUserProfile } = require("../services/userProfileService");

exports.getUserProfile = async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(403).send('No access token provided');
    }

    const profile = await fetchUserProfile(accessToken);
    if (profile) {
        res.json(profile);
    } else {
        res.status(404).send("Profile not found");
    }
};