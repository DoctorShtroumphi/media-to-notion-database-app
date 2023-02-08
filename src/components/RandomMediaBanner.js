import React, { useState, useEffect } from 'react'
import axios from 'axios';

export default function RandomMediaBanner({ apiKey }) {
  const todaysMediaType = new Date().getDate() % 2 === 0 ? 'movie' : 'tv';
  const [media, setMedia] = useState('');

  // Get trending media piece.
  useEffect(() => {
    axios(`https://api.themoviedb.org/3/trending/${todaysMediaType}/day?api_key=${apiKey}`)
      .then((response) => {
        console.log(response.data.results[0]);
        setMedia(response.data.results[0]);
        // Image stuff
        var composedImgSrc = 'https://image.tmdb.org/t/p/original' + response.data.results[0].backdrop_path;
        document.getElementsByTagName('body')[0].style.backgroundImage=`url(${composedImgSrc})`;
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
    <div>
      <h1>Trending today: {getTitle()} ({getReleaseDate()})</h1>
      {media.overview}
    </div>
  );
}
