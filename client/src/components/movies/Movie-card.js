import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'


/* API Services */

import Service from '../../service/Movie.service'
import ServiceApi from '../../service/Api.service'
 
class MovieCard extends Component{

    constructor(props){
        super(props)
        this._service = new Service()
        this._serviceApi = new ServiceApi()
        this.state = {
            _id: this.props._id,
            TMDB: this.props.TMDB,
            poster: null
        }
    }

    
    componentDidMount = () => {
        //console.log(this.props.TMDB)    ----------------------------
        const TMDB = this.props.TMDB
        this._service.getOneMovie(TMDB)
            .then(theMovie => console.log(theMovie))
            .catch(err => console.log(err))
        this.apiInfo()
        
    }
    
    apiInfo = () => {
        this._serviceApi.getMovieByID(this.state.TMDB)
            .then(res => {
                this.setState({ poster: res.data.poster_path })
                //console.log(res.data.poster_path)   --------------------------
            })  
            .catch(err => console.log(err))
    }


    render() {

        const imgSrc = `http://image.tmdb.org/t/p/w185/${this.state.poster}`
         return (
             <>
        <Row>
        <Col className="movie-card" md={4}>
              <Link to={`movies/${this.state._id}`}><img src={imgSrc} alt="Movie poster"></img></Link>
            <br></br>

        </Col >
        </Row>
        </>
    )
    }
}




export default MovieCard


