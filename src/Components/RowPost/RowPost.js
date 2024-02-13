import React, { useEffect, useState } from 'react'
import YouTube from 'react-youtube'
import { API_KEY, imageUrl, trialer_base_url } from '../../Constants/Constant'
import axios from '../../axios'
import './RowPost.css'

function RowPost(props) {
    const [movies, setMovies] = useState([])
    const [urlId, setUrlId] = useState(null) // Initialize with null
    const [showVideo, setShowVideo] = useState(false) // State to control the visibility of the video player

    useEffect(() => {
        axios.get(props.url)
            .then(response => {
                console.log(response.data);
                setMovies(response.data.results)
            })
            .catch(err => {
                // alert('network error')
            })
    }, [props.url])

    const opts = {
        height: '390',
        width: '100%',
        playerVars: {
            autoplay: 1,
        },
    };

    const handleMovie = (id) => {
        console.log(id);
        axios.get(`${trialer_base_url}${id}/videos?api_key=${API_KEY}`)
            .then(response => {
                if (response.data.results.length !== 0) {
                    setUrlId(response.data.results[0]);
                    setShowVideo(true); // Show the video player when a movie is clicked
                }
            })
            .catch(error => {
                console.error("Error fetching trailer:", error);
            });
    }

    const closeVideo = () => {
        setUrlId(null); // Reset urlId to null
        setShowVideo(false); // Hide the video player when the close button is clicked
    }

    return (
        <div className="row">
            <h2>{props.title}</h2>
            <div className="posters">
                {movies.map((obj) =>
                    <img
                        key={obj.id}
                        onClick={() => handleMovie(obj.id)}
                        className={props.isSmall ? 'smallPoster' : "poster"}
                        src={`${imageUrl + obj.backdrop_path}`}
                        alt="poster"
                    />
                )}
            </div>
            {showVideo && (
                <>
                    {urlId && <YouTube opts={opts} videoId={urlId.key} />}
                    <button
                        onClick={closeVideo}
                        className='closeButton'
                    >
                        Close Video
                    </button>
                </>
            )}
        </div>
    )
}

export default RowPost
