import axios from 'axios'

export default class Services {

    constructor() {
        this._service = axios.create({
            baseURL: 'http://localhost:5000/api/lists',
            withCredentials: true   // RUTAS PERSISTENTES
        })
    }

    createList = (movielist) => this._service.post('/newList', {movielist})
    
}