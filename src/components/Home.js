import { useState, useEffect } from 'react';
import axios from 'axios';
import React from 'react'
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom';

const Home = ({ type, color }) => {
    const [movies, setMovies] = useState([])
    const [loading, setLoading] = useState(false);

    const fetchFunc = async () => {
        setLoading(true)
        const { data } = await axios.get(`https://api.themoviedb.org/3/trending/movie/day?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);
        setMovies(data.results)
        setLoading(false);
    }


    useEffect(() => {
        fetchFunc()
    }, [])
    const imageSizeLink = "https://image.tmdb.org/t/p/w500"


    return (

        <div className=' mt-16'>
            {loading === true ? <div className='spinHold'> <ReactLoading type="spokes" color={color} height={667} width={375} className="fill" />   </div> : <>

                <p className='trending font-bold text-2xl mt-8 ml-8 text-center mb-14'>TRENDING </p>
                <div className='main-parent'>

                    {movies.map((item) => {

                        return (
                            <div className=' indivitual-movie cursor-pointer' key={item.id}>
                                <div className="content" key={item.id}>
                                    <Link to={`/${item.id}`}>
                                        <div className="content-overlay"></div>
                                        <img className="content-image trending-pic" src={`${imageSizeLink}/${item.poster_path}`} alt="hey" />
                                        <div className="content-details bg-black text-white fadeIn-bottom">
                                            <h3 className="content-title trending-names text-center">{item.title === undefined ? <p> name unavailable </p> : <p> {item.title}  </p>}</h3>
                                            <p className="content-text rating text-center">IMDB:{Math.round(item.vote_average)} /10</p>
                                        </div>
                                    </Link>
                                </div>
                            </div>

                        )

                    })}
                </div>

            </>}

            <br />
            <br />
            <br />


        </div>
    )


}

export default Home