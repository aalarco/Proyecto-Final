import React, { Component } from 'react'
import Service from '../../service/Movie.service'
import { Container, Row } from 'react-bootstrap'

import MovieCard from './Movie-card'

class AllMovies extends Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            movies: []
        }

    }

    componentDidMount = () => this.updateMoviesList()

    updateMoviesList = () => {
        this._service.getAllMovies()
            .then(allMoviesFromDB => this.setState({ movies: allMoviesFromDB.data }))
            .catch(err => console.log("Error", err))
    }

    render() {
        return (


            <section>

                <Container>

                    <h1>Movies</h1>

                    <Row>
                        {this.state.movies.map(movie => (<MovieCard key={movie._id} {...movie} />))}
                    </Row>
                </Container>

            </section>

        )
    }


}

export default AllMovies