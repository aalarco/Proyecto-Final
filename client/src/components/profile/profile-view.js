import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap';

import ProfileService from '../../service/Profile.service'
import ListService from '../../service/List.service'
import ApiService from '../../service/Api.service'



class Profile extends Component {

    constructor(props) {
        super(props)
        this._profileService = new ProfileService()
        this._listService = new ListService()
        this._apiService = new ApiService()
        this.state = {
            user: {
                username: this.props.loggedInUser.username,
            },
            list: [],
            listsWithPosters: []
        }
    }

    componentDidMount = () => this.listsFromOneUser()

    listsFromOneUser = () => {

        let listsWithPosters = []
        this._listService.getUserLists()
            .then(allListsFromUser => { this.setState({ list: allListsFromUser.data }) })
            .then(x => {
                this.state.list.map(thisList => {
                    thisList.moviesWithPosters = []
                    thisList.movies.map(eachMovie => {
                        const theMovieWithPoster = eachMovie
                        this._apiService.getMovieByID(eachMovie.TMDB)
                            .then(response => {
                                theMovieWithPoster.posterPath = response.data.poster_path
                                thisList.moviesWithPosters.push(theMovieWithPoster)
                            })
                    })
                    listsWithPosters.push(thisList)
                })
                this.setState({ listsWithPosters: listsWithPosters })

            })
            .catch(err => console.log(err))
    }

    render() {

        // const imgSrc = `http://image.tmdb.org/t/p/w185/{eachMovieWithPoster.posterPath}`
        return (

            < Container className="movie-details" >
                <Row>
                    <h1>Hola, {this.state.user.username}</h1>
                </Row>
                <Row>
                    <h2>Tus listas:</h2>
                </Row>
                <Row>
                    <section>
                        {this.state.listsWithPosters && this.state.listsWithPosters.map(eachList => {

                            const moviesWithPosters = eachList.moviesWithPosters.map(eachMovieWithPoster => <p>{eachMovieWithPoster.Title}</p>)
                            const listTitle = eachList.listName
                            return (
                                <>
                                    <h1>{listTitle}</h1>
                                    {moviesWithPosters}
                                </>)

                        }

                        )}
                    </section>

                </Row>
            </Container>

        )
    }
}




export default Profile