import React, { Component } from 'react'
import ListService from '../../service/List.service'
//import { Container, Row } from 'react-bootstrap'

//import MovieCard from './Movie-card'

class AllLists extends Component {

    constructor(props) {
        super(props)
        this._service = new ListService()
        this.state = {
            lists: []
        }

    }

    componentDidMount = () => this.updateAllLists()

    updateAllLists = () => {
        this._service.getAllLists()
            .then(allListsFromDB => this.setState({ lists: allListsFromDB.data }))
            .catch(err => console.log("Error", err))
    }

    render() {
        return (

            <h1>Pruebaaaaaaa
                
            </h1>
            // <section>

            //     <Container>

            //         <h1>Movies</h1>

            //         <Row>
            //             {this.state.lists.map(movie => (<MovieCard key={movie._id} {...movie} />))}
            //         </Row>
            //     </Container>

            // </section>

        )
    }


}

export default AllLists