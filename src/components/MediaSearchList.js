import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';
import MediaEntry from './MediaEntry';

export default function MediaSearchList({ mediaList, apiKey }) {
  function MediaEntries({ currentMediaEntries }) {
    return (
      <div className='media-card-list'>
        {
          currentMediaEntries && currentMediaEntries.map((media) => (
            <MediaEntry key={media.id} media={media} apiKey={apiKey} />
          ))
        }
      </div>
    );
  }

  function PaginatedMediaEntries({ mediasPerPage }) {
    // Here we use media offsets; we could also use page offsets
    // following the API or data you're working with.
    const [mediaOffset, setItemOffset] = useState(0);
    const medias = mediaList.results;

    // Simulate fetching medias from another resources.
    // (This could be medias from props; or medias loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = mediaOffset + mediasPerPage;

    // Loading medias from ${mediaOffset} to ${endOffset}
    const currentMediaEntries = medias.slice(mediaOffset, endOffset);
    const pageCount = Math.ceil(medias.length / mediasPerPage);

    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * mediasPerPage) % medias.length;
      //User requested page number ${event.selected}, which is offset ${newOffset}
      setItemOffset(newOffset);
    };

    return (
      <div>
        <MediaEntries currentMediaEntries={currentMediaEntries} />
        <div className='media-list-pagination mt-3'>
          <ReactPaginate
            breakLabel='...'
            nextLabel='Next'
            onPageChange={handlePageClick}
            pageRangeDisplayed={5}
            pageCount={pageCount}
            previousLabel='Previous'
            renderOnZeroPageCount={null}
            breakClassName={'page-item'}
            breakLinkClassName={'page-link'}
            containerClassName={'pagination'}
            pageClassName={'page-item'}
            pageLinkClassName={'page-link'}
            previousClassName={'page-item'}
            previousLinkClassName={'page-link'}
            nextClassName={'page-item'}
            nextLinkClassName={'page-link'}
            activeClassName={'active'} />
        </div>
      </div>
    );
  }

  return (
    <PaginatedMediaEntries mediasPerPage={5} />
  )
}
