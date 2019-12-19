import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

import MovieService from '../../service/Movie.service'

//import MoviesList from '../movies/Movies-list'

class SubGenreFilter extends Component {

    constructor(props) {
        super(props)
        this._movieService = new MovieService
        this.state = {

        }

    }

    handleFilterChange = e => {
        const subgenreSelected = e.target.value
        this._movieService.getMoviesBySubGenre(subgenreSelected)
            .then(res => {
                this.props.filterMoviesOnScreen(res.data)
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Filter by SubGenre</Form.Label>
                <Form.Control as="select" onChange={this.handleFilterChange}>
                    <option>Psychological Thriller</option>
                    <option>Prison Film</option>
                    <option>Supernatural Horror</option>
                    <option>Action Thriller</option>
                    <option>Road Movie</option>
                    <option>Romantic Comedy</option>
                    <option>Action Thriller</option>
                    <option>Crime Thriller</option>
                    <option>Gangster Film</option>
                    <option>Space Adventure</option>
                    <option>Superhero Film</option>
                </Form.Control>
            </Form.Group>
        )
    }
}

export default SubGenreFilter