import React, { Component } from 'react'
import { Form } from 'react-bootstrap'

import MovieService from '../../service/Movie.service'

//import MoviesList from '../movies/Movies-list'

class MoodFilter extends Component {

    constructor(props) {
        super(props)
        this._movieService = new MovieService
        this.state = {

        }

    }

    handleFilterChange = e => {
        const moodSelected = e.target.value
        this._movieService.getMoviesByMood(moodSelected)
            .then(res => {
                this.props.filterMoviesOnScreen(res.data)
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label><h4>Filter by Mood</h4></Form.Label>
                <Form.Control as="select" onChange={this.handleFilterChange}>
                    <option>Adrenaline Rush</option>
                    <option>Blood and Gore</option>
                    <option>Fantastic Reality</option>
                    <option>In the Mood for Love</option>
                    <option>Just for Fun</option>
                    <option>Nail-biters</option>
                    <option>Other Dimensions</option>
                </Form.Control>
            </Form.Group>

        )
    }
}

export default MoodFilter