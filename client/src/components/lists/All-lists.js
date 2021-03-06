import React, { Component } from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import ListService from '../../service/List.service'
import ApiService from '../../service/Api.service'


import { CarouselProvider, Slider, Slide, ButtonBack, ButtonNext, button } from 'pure-react-carousel';
import 'pure-react-carousel/dist/react-carousel.es.css';


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

                return this.setState({ list: listsFromDB.data })
            })
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

        return (

            < Container className="margin-navbar" >
                <h1>Listas</h1>
                <Row>
                    <Col>
                        <section>
                            {this.state.listsWithPosters && this.state.listsWithPosters.map(eachList => {

                                //const imgSrc = `http://image.tmdb.org/t/p/w185/${eachMovieWithPoster.posterPath}`
                                const moviesWithPosters = eachList.moviesWithPosters.map((eachMovieWithPoster, idx) => {

                                    return <Slide index={idx}><Link to={`movies/${eachMovieWithPoster._id}`}>
                                        <img key={eachMovieWithPoster._id} src={`http://image.tmdb.org/t/p/w185/${eachMovieWithPoster.posterPath}`}></img>
                                    </Link>
                                    </Slide>
                                })
                                const listTitle = eachList.listName
                                return (
                                    <>
                                        <h3 style={{ color: 'white' }}>{listTitle}</h3>
                                        <hr></hr>
                                        <CarouselProvider
                                            visibleSlides={4}
                                            totalSlides={8}
                                            step={1}
                                            naturalSlideWidth={400}
                                            naturalSlideHeight={500}
                                        >
                                            <Slider>
                                                {moviesWithPosters}
                                            </Slider>
                                            
                                            <ButtonBack className="btn-dark btn-slider">Back</ButtonBack>
                                            <ButtonNext className="btn-dark btn-slider">Next</ButtonNext>
                                        </CarouselProvider>

                                    </>)

                            }

                            )}
                        </section>
                    </Col>
                </Row>
            </Container>

        )
    }
}





export default AllLists