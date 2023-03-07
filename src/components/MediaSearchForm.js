import React, { useState } from 'react';

import axios from 'axios';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';

import TrendingMediaBannerAndCard from './TrendingMediaBannerAndCard.js';
import { setMediaList } from '../redux/reducers/mediaListSlice.js';

export default function MediaSearchForm({ apiKey }) {
  const dispatch = useDispatch();

  // State Variables
  const [searchMediaQuery, setSearchMediaQuery] = useState('');
  const [selectedRadioBtn, setSelectedRadioBtn] = useState('movie');
  const [typingTimeout, setTypingTimeout] = useState(0);

  // SEARCH

  /**
   * Queries TMDB to return a list of media based on the selected radio button
   * and entered text. Ensures there is text entered before querying. 
   * 
   * Also, if the query or the radio button is changed, this function is also called, 
   * but state does not update quickly enough. That is the reason for the parameters.
   * If the parameter value is -1, use the state value. If not, use the parameter.
   * 
   * @param {string} updatedSearchMediaQuery
   * @param {string} updatedSelectedRadioBtn
   */
  function searchTMDB(updatedSearchMediaQuery, updatedSelectedRadioBtn) {
    var query = updatedSearchMediaQuery === -1 ? searchMediaQuery : updatedSearchMediaQuery;
    var radioBtn = updatedSelectedRadioBtn === -1 ? selectedRadioBtn : updatedSelectedRadioBtn;

    if (query.length !== 0) {
      axios(`https://api.themoviedb.org/3/search/${radioBtn}?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`)
        .then((response) => {
          dispatch(setMediaList(response.data));

          var noMediaFoundH1 = document.getElementById('noMediaFound');
          if (response.data.total_results !== 0) {
            noMediaFoundH1.style.display = 'none';
          } else {
            noMediaFoundH1.style.display = 'block';
          }
        })
        .catch(err => {
          console.error(err.message);
        });
    } else {
      dispatch(setMediaList([]));
    }
  }

  // SEARCH TEXT BOX

  function delaySearch(e) {
    setSearchMediaQuery(e.target.value);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    setTypingTimeout(setTimeout(function () {
      searchTMDB(e.target.value, -1);
    }, 500));
  }

  function setSearchFromPopover(query) {
    setSearchMediaQuery(query);
    searchTMDB(query, -1);
  }

  // RADIO BUTTON

  function handleRadioClick(e) {
    setSelectedRadioBtn(e.currentTarget.value);
    searchTMDB(-1, e.currentTarget.value);
  }

  function isRadioSelected(type) {
    return selectedRadioBtn === type;
  }

  return (
    <div className='search-bar'>
      <div className='search-bar-top mb-2'>
        <div className='radio-group m-2'>
          <Form.Check inline label='Movie' name='media-type' type='radio' id='inline-radio-1' value='movie'
            className='radio-text' onChange={handleRadioClick} checked={isRadioSelected('movie')} />
          <Form.Check inline label='TV Show' name='media-type' type='radio' id='inline-radio-2' value='tv'
            className='radio-text' onChange={handleRadioClick} checked={isRadioSelected('tv')} />
        </div>

        <TrendingMediaBannerAndCard apiKey={apiKey} setSearchFromPopover={setSearchFromPopover} />
      </div>

      <div className='mb-3'>
        <FloatingLabel controlId='floatingInput' label='What are you looking for?'>
          <Form.Control as='input' placeholder=' ' value={searchMediaQuery} onChange={delaySearch} />
        </FloatingLabel>
      </div>

      <h1 id='noMediaFound' className='no-media-found'>No media found!</h1>
    </div>
  );
}