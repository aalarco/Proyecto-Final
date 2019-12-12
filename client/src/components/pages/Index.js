import React from 'react'
import { Container } from 'react-bootstrap'

import MoviesList from '../movies/Movies-list'

const Index = () => {

    return (
        <Container>
            <section>
                <h1>Moviestorm!</h1>
                <p>Encuentra la peli perfecta</p>
            </section>
            <MoviesList />

        </Container>
    )
}

export default Index