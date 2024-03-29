import SearchBar from "../Components/SearchBar/SearchBar";

const clientID = "";
const redirectURI = "http://localhost:3000";

let accessToken;

let Spotify = {

    getAccessToken: () => {
        
        if (accessToken) return accessToken;
        
        const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
        const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);

        if (accessTokenMatch && expiresInMatch) {

            accessToken = accessTokenMatch[1];
            const expiresIn = Number(expiresInMatch[1]);

            window.setTimeout(() => accessToken = "", expiresIn * 1000);
            window.history.pushState("Access Token", null, "/");
            return accessToken;
        } else {
            const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = accessUrl;
        }

    },

    async search(term) {

        try {
            const accessToken = Spotify.getAccessToken();
            
            let result = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            });

            result = await result.json();

            if (!result.tracks)  return [];

            return result.tracks.items.map(track => ({
                id: track.id,
                name: track.name,
                artist: track.artists[0].name,
                album: track.album.name,
                uri: track.uri
            }));

        } catch (error) {
            console.log("Error -> " + error);
        }
 
    },

    savePlayList(name, trackURIs) {

        if(!name || !trackURIs.length) {
            return;
        }

        const accessToken = Spotify.getAccessToken();
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };
        let userId;

        return fetch("https://api.spotify.com/v1/me", 
        {
            headers: headers
        }).then(response => response.json()
        ).then(jsonResponse => {
            userId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists`,
            {
                headers: headers,
                method: "POST",
                body: JSON.stringify({ name: name })
            })
        }).then(responce => responce.json()
        ).then(jsonResponse => {
            const playlistId = jsonResponse.id;
            return fetch(`https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`, {
                headers: headers,
                method: "POST",
                body: JSON.stringify( { uris: trackURIs } )
            })
        });

    }

};



export default Spotify;