import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

import MovieService from '../../service/Movie.service'

//import MoviesList from '../movies/Movies-list'

class GenreFilter extends Component {

    constructor(props) {
        super(props)
        this._movieService = new MovieService
        this.state = {

        }

    }

    handleFilterChange = e => {
        const genreSelected = e.target.value
        this._movieService.getMoviesByGenre(genreSelected)
            .then(res => {
                this.props.filterMoviesOnScreen(res.data)
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Filter by Genre</Form.Label>
                <Form.Control as="select" onChange={this.handleFilterChange}>
                    <option>Animation</option>
                    <option>Comedy</option>
                    <option>Crime</option>
                    <option>Documentary</option>
                    <option>Drama</option>
                    <option>Fantasy</option>
                    <option>History</option>
                    <option>Horror</option>
                    <option>Documentary</option>
                </Form.Control>
            </Form.Group>

        )
    }
}

export default GenreFilter