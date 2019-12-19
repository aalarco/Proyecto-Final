import React, { Component } from 'react'
import { Container, Row, Button } from 'react-bootstrap';

import ProfileService from '../../service/Profile.service'
import ListService from '../../service/List.service'
import ApiService from '../../service/Api.service'

import ListCard from '../lists/list-card'


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
            moviesInList: [],
            poster: null,
        }
    }

    componentDidMount = () => this.listsFromOneUser()

    listsFromOneUser = () => {
        this._listService.getUserLists()
        .then(allListsFromUser => {
            this.setState({ list: allListsFromUser.data }, () => {
                this.apiInfo()
            })          
        })
        .catch(err => console.log(err))
    }

    apiInfo = () => {
        const moviesInList = []
        this.state.list.map(elm => {
            moviesInList.push(elm.movies)
            console.log("estas son las movies de cada array", moviesInList)
        

        // this._apiService.getMovieByID(movie.TMDB)
        //     .then(res => {
        //         this.setState({ poster: res.data.poster_path })
        //     })
        //     .catch(err => console.log(err))
    // })}
        })
    }


    render() {
        console.log("holaaaa", this.state.list)
        console.log("este es el posteeeer", this.state.poster)
        // const imgSrc = `http://image.tmdb.org/t/p/w185/${movie.poster}`
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
                        {this.state.list && this.state.list.map((list) => {

                            // return (
                            //     <>
                            //         <p>{list.listName}</p>

                            {/* {list.movies.map(movie => <img src={imgSrc} alt={movie.Title}></img>)} */}
                            
                            //     </>
                            
                            // )
                            
                            return (
                                <>
                                    <h2>{list.listName}</h2>

                                    {list.movies.map(movie => <p>{movie.TMDB}</p>)}


                                </>

                            )
                        })}
                    </section>

                </Row>
            </Container>

        )
    }
}




export default Profile