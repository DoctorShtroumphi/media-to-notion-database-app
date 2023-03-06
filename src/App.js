/* eslint-disable linebreak-style */
import React, { useEffect } from 'react';

import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

import MediaSearchForm from './components/MediaSearchForm.js';
import MediaSearchList from './components/MediaSearchList.js';
import { setRatings } from './redux/reducers/ratingsSlice.js';
import { setScareFactors } from './redux/reducers/scareFactorsSlice.js';

export default function App() {
  const apiKey = process.env.REACT_APP_TMDB_API_KEY;
  const dispatch = useDispatch();
  const mediaList = useSelector((state) => state.mediaList.value);

  useEffect(() => {
    axios('http://localhost:5000/getAllMovieSelectOptions')
      .then((response) => {
        dispatch(setRatings(response.data.ratings));
        dispatch(setScareFactors(response.data.scareFactors));
      })
      .catch(err => {
        console.error(err.message);
      });
  }, [dispatch]);

  function renderMediaList() {
    if (mediaList.length !== 0) {
      return (
        <MediaSearchList mediaList={mediaList} apiKey={apiKey} />
      );
    }
  }

  return (
    <>
      <h1 className='app-title'>Media Finder - Notion Tool</h1>
      <MediaSearchForm apiKey={apiKey} />
      {renderMediaList()}
    </>
  );
}
