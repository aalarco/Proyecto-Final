import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: 'http://localhost:5000/api/movies',
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    getAllMovies = () => this._service.get('/getAllMovies')
    getOneMovie = id => this._service.get(`/${id}`)
    getMoviesByGenre = genre => this._service.post('/getMoviesByGenre', { genre })
    getMoviesBySubGenre = subgenre => this._service.post('/getMoviesBySubGenre', { subgenre })
    getMoviesByMood = mood => this._service.post('/getMoviesByMood', {mood})
    
  
}