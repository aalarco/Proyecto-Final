const axios = require('axios')


export default class APIHandler {

    constructor() {
        this._service = axios.create({
            baseURL: `https://api.themoviedb.org/3`
        })
    }

    getMovieByID = (x) => this._service.get(`/movie/${x}?api_key=4a61e4d31818d43ef0d9ce519905732b`)
    getMovieCast = (x) => this._service.get(`/credits/${x}?api_key=4a61e4d31818d43ef0d9ce519905732b`)

}


