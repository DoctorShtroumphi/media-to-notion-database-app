import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default function TrendingMediaBannerAndCard({ apiKey }) {
  const todaysMediaType = new Date().getDate() % 2 === 0 ? 'movie' : 'tv';
  const [media, setMedia] = useState('');
  const movieTitle = useRef('');
  const movieReleaseDate = useRef('');

  // Get trending media piece.
  useEffect(() => {
    axios(`https://api.themoviedb.org/3/trending/${todaysMediaType}/day?api_key=${apiKey}`)
      .then((response) => {
        console.log(response.data.results[0]);
        setMedia(response.data.results[0]);
        document.getElementsByTagName('body')[0].style.backgroundImage=`url(${'https://image.tmdb.org/t/p/original' + response.data.results[0].backdrop_path})`;

        if (todaysMediaType === 'movie') {
          movieTitle.current = response.data.results[0].original_title;
          movieReleaseDate.current = response.data.results[0].release_date.slice(0, 4);
        } else {
          movieTitle.current = response.data.results[0].original_name;
          movieReleaseDate.current = response.data.results[0].first_air_date.slice(0, 4);
        }
      })
      .catch(err => {
        console.error(err.message);
      });
  }, [todaysMediaType, apiKey, setMedia, movieTitle, movieReleaseDate]);

  function getStringRepresentationOfMediaType() {
    if (todaysMediaType === 'movie') {
      return 'Movie';
    } else {
      return 'TV show';
    }
  }

  const popover = (
    <Popover id='popover-basic' className='trending-popover'>
      <Popover.Header as='h3'>{movieTitle.current} ({movieReleaseDate.current})</Popover.Header>
      <Popover.Body>{media.overview}</Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger='click' placement='right' overlay={popover}>
      <Button variant='dark' className='trending-button'>{getStringRepresentationOfMediaType()} of the day</Button>
    </OverlayTrigger>
  );
}
