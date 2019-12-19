import React, { Component } from 'react'
import ListService from '../../service/List.service'
import { Container, Row } from 'react-bootstrap'

import ListCard from '../lists/list-card'

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
            <>

            <h1>Pruebaaaaaaa</h1>

            <Container>
                <section>
                    <h1>Lists</h1>
                    <Row>
                        {this.state.lists.map(list => (<ListCard key={list._id} {...list} />))}
                    </Row>

                </section>
            </Container>
            </>
        )
    }


}

export default AllLists