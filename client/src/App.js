import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom'
// import { Container, } from 'react-bootstrap'

/* style */
import './App.css'


/* services */
import AuthService from './service/Auth.service'

/* UI */
import Navbar from './components/ui/Navbar'

/* Pages */
import Index from './components/pages/Index'


/* Auth */
import Signup from './components/auth/Signup'
import Login from './components/auth/Login'

/* Movies */

import AllMovies from './components/movies/Movies-list'
import MovieDetails from './components/movies/Movie-details'

/* Lists */

import AllLists from './components/lists/All-lists'

/* Profile */

import Profile from './components/profile/profile-view'



class App extends Component {
  constructor() {
    super()
    this.state = { loggedInUser: null }
    this._service = new AuthService()
  }

  setTheUser = user => {
    this.setState({ loggedInUser: user })
  }

  fetchUser = () => {
    if (this.state.loggedInUser === null) {
      this._service.loggedin()
        .then(theLoggedInUserFromTheServer => this.setState({ loggedInUser: theLoggedInUserFromTheServer.data }))
        .catch(err => {
          this.setState({ loggedInUser: false })
          console.log('Ha habido un error en fecthUser()', { err })
        })
    }
  }

  render() {

    this.fetchUser()

    return (
      <>
        <Navbar loggedInUser={this.state.loggedInUser} setUser={this.setTheUser} />
        {/* <Navbar /> */}

        <Switch className="body">
          <Route exact path="/" component={Index} />

          <Route exact path="/movies" render={() => <AllMovies loggedInUser={this.state.loggedInUser} />} />
          <Route path="/movies/:id" render={match => <MovieDetails loggedInUser={this.state.loggedInUser} {...match} />} />
          <Route path="/lists" component={AllLists} /> 

          <Route path="/signup" render={match => <Signup setUser={this.setTheUser} {...match} />} />
          <Route path="/login" render={match => <Login setUser={this.setTheUser} {...match} />} />


          <Route path="/profile" render={() =>
            this.state.loggedInUser ? <Profile loggedInUser={this.state.loggedInUser} /> : <Redirect to="/" />
          } />
        </Switch>

      </>
    )
  }
}

export default App
