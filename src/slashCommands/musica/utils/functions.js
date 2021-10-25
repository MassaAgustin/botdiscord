const youtubeSearch = require("yt-search");

const busquedaYoutube = async (nombre) => {

    const busquedaYT = await youtubeSearch(nombre);

    return busquedaYT.videos.length > 0 ? busquedaYT.videos[0] : null;
}


module.exports = {
    busquedaYoutube
}