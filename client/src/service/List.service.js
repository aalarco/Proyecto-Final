import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: 'http://localhost:5000/api/lists',
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    createList = (movielist) => this._service.post('/newList', { movielist })
    //addMovieToList = (addMovieToList) => this._service.post('/addMovieToList', { addMovieToList })
    getAllLists = () => this._service.get('/getAllLists')
    getAllListsFromUser = (userId) => this._service.get(`/getAllListsFromUser/${userId}`)
    addMovieToList = (movieId, listId) => this._service.post(`/addMovieToList`, {movieId, listId})
}