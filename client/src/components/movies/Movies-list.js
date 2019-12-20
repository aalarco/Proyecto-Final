import React, { Component } from 'react'
import MovieService from '../../service/Movie.service'
import { Container, Row, Col, Form } from 'react-bootstrap'

import GenreFilter from '../filters/Genre-filter'
import SubGenreFilter from '../filters/SubGenre-filter'
import MoodFilter from '../filters/Mood-filter'

import MovieCard from './Movie-card'

class AllMovies extends Component {

    constructor(props) {
        super(props)
        this._movieService = new MovieService()
        this.state = {
            movies: []
        }

    }

    componentDidMount = () => this.updateMoviesList()

    updateMoviesList = () => {
        this._movieService.getAllMovies()
            .then(allMoviesFromDB => this.setState({ movies: allMoviesFromDB.data }))
            .catch(err => console.log("Error", err))
    }

    filterMovies = moviesFiltered => this.setState({ movies: moviesFiltered })

    render() {
        return (


            <section>

                <Container /*className="margin-navbar"*/>


                    <h1>Movies</h1>

                    <Form>
                        <Row>
                            <Col md={4}>
                                <GenreFilter filterMoviesOnScreen={this.filterMovies} />
                            </Col>
                            <Col md={4}>
                                <SubGenreFilter filterMoviesOnScreen={this.filterMovies} />
                            </Col>
                            <Col md={4}>
                                <MoodFilter filterMoviesOnScreen={this.filterMovies} />
                            </Col>
                        </Row>
                    </Form>

                    <Row>
                        {this.state.movies.map(movie => (<MovieCard key={movie._id} {...movie} />))}
                    </Row>
                </Container>

            </section>

        )
    }


}

export default AllMovies