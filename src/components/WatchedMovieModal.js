import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';

export default function WatchedMovieModal({ mediaType, completeMedia, showWatchedMovieModal, setShowWatchedMovieModal }) {
  const ratings = useSelector((state) => state.ratings.value);
  const scareFactors = useSelector((state) => state.scareFactors.value);

  function getTitle() {
    if (completeMedia) {
      if (mediaType === 'movie') {
        return completeMedia.original_title;
      } else {
        return completeMedia.original_name;
      }
    }
  }

  function getReleaseDate() {
    if (completeMedia) {
      if (mediaType === 'movie') {
        return completeMedia.release_date.slice(0, 4);
      } else {
        return completeMedia.first_air_date.slice(0, 4);
      }
    }
  }

  function getGenres() {
    if (completeMedia) {
      console.log(ratings);
      console.log(scareFactors);
      return completeMedia.genres.map((genre) => <li key={genre.id}>{genre.name}</li>)
    }
  }

  function getRuntime() {
    if (completeMedia) {
      return Math.floor(completeMedia.runtime / 60) + "h " + completeMedia.runtime % 60 + "m"
    }
  }

  return (
    <Modal show={showWatchedMovieModal} onHide={() => setShowWatchedMovieModal(false)} dialogClassName="modal-90w">
      <Modal.Header closeButton>
        <Modal.Title>{getTitle()} ({getReleaseDate()})</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Here are the genres:</p>
        <ul>{getGenres()}</ul>

        <p>Run Time: {getRuntime()}</p>

        <Form.Check inline label="Rewatch" name="group1" type='checkbox' id='inline-checkbox-1' />


        <Button variant='dark' className='media-entry-button-modal'>Add to Notion</Button>
      </Modal.Body>
    </Modal>
  )
}