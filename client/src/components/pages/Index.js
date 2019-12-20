import React from 'react'
import { Container } from 'react-bootstrap'

import MoviesList from '../movies/Movies-list'

const Index = () => {

    return (
        <Container className="margin-navbar">
            
            <MoviesList />

        </Container>
    )
}

export default Index