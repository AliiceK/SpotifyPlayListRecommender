// Dynamically import the fetch module
let fetch; // Declare fetch here to use it later in the function
import('node-fetch').then(module => {
    fetch = module.default; // Assign the default export to fetch
}).catch(err => console.error('Failed to load node-fetch:', err));

async function fetchUserProfile(accessToken) {
    if (!fetch) {
        console.error('Fetch is not initialized.');
        return;
    }
    try {
        const response = await fetch("https://api.spotify.com/v1/me", {
            headers: {
                'Authorization': `Bearer ${accessToken}`
            }
        });

        if (!response.ok) {
            console.error("Error fetching user profile: ", response.status, response.statusText);
            const responseBody = await response.text();
            console.error("Response body: ", responseBody);
            return null;
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error("Error fetching user profile" + error);
    }
}

module.exports.fetchUserProfile = fetchUserProfile;
