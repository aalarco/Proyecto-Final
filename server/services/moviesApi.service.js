const axios = require('axios')
class APIHandler {

    // constructor(baseUrl) {
    //     this.BASE_URL = baseUrl;
    // }

    getMovieByID(movieId) {
        //https://api.themoviedb.org/3/movie/429?api_key=5a5668367bc1d3e12a55e3df7da31e9d
        return axios.get(`https://api.themoviedb.org/3/movie/${movieId}?api_key=4a61e4d31818d43ef0d9ce519905732b`)
            .then(responseFromAPI => {

                return responseFromAPI.data
            })
    }
}


module.exports = APIHandler;

