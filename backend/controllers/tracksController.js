
const { getUserTopTracks }= require("../services/tracksService");

exports.getTopTracks = async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
      return res.status(403).send('No access token provided');
    }
  
    const topTracks = await getUserTopTracks(accessToken);
    if (topTracks) {
      res.json(topTracks);
    } else {
      res.status(404).send('Top tracks not found');
    }
};