import React, { Component } from 'react'
import { Switch, Route,  } from 'react-router-dom'
// import { Container, } from 'react-bootstrap'


import Service from './service/Auth.service'

/* UI */
import Navbar from './components/ui/Navbar'

/* Pages */
import Index from './components/pages/Index'


/* Auth */
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'

/* Movies */

import MovieList from './components/movies/Movies-list'
import MovieDetails from './components/movies/Movie-details'



class App extends Component {
  constructor(){
    super()
    this.state = { loggedInUser: null }
    this._service = new Service()
  }

  setTheUser = user => {
    this.setState({ loggedInUser: user })
  
  }

  fetchUser = () => {
    console.log(this.state.loggedInUser)
    if (this.state.loggedInUser === null) {
      this._service.loggedin()
        .then(theLoggedInUserFromTheServer => this.setState({ loggedInUser: theLoggedInUserFromTheServer.data }))
        .catch(err => {this.setState({loggedInUser: false}) 
        console.log({ err })
      })
    }
  }

  render() {
    
    this.fetchUser()
    
    return(
      <>
        <Navbar loggedInUser={this.state.loggedInUser} setUser={this.setTheUser} />
        {/* <Navbar /> */}

        <Switch>
          <Route exact path="/" component={Index} />

          <Route exact path="/movies" render={() => <MovieList loggedInUser={this.state.loggedInUser} />} />
          <Route path="/movies/:id" component={MovieDetails} />
          {/* <Route path="/form" component={CoasterForm} /> */}

          <Route path="/signup" render={match => <Signup setUser={this.setTheUser} {...match} />} />
          <Route path="/login" render={match => <Login setUser={this.setTheUser} {...match} />} />
          
          
          {/* <Route path="/profile" render={() =>
            this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />
          } /> */}
        </Switch>

      </>
    )
  }
}

export default App
