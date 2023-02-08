import React, { useState, useEffect } from 'react'
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import * as Vibrant from 'node-vibrant';

export default function RandomMediaBanner({ apiKey }) {
  const todaysMediaType = new Date().getDate() % 2 === 1 ? 'movie' : 'tv';
  const [media, setMedia] = useState('');
  const [imgSrc, setImgSrc] = useState('');

  // Get trending media piece.
  useEffect(() => {
    axios(`https://api.themoviedb.org/3/trending/${todaysMediaType}/day?api_key=${apiKey}`)
      .then((response) => {
        console.log(response.data.results[0]);
        setMedia(response.data.results[0]);
        // Image stuff
        var composedImgSrc = 'https://image.tmdb.org/t/p/original' + response.data.results[0].backdrop_path;
        Vibrant.from(composedImgSrc).quality(1).getPalette().then((palette) => {
          console.log(palette);
          var gradColors = [
            palette.DarkMuted.getRgb(),
            palette.DarkVibrant.getRgb(),
            palette.LightMuted.getRgb(),
            palette.LightVibrant.getRgb(),
            palette.Muted.getRgb(),
            palette.Vibrant.getRgb()
          ];

          for (let index = 0; index < gradColors.length; index++) {
            const element = gradColors[index];
            console.log(element);
          }
          document.getElementsByTagName('body')[0].style.backgroundImage=`url(${composedImgSrc})`;
        });
        setImgSrc(composedImgSrc);
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

  return (
    <Card border='light' className="bg-dark text-white background-card">
      <Card.Img src={imgSrc} alt="Card image" id='trending-media-banner'/>
      <Card.ImgOverlay>
        <Card.Title className='background-card-text'>{getTitle()}</Card.Title>
        <Card.Text className='background-card-text'>{media.overview}</Card.Text>
        <Card.Text className='background-card-text'>{getReleaseDate()}</Card.Text>
      </Card.ImgOverlay>
    </Card>
  );

  /*
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Img variant='top' src={imgSrc} alt='IMAGE NOT FOUND' />
        <Card.Body>
          <Card.Title>{getTitle()}</Card.Title>
          <Card.Text>
            {getReleaseDate()}
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  )*/
}
