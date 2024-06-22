const { getUserTopTracks } = require("../services/tracksService");
const { getUserTopArtists} = require("../services/tracksService");
const { Recommendations } = require("../services/recommendationsService");

exports.getRecommendations = async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(403).send('No access token provided');
    }

    // Example: Fetch user's top tracks and use them as seeds for recommendations
    const topTracks = await getUserTopTracks(accessToken);
    const topArtists = await getUserTopArtists(accessToken);
    if (!topTracks) {
        return res.status(404).send('Failed to fetch top tracks for seeds');
    }

    if (!topArtists) {
        return res.status(404).send('Failed to fetch top artists for seeds');
    }

    const seedTracks = topTracks.slice(0, 2).map(track => track.id);
    const seedArtists = topArtists.slice(0, 2).map(artist => artist.id);
    let allGenres = [];
    topArtists.forEach(artist => {
        allGenres = [...allGenres, ...artist.genres]; // Concatenate genres from each artist
    });

    // Optionally, select the most common genre or use a set to eliminate duplicates
    const uniqueGenres = Array.from(new Set(allGenres)); // Convert to Set and back to Array to ensure uniqueness
    const mostCommonGenre = uniqueGenres[0];


    if (!mostCommonGenre) {
        return res.status(404).send('Failed to fetch top genre based on Artists');
    }

    const recommendations = await Recommendations(accessToken, seedTracks, seedArtists, mostCommonGenre);
    if (recommendations) {
        res.json(recommendations);
    } else {
        res.status(404).send('Failed to fetch recommendations');
    }
};