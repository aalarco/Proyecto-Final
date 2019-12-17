import React, { Component } from 'react'
import { Container, Row, Col, Button, Modal, Dropdown, DropdownButton } from 'react-bootstrap'
import { Link } from 'react-router-dom'

/* API Services */
import MovieService from '../../service/Movie.service'
import ApiService from '../../service/Api.service'
import ListService from '../../service/List.service'

/* Crear lista */
import NewList from '../lists/New-list'

class MovieDetails extends Component {

    constructor(props) {
        super(props)
        this._movieService = new MovieService()
        this._apiService = new ApiService()
        this._listService = new ListService()
        this.state = {
            movie: null,
            poster: null,
            ////
            showModalWindowCreate: false,
            showModalWindowAdd: false,
            ////
            loggedInUser: null,
            list: {},
            user: {}
        }
    }


    componentDidMount = () => {
        console.log('el usuarioi es::::: ',this.props.loggedInUser)

        const movieId = this.props.match.params.id

        this._movieService.getOneMovie(movieId)
            .then(theMovie => {
                this.setState({ movie: theMovie.data }, () => {
                    this.apiInfo()
                })
            })
            .then(()=> this._listService.getAllListsFromUser(this.props.loggedInUser._id))
            .catch(err => console.log(err))
    }

    apiInfo = () => {
        this._apiService.getMovieByID(this.state.movie.TMDB)
            .then(res => {
                this.setState({ poster: res.data.poster_path })
            })
            .catch(err => console.log(err))
    }

    // movieInfo = () => {
    //     this._movieService.getMovieByID(this.state._id)
    //         .then(res => {

    //         })
    // }

    ///// Create list
    handleShowCreate = () => this.setState({ showModalWindowCreate: true })
    handleCloseCreate = () => this.setState({ showModalWindowCreate: false })

    // /// Add list
    // handleShowAdd = () => this.setState({ showModalWindowAdd: true })
    // handleCloseAdd = () => this.setState({ showModalWindowAdd: false })

    /// Add to existent list
    handleAddToExistentList = e => {
        const listId = e.target.dataset.value
        console.log(listId)

    }

    render() {

        const imgSrc = `http://image.tmdb.org/t/p/w185/${this.state.poster}`
        const movieIdParams = this.props.match.params.id

        return this.state.movie ? (
            <Container className="movie-details">
                <section>
                    <Row>
                        <Col>
                            <img src={imgSrc} alt="Movie poster"></img>
                            {/*<Link to={this.state.movie.Trailer_url} className="btn btn-dark">Ver trailer</Link>*/}
                            {
                                this.props.loggedInUser &&
                                <Button variant="dark" onClick={this.handleShowCreate}>Create and add to list</Button>  ///// Añadir  this.props.loggedInUser &&  al principio del botón
                            }


                            {
                                //<AddToList />                                 
                                this.props.loggedInUser &&
                                <DropdownButton variant="dark" id="dropdown-basic-button" title="Add to list">
                                    <Dropdown.Item onClick={this.handleAddToExistentList} data-value={this.state.user.lists}>Lista 1</Dropdown.Item>
                                </DropdownButton>
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

                    <Modal show={this.state.showModalWindowCreate} onHide={this.handleCloseCreate}>
                        <Modal.Header closeButton>
                            <Modal.Title>Create and add to list</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <NewList closeModalWindow={this.handleCloseCreate} idMovie={movieIdParams} />
                        </Modal.Body>
                    </Modal>

                </section>
            </Container>


        ) : "Waiting for the movie"
    }
}

export default MovieDetails