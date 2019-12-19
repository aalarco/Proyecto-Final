import React, { Component } from 'react'
import { Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ListService from '../../service/List.service'
import ApiService from '../../service/Api.service'


import ListCard from '../lists/list-card'

class AllLists extends Component {

    constructor(props) {
        super(props)
        this._listService = new ListService()
        this._apiService = new ApiService()
        this.state = {
            list: [],
            listsWithPosters: []
        }

    }


    componentDidMount = () => this.allListsFromDB()

    allListsFromDB = () => {

        let listsWithPosters = []
        this._listService.getAllLists()
            .then(listsFromDB => { 
                console.log(listsFromDB.data)
                
                return this.setState({ list: listsFromDB.data }) })
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
        console.log(this.state.listsWithPosters)

        return (

            < Container className="movie-details" >
                <Row>
                    <h1>listas</h1>
                </Row>
                <Row>
                    <section>
                        {this.state.listsWithPosters && this.state.listsWithPosters.map(eachList => {

                            //const imgSrc = `http://image.tmdb.org/t/p/w185/${eachMovieWithPoster.posterPath}`
                            const moviesWithPosters = eachList.moviesWithPosters.map(eachMovieWithPoster => <Link to={`movies/${eachMovieWithPoster._id}`}> <img key={eachMovieWithPoster._id} src={`http://image.tmdb.org/t/p/w185/${eachMovieWithPoster.posterPath}`}></img> </Link>)
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



//     componentDidMount = () => this.updateAllLists()

//     updateAllLists = () => {
//         this._service.getAllLists()
//             .then(allListsFromDB => this.setState({ lists: allListsFromDB.data }))
//             .catch(err => console.log("Error", err))
//     }

//     render() {
//         return (
//             <>

//             <h1>Pruebaaaaaaa</h1>

//             <Container>
//                 <section>
//                     <h1>Lists</h1>
//                     <Row>
//                         {this.state.lists.map(list => (<ListCard key={list._id} {...list} />))}
//                     </Row>

//                 </section>
//             </Container>
//             </>
//         )
//     }


// }

export default AllLists