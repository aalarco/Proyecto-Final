import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'

import MovieCard from '../movies/Movie-card'



class ListCard extends Component {

    constructor() {
        super()
        this.state = {
            list: {}
        }
    }

    render() {
        console.log(this.state.list)

        return (
            <section>

                <Container>
                    <Row>
                        {/* <h2>{this.state.list.listName}</h2> */}
                    </Row>

                    <Row>
                        {/* {this.state.list.movies.map(movie => (<MovieCard key={movie._id} {...movie} />))} */}
                    </Row>

                </Container>

            </section>

        )

    }

}

export default ListCard