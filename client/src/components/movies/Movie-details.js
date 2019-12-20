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
            list: [],
            user: { lists: [] },


        }
    }


    componentDidMount = () => {

        const movieId = this.props.match.params.id

        this._movieService.getOneMovie(movieId)
            .then(theMovie => {
                this.setState({ movie: theMovie.data }, () => {
                    this.apiInfo()
                })
            })
            .then(() => this._listService.getAllListsFromUser(this.props.loggedInUser._id))
            .then(allTheListsFromTheUser => {
                this.setState({ list: allTheListsFromTheUser.data })
                //console.log('Todas las listas son:', this.state.list[0].listName)
            })

            .catch(err => console.log(err))

    }

    apiInfo = () => {
        this._apiService.getMovieByID(this.state.movie.TMDB)
            .then(res => {
                this.setState({ poster: res.data.poster_path })
            })
            .catch(err => console.log(err))
    }



    ///// Create list
    handleShowCreate = () => this.setState({ showModalWindowCreate: true })
    handleCloseCreate = () => this.setState({ showModalWindowCreate: false })


    /// Add to existent list
    handleAddToExistentList = e => {
        const selectedList = e.target.dataset.listid
        const movieId = this.props.match.params.id
        //const selectedList = this.state.list._id

        //console.log("Aqui esta la lista del usuario", selectedList, "Aqui la pelicula seleccionada", movieId)

        this._listService.addMovieToList(movieId, selectedList)
            .then(addedMovie => console.log(addedMovie))
            .catch(err => console.log(err))

    }








    render() {

        const imgSrc = `http://image.tmdb.org/t/p/w185/${this.state.poster}`
        const movieIdParams = this.props.match.params.id

        return this.state.movie ? (
            <Container className="margin-navbar">
                <section>
                    <Row>
                        <Col md={{span:4}}>
                            <Row>
                                <img className="movie-details-img" src={imgSrc} alt="Movie poster"></img>
                                {/*<Link to={this.state.movie.Trailer_url} className="btn btn-dark">Ver trailer</Link>*/}
                            </Row>
                            <Row className="lists-btn">

                                {
                                    this.props.loggedInUser &&
                                    <Button variant="dark" onClick={this.handleShowCreate}>Create and add to list</Button>  ///// Añadir  this.props.loggedInUser &&  al principio del botón
                                }
                            </Row>
                            <Row className="lists-btn">
                                {
                                    //<AddToList />                                 
                                    this.props.loggedInUser &&
                                    <DropdownButton variant="dark" id="dropdown-basic-button" title="Add to list">
                                        {this.state.list.map(list => <Dropdown.Item data-listid={list._id} key={list._id} onClick={this.handleAddToExistentList}>{list.listName}</Dropdown.Item >)}
                                    </DropdownButton>
                                }

                            </Row>

                        </Col>

                        <Col md={{span:6, offset: 2}}>
                            <h1>{this.state.movie.Title}</h1>
                            <p><strong>Calification:</strong> {this.state.movie.Calification}</p>
                            <p><strong>Duration:</strong> {this.state.movie.Duration}</p>
                            <p><strong>Genres:</strong> {this.state.movie.Genre1}</p>
                            <p><strong>SubGenre:</strong> {this.state.movie.SubGenre1}, {this.state.movie.SubGenre2}</p>
                            <p><strong>Mood:</strong> {this.state.movie.Mood1}</p>
                            <Link to="/" className="btn btn-dark"> Volver</Link>
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