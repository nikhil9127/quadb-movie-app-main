import axios from 'axios';
import React from 'react'
import { useParams } from 'react-router-dom'

import { useState, useEffect } from 'react';
import "../styles/MovieDetailPage.css"
import { FaYoutube } from "react-icons/fa";
import { ExternalLink } from 'react-external-link';

import ReactLoading from 'react-loading';


const MovieDetailPage = ( { type, color }) => {

    const [movie, setMovie] = useState([]);
    const [poster, setPoster] = useState("");
    const [title, setTitle] = useState("");
    const [rating, setRating] = useState("")
    const [gen1, setGen1] = useState("")
    const [gen2, setGen2] = useState("")
    const [runTime, setRunTime] = useState("");
    const [tagline, setTagLine] = useState("");
    const [overview, setOverview] = useState("");
    const [yt, setYt] = useState("");

    const [loading, setLoading] = useState(false);

    const params = useParams()

    const { id } = params;

    const fecthMovie = async () => {
        setLoading(true)

        const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&language=en-US`);

        const data3 = await axios.get(`http://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_TMDB_API_KEY}`);  // for videos

        setLoading(false);

        setYt(data3.data.results[0].key);
        setTitle(data.title);
        setOverview(data.overview);
        setPoster(data.poster_path);
        setRating(data.vote_average);
        setTagLine(data.tagline)
        setGen1(data.genres[0].name);
        setGen2(data.genres[1].name);
        setRunTime(data.runtime)

    }

    useEffect(() => {

        fecthMovie()

    }, [])

    const imageSizeLink = "https://image.tmdb.org/t/p/w500";

    var num = runTime;
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    var finalTime = +rhours + " hours and " + rminutes + " minutes";


    return (
        <div>
            {loading === true ? <div className='spinHold'> <ReactLoading type="spokes" color={color} height={667} width={375} className="fill" />   </div> :
                <>
                    <div className='singlePgaeDetailsHold mt-12'>
                        <div className='pictureHold'>
                            <img src={`${imageSizeLink}/${poster}`} className="siglePagePoster" />
                        </div>

                        <div className='detailsHold text-center'>

                            <p className='font-semibold text-2xl uppercase mt-5 mb-3'> {title} </p>
                            <p className=' mb-3'>IMDB : {Math.round(rating)} /10 </p>
                            <p className=' mb-3'> Runtime : {finalTime} </p>

                            <div className='flex gap-6 justify-center mb-6 text-center'>
                                <p className=' bg-slate-400 rounded-full text-white w-32 h-8'> {gen1} </p>
                                <p className=' bg-slate-400 rounded-full text-white w-32 h-8'> {gen2} </p>
                            </div>

                            <p className=' capitalize mb-3'> {tagline} </p>

                            <p className='overView  capitalize mb-8'> {overview} </p>


                            <div className=' justify-center flex'>
                                <ExternalLink href={`https://www.youtube.com/watch?v=${yt}`} className='ytButton w-60 h-14 bg-gray-400 flex rounded-2xl gap-6 whitespace-nowrap text-xl hover:bg-gray-500'> <FaYoutube className='text-3xl ytBtn mt-2 ml-4' /> <p className=' mt-2'> SEE ON YOUTUBE  </p> </ExternalLink>
                            </div>

                        </div>
                    </div>

                </>

            }


        </div>
    )
}

export default MovieDetailPage