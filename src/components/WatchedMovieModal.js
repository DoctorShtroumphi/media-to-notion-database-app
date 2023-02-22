import { getTitle, getReleaseDate, getGenres, getRuntime, getDescription, getFranchise, getBackdropUrls } from '../util/mediaUtil';
import { addWatchedMovieToNotionDatabase } from '../util/addMediaUtil';
import React, { useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { useSelector } from 'react-redux';
import Toast from 'react-bootstrap/Toast';

export default function WatchedMovieModal({ mediaType, completeMedia, showWatchedMovieModal, setShowWatchedMovieModal }) {
  const [chronologicalOrder, setChronologicalOrder] = useState('');
  const [releaseOrder, setReleaseOrder] = useState('');
  const [rewatch, setRewatch] = useState(false)
  const [selectedRating, setSelectedRating] = useState('');
  const [selectedScareFactor, setSelectedScareFactor] = useState('');

  const [showToast, setShowToast] = useState(false);
  const [toastHeader, setToastHeader] = useState('');
  const [toastBody, setToastBody] = useState('');
  const [toastVariant, setToastVariant] = useState('')

  const ratings = useSelector((state) => state.ratings.value);
  function getRatingsSelectMenuOptions() {
    return (
      ratings.map(rating => <option key={rating.id} value={rating.id}>{rating.name}</option>)
    );
  }

  // Set default rating
  useEffect(() => {
    if (!selectedRating && ratings) {
      setSelectedRating(ratings[0].id);
    }
  }, [selectedRating, ratings]);

  const scareFactors = useSelector((state) => state.scareFactors.value);
  function getScareFactorsSelectMenuOptions() {
    return (
      <>
        <option key='N/A' value=''>N/A</option>
        {scareFactors.map(scareFactor => <option key={scareFactor.id} value={scareFactor.id}>{scareFactor.name}</option>)}
      </>
    );
  }

  const [selectedBackdrop, setSelectedBackdrop] = useState(0);
  const handleSelect = (selectedIndex, e) => {
    setSelectedBackdrop(selectedIndex);
  };

  async function handleAddWatchedMovieToNotionDatabase(completeMedia, rewatch, chronologicalOrder, releaseOrder, rating, scareFactor, backdropUrl) {
    addWatchedMovieToNotionDatabase(completeMedia, rewatch, chronologicalOrder, releaseOrder, rating, scareFactor, backdropUrl).then((response) => {
      if (response.result) {
        setToastVariant('success');
        setToastHeader('Success :D');
      } else {
        setToastVariant('danger');
        setToastHeader('Failure D:');
      }
      setShowToast(true);
      setToastBody(response.message);
    });
  }

  // ONLY CREATE THE MODAL IF IT SHOULD CURRENTLY BE DISPLAYED 
  if (showWatchedMovieModal) {
    const backdropUrls = getBackdropUrls(completeMedia);

    function createBackdropCarousel() {
      return (
        backdropUrls.map((backdropUrl, index) =>
          <Carousel.Item key={index}>
            <img className='d-block media-entry-modal-carousel-img' src={backdropUrl} alt='NO BACKDROP FOUND' />
          </Carousel.Item>
        )
      );
    }

    return (
      <>
        <Modal show={showWatchedMovieModal} onHide={() => setShowWatchedMovieModal(false)} dialogClassName='media-entry-modal' centered>
          <Modal.Header closeButton>
            <Modal.Title>{getTitle(completeMedia, mediaType)} ({getReleaseDate(completeMedia, mediaType)})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* RESPONSE TOAST */}
            <Toast show={showToast} onClose={() => setShowToast(!showToast)} bg={toastVariant} style={{ position: 'absolute', top: 0, right: 0 }}>
              <Toast.Header><strong className='me-auto'>{toastHeader}</strong></Toast.Header>
              <Toast.Body style={{ color: 'white' }}>{toastBody}</Toast.Body>
            </Toast>

            <div className='media-entry-modal-outer-body'>
              {/* RUN TIME AND GENRES */}
              <div className='media-entry-modal-inner-body'>
                <p><b>Run Time:</b> {getRuntime(completeMedia)}</p>
                <p><b>Genres:</b> {getGenres(completeMedia)}</p>
              </div>

              {/* DESCRIPTION */}
              <p className='media-entry-modal-description'><b>Description:</b> {getDescription(completeMedia)}</p>

              {/* FRANCHISE AND REWATCH */}
              <div className='media-entry-modal-inner-body'>
                <p><b>Franchise:</b> {getFranchise(completeMedia)}</p>
                <Form.Check inline label='Is this movie rewatchable?' name='group1' type='checkbox' id='inline-checkbox-1' checked={rewatch} onChange={e => setRewatch(e.target.checked)} />
              </div>

              {/* CHRONOLOGICAL AND RELEASE ORDERS */}
              <div className='media-entry-modal-order-inputs'>
                <div className='media-entry-modal-order-input'>
                  <FloatingLabel controlId='floatingInput' label='Chronological order'>
                    <Form.Control as='input' type='number' placeholder=' ' value={chronologicalOrder} onChange={e => setChronologicalOrder(e.target.value)} />
                  </FloatingLabel>
                </div>
                <div className='media-entry-modal-order-input'>
                  <FloatingLabel controlId='floatingInput' label='Release order'>
                    <Form.Control as='input' type='number' placeholder=' ' value={releaseOrder} onChange={e => setReleaseOrder(e.target.value)} />
                  </FloatingLabel>
                </div>
              </div>

              <br />

              {/* RATING AND SCARE FACTOR */}
              <div className='media-entry-modal-inner-body'>
                <div className='media-entry-modal-order-input'>
                  <FloatingLabel controlId='floatingSelectGrid' label='Rating'>
                    <Form.Select value={selectedRating} onChange={e => setSelectedRating(e.target.value)}>
                      {getRatingsSelectMenuOptions()}
                    </Form.Select>
                  </FloatingLabel>
                </div>
                <div className='media-entry-modal-order-input'>
                  <FloatingLabel controlId='floatingSelectGrid' label='Scare Factor'>
                    <Form.Select value={selectedScareFactor} onChange={e => setSelectedScareFactor(e.target.value)}>
                      {getScareFactorsSelectMenuOptions()}
                    </Form.Select>
                  </FloatingLabel>
                </div>
              </div>

              {/* POSTER */}
              <p className='media-entry-modal-carousel-label'>Select a backdrop:</p>
              <Carousel activeIndex={selectedBackdrop} onSelect={handleSelect} variant='dark' indicators={false} interval={null}>
                {createBackdropCarousel()}
              </Carousel>

              <br />
            </div>
            <Button variant='dark' className='media-entry-button-modal'
              onClick={() => handleAddWatchedMovieToNotionDatabase(completeMedia, rewatch, chronologicalOrder, releaseOrder, selectedRating, selectedScareFactor, backdropUrls[selectedBackdrop])}>
              Add to Notion
            </Button>
          </Modal.Body>
        </Modal>
      </>
    )
  }
}