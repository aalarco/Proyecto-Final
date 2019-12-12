import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: 'http://localhost:5000/movies',
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    getAllMovies = () => this._service.get('/getAllMovies')
    getOneMovie = id => this._service.get(`/${id}`)
    // postMovie = movie => this._service.post('/new', movie)
}