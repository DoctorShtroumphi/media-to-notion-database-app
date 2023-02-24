import { getTitle, getReleaseDate } from '../util/mediaUtil';
import React, { useState, useEffect, useRef } from 'react'
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default function TrendingMediaBannerAndCard({ apiKey, setSearchFromPopover }) {
  const todaysMediaType = new Date().getDate() % 2 === 0 ? 'movie' : 'tv';
  const [media, setMedia] = useState('');
  const mediaTitle = useRef('');
  const mediaReleaseDate = useRef('');

  // Get trending media piece.
  useEffect(() => {
    axios(`https://api.themoviedb.org/3/trending/${todaysMediaType}/day?api_key=${apiKey}`)
      .then((response) => {
        setMedia(response.data.results[0]);
        document.getElementsByTagName('body')[0].style.backgroundImage = `url(${'https://image.tmdb.org/t/p/original' + response.data.results[0].backdrop_path})`;

        mediaTitle.current = getTitle(response.data.results[0], todaysMediaType);
        mediaReleaseDate.current = getReleaseDate(response.data.results[0], todaysMediaType);
      })
      .catch(err => {
        console.error(err.message);
      });
  }, [todaysMediaType, apiKey, setMedia, mediaTitle, mediaReleaseDate]);

  function getStringRepresentationOfMediaType() {
    return todaysMediaType === 'movie' ? 'Movie' : 'TV show';
  }

  const popover = (
    <Popover id='popover-basic' className='trending-popover'>
      <Popover.Header as='h3'>{mediaTitle.current} ({mediaReleaseDate.current})</Popover.Header>
      <Popover.Body>
        {media.overview}
        <br /> <br />
        <Button variant='primary' className='trending-popover-inner-button' onClick={() => setSearchFromPopover(mediaTitle.current)}>
          Find this {todaysMediaType}
        </Button>
      </Popover.Body>
    </Popover>
  );

  return (
    <OverlayTrigger trigger='click' placement='right' overlay={popover} rootClose={true}>
      <Button variant='dark' className='trending-button'>{getStringRepresentationOfMediaType()} of the day</Button>
    </OverlayTrigger>
  );
}
