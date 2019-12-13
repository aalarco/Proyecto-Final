import React, { Component } from 'react'
import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/* API Services */
import Service from '../../service/Movie.service'
import ServiceApi from '../../service/Api.service'

/* Crear lista */
import NewList from '../lists/New-list'

class MovieDetails extends Component {

    constructor() {
        super()
        this._service = new Service()
        this._serviceApi = new ServiceApi()
        this.state = {
            movie: null,
            poster: null,
            ////
            showModalWindow: false
            ////
        }
    }


    componentDidMount = () => {
        const movieId = this.props.match.params.id
    
        this._service.getOneMovie(movieId)
            .then(theMovie => {
                this.setState({ movie: theMovie.data }, () => {
                    console.log(this.state.movie)
                    this.apiInfo()
                })
            })
            .catch(err => console.log(err))
    }

    apiInfo = () => {
        this._serviceApi.getMovieByID(this.state.movie.TMDB)
            .then(res => {
                this.setState({ poster: res.data.poster_path })
                //console.log(res.data.poster_path)
            })
            .catch(err => console.log(err))
    }

    movieInfo = () => {
        this._service.getMovieByID(this.state._id)
            .then(res => {

            })
    }
    
    /////
    handleShow = () => this.setState({ showModalWindow: true })
    handleClose = () => this.setState({ showModalWindow: false })
    /////

    render() {

        const imgSrc = `http://image.tmdb.org/t/p/w185/${this.state.poster}`
        const movieIdParams = this.props.match.params.id

        return this.state.movie ? (
            <Container className="movie-details">
                <section>
                    <Row>
                        <Col>
                            <img src={imgSrc} alt="Movie poster"></img>
                            <Link href={this.state.movie.Trailer_url} className="btn btn-dark">Ver trailer</Link>
                            {
                                <Button variant="dark" onClick={this.handleShow}>Add to list</Button> ///// Añadir  this.props.loggedInUser &&  al principio del botón
                            }
                        </Col>

                        <Col md={6}>
                            <h1>{this.state.movie.Title}</h1>
                            <p><strong>Genres:</strong> {this.state.movie.Genre1}</p>
                            <p><strong>SubGenre:</strong> {this.state.movie.SubGenre1}, {this.state.movie.SubGenre2}</p>
                            <p><strong>Theme:</strong> {this.state.movie.Theme1}, {this.state.movie.Theme2}, {this.state.movie.Theme3}, {this.state.movie.Theme4}, {this.state.movie.Theme5}, </p>
                            <p><strong>Mood:</strong> {this.state.movie.Mood1}</p>
                            <p><strong>Stream:</strong> {this.state.movie.Stream1}</p>
                            <Link to="/" className="btn btn-dark">Volver</Link>
                        </Col>

                    </Row>

                    <Modal show={this.state.showModalWindow} onHide={this.handleClose}>
                        <Modal.Header closeButton>
                            <Modal.Title>Add to list</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NewList closeModalWindow={this.handleClose} idMovie={movieIdParams} />
                        </Modal.Body>
                    </Modal>

                </section>
            </Container>

            
        ) : "Waiting for the movie"
    }
}

export default MovieDetails