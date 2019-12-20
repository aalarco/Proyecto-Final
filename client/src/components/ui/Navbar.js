import React, { Component } from 'react'
import { Navbar, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import AuthService from '../../service/Auth.service'

class Navigation extends Component {

    constructor(props) {
        super(props)
        this._service = new AuthService()

    }

    logoutUser = () => {
        this._service.logout()
            .then(x => this.props.setUser(false))
            .catch(err => console.log(err))
    }

    render() {

        const saludo = this.props.loggedInUser ? this.props.loggedInUser.username : 'invitado'

        return (

            this.props.loggedInUser ?

                <Navbar className="fixed-top Navbar" variant="dark" expand="md">
                    <Navbar.Brand><img className= "logo" src="/images/Logo_alex.png"/></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Nav.Link className="Navbar-btn" as="li"><Link to="/" className="anchorNav">Inicio</Link></Nav.Link>
                            <Nav.Link as="li"><Link to="/lists" className="anchorNav">Listas</Link></Nav.Link>
                            <Nav.Link as="li"><Link to="/profile" className="anchorNav">Perfil</Link></Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            <Navbar.Text>{saludo}</Navbar.Text>
                            <Nav.Link as="li" onClick={this.logoutUser}>Logout</Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                :

                <Navbar className="fixed-top Navbar"  variant="dark" expand="md">
                    <Navbar.Brand><img className="logo" src="/images/Logo_alex.png" /></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse>
                        <Nav className="mr-auto">
                            <Nav.Link as="li"><Link to="/" className="anchorNav">Inicio</Link></Nav.Link>
                            <Nav.Link as="li"><Link to="/lists" className="anchorNav">Listas</Link></Nav.Link>
                        </Nav>
                        <Nav className="ml-auto">
                            {/* <Navbar.Text>Bienvenid@ {saludo}</Navbar.Text> */}
                            <Nav.Link as="li"><Link to="/signup" className="anchorNav">Registro</Link></Nav.Link>
                            <Nav.Link as="li"><Link to="/login" className="anchorNav">Login</Link></Nav.Link>
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
        )
    }
}

export default Navigation