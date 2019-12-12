import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/* API Services */


import Service from '../../service/Movie.service'
import ServiceApi from '../../service/Api.service'


class MovieDetails extends Component{

    constructor(){
        super()
        this._service = new Service()
        this._serviceApi = new ServiceApi()
        this.state = { 
            Title: this.Title,
            TMDB: this.TMDB,
            poster: null,
            trailer_url: this.trailer_url,
            Calification: this.Calification,
            Duration: this.Duration,
            Genre1: this.Genre1,
            SubGenre1: this.SubGenre1,
            Theme1: this.Theme1,
            Mood1: this.Mood1,
            Stream1: this.Stream1


         }


    }

    componentDidMount = () => {
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
                //console.log(res.data.poster_path)
            })
            .catch(err => console.log(err))
    }


    render() {

        const imgSrc = `http://image.tmdb.org/t/p/w185/${this.state.poster}`

        return (
            <Container className="movie-details">
                <section>
                    <Row>
                        <Col>
                            <img src={imgSrc} alt="Movie poster"></img>
                        </Col>

                        <Col md={6}>
                            <h1>{this.state.Title}</h1>
                            <p><strong>Genres:</strong> {this.state.Genre1}</p>
                            <p><strong>SubGenre:</strong> {this.state.SubGenre1}</p>
                            <p><strong>Theme:</strong> {this.state.Theme1}</p>
                            <p><strong>Mood:</strong> {this.state.Mood1}</p>
                            <p><strong>Stream:</strong> {this.state.Stream1}</p>
                            <Link to="/" className="btn btn-dark">Volver</Link>
                        </Col>
                        
                    </Row>
                </section>
            </Container>
        )
    }
}

export default MovieDetails