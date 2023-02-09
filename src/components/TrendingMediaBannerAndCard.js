import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export default function TrendingMediaBannerAndCard({ apiKey }) {
  const todaysMediaType = new Date().getDate() % 2 === 0 ? 'movie' : 'tv';
  const [media, setMedia] = useState('');

  // Get trending media piece.
  useEffect(() => {
    axios(`https://api.themoviedb.org/3/trending/${todaysMediaType}/day?api_key=${apiKey}`)
      .then((response) => {
        console.log(response.data.results[0]);
        setMedia(response.data.results[0]);
        document.getElementsByTagName('body')[0].style.backgroundImage=`url(${'https://image.tmdb.org/t/p/original' + response.data.results[0].backdrop_path})`;
      })
      .catch(err => {
        console.error(err.message);
      });
  }, [todaysMediaType, apiKey, setMedia]);

  /**
   * These two getter functions are needed because
   * movies and tv shows have different names for
   * the same fields.
   */

  function getTitle() {
    if (todaysMediaType === 'movie') {
      return media.original_title;
    } else {
      return media.original_name;
    }
  }

  function getReleaseDate() {
    if (todaysMediaType === 'movie') {
      return media.release_date;
    } else {
      return media.first_air_date;
    }
  }

  const popover = (
    <Popover id="popover-basic">
      <Popover.Header as="h3">{getTitle()} ({getReleaseDate()})</Popover.Header>
      <Popover.Body>{media.overview}</Popover.Body>
    </Popover>
  );

  return (
    <>
      <OverlayTrigger trigger="click" placement="top" overlay={popover}>
        <Button variant="success">Click me to see</Button>
      </OverlayTrigger>
      <Card className='trending-card' style={{ width: '50%', margin: 'auto' }}>
        <Card.Body>
          <Card.Title>Trending Today</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{getTitle()} ({getReleaseDate()})</Card.Subtitle>
          <Card.Text>
            {media.overview}
          </Card.Text>
        </Card.Body>
      </Card>
    </>
  );
}
