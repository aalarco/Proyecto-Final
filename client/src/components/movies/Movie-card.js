import React, { Component } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/* API Services */
import ApiService from '../../service/Api.service'
 

class MovieCard extends Component{

    constructor(props){
        super(props)
        this._apiService = new ApiService()
        this.state = {
            id: this.props._id,
            TMDB: this.props.TMDB,
            Title: this.props.Title,
            poster: null
        }
    }

    
    componentDidMount = () => {
        this.apiInfo()
    }

    apiInfo = () => {
        this._apiService.getMovieByID(this.state.TMDB)
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
                         <Link className="movie-card-border" to={`movies/${this.state.id}`}><img src={imgSrc} alt={this.state.Title} className="movie-card-border"></img></Link>
        </Col >
        </Row>
        </>
    )
    }
}




export default MovieCard


