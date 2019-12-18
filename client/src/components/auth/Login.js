import React, { Component } from 'react'
import { Button, Form, Container, Toast } from 'react-bootstrap'

import Service from '../../service/Auth.service'

class LoginForm extends Component {

    constructor(props) {
        super(props)
        this._service = new Service()
        this.state = {
            showToast: false,
            toastText: '',
            user: { username: '', password: '' }
        }
    }


    handleInputChange = e => {
        let { name, value } = e.target
        this.setState({
            user: { ...this.state.user, [name]: value }
        })
    }


    handleSubmit = e => {
        e.preventDefault()
        const { username, password } = this.state.user
        this._service.login(username, password)
            .then(theLoggedUser => {
                this.props.setUser(theLoggedUser.data)
                this.setState({ username: '', password: '' })
                this.props.history.push('/')            // REDIRECCIONAMIENTO
            })
            .catch(err => {
                this.handleToastOpen(err.response.data.message)
            })
    }

    handleToastClose = () => this.setState({ showToast: false, toastText: '' })
    handleToastOpen = text => this.setState({ showToast: true, toastText: text })


    render() {
        return (
            <Container>

                <h1>Iniciar sesión</h1>

                <Form onSubmit={this.handleSubmit}>
                    <Form.Group>
                        <Form.Label>Usuario</Form.Label>
                        <Form.Control type="text" name="username" onChange={this.handleInputChange} value={this.state.user.username} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control type="password" name="password" onChange={this.handleInputChange} value={this.state.user.password} />
                    </Form.Group>
                    <Button variant="dark" type="submit">Iniciar sesión</Button>
                </Form>

                <Toast
                    onClose={this.handleToastClose}
                    show={this.state.showToast}
                    delay={3000}
                    autohide
                    style={{
                        position: 'fixed',
                        right: '10px',
                        bottom: '10px',
                        minWidth: '250px'
                    }}>
                    <Toast.Header>
                        <strong className="mr-auto">Error</strong>
                        <small>Session manager</small>
                    </Toast.Header>
                    <Toast.Body>{this.state.toastText}</Toast.Body>
                </Toast>

            </Container >
        )
    }
}


export default LoginForm