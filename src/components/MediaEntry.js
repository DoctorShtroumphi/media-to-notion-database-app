import React, { useEffect, useState } from 'react';

import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import WatchedMovieModal from './WatchedMovieModal';
import { getReleaseDate, getTitle } from '../util/mediaUtil';

export default function MediaEntry({ media, apiKey }) {
  const mediaType = media.original_title ? 'movie' : 'tv';

  // State Variables
  const [completeMedia, setCompleteMedia] = useState('');
  const [imgSrc, setImgSrc] = useState('');
  const [showWatchedMovieModal, setShowWatchedMovieModal] = useState(false);

  // Get complete media object with backdrop image from TMDB
  useEffect(() => {
    axios(`https://api.themoviedb.org/3/${mediaType}/${media.id}?api_key=${apiKey}&language=en-US&append_to_response=images&include_image_language=en,null`)
      .then((response) => {
        console.log(response.data);
        setCompleteMedia(response.data);

        if (response.data.poster_path) {
          setImgSrc('https://image.tmdb.org/t/p/original' + response.data.poster_path);
        } else {
          setImgSrc(require('../assets/no_image_found.jpg'));
        }
      })
      .catch(err => {
        console.error(err.message);
      });
  }, [mediaType, media, apiKey]);

  return (
    <>
      <Card bg='dark' border='dark' text='white' style={{ width: '16rem' }}>
        <Card.Img variant='top' src={imgSrc} alt='IMAGE NOT FOUND' />
        <Card.Body>
          <Card.Title className='media-entry-title'>{getTitle(media, mediaType)} ({getReleaseDate(media, mediaType)})</Card.Title>
          <hr />
          <div className='media-entry-buttons'>
            <Button variant='dark' className='media-entry-button' onClick={() => console.log(true)}>Unwatched</Button>
            <Button variant='dark' className='media-entry-button' onClick={() => setShowWatchedMovieModal(true)}>Watched</Button>
          </div>
        </Card.Body>
      </Card>

      <WatchedMovieModal mediaType={mediaType} completeMedia={completeMedia}
        showWatchedMovieModal={showWatchedMovieModal} setShowWatchedMovieModal={setShowWatchedMovieModal} />        
    </>
  );
}
