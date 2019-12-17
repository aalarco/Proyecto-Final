import React, { Component } from 'react'
import { Form, Button } from 'react-bootstrap'

import ServiceList from '../../service/List.service'

class NewList extends Component {

    constructor(props) {
        super(props)
        this._ServiceList = new ServiceList()
        this.state = {
            list:{
                listName:"",
                creator: this.props.idUser,
                movies: [this.props.idMovie]
            }
        }
    }

    

    handleSubmit = e => {
        e.preventDefault()

        const listNew = this.state.list
        this._ServiceList.createList(listNew)
            .then(x => {
                ///console.log("respuesta back ok")
                this.props.closeModalWindow()
            })
            .catch(err => console.log(err))
    }

    handleInputChange = e => {
        let { name, value } = e.target
        this.setState({
            list: { ...this.state.list, [name]: value }
        })
    }

    render() {
        ///console.log("soy el estado del newlist", this.state.list)
        return (
            <>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Create a new list:</Form.Label>
                        <Form.Control type="text" name="listName" id="listName" onChange={this.handleInputChange} value={this.state.list.listName} />
                    </Form.Group>
                    <Button variant="dark" size="sm" type="submit" disabled={this.state.disabledButton}> Create and Add</Button>
                </Form>
               


            </>



        )
    }
}



export default NewList