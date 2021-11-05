const youtubeSearch = require("yt-search");

const play = require('play-dl');

const busquedaYoutube = async (nombre) => {

    /* const busquedaYT = await youtubeSearch(nombre);

    return busquedaYT.videos.length > 0 ? busquedaYT.videos[0] : null; */

    const busquedaYT = await play.search(nombre, { limit: 1});

    return busquedaYT.length > 0 ? busquedaYT[0] : null;
}


module.exports = {
    busquedaYoutube
}