import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';
import MediaEntry from './MediaEntry';

export default function MediaSearchList({ mediaList }) {
  function MediaEntries({ currentMediaEntries }) {
    return (
      <>
        {
          currentMediaEntries && currentMediaEntries.map((media) => (
            <MediaEntry key={media.id} media={media}/>
          ))
        }
      </>
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
    console.log(`Loading medias from ${mediaOffset} to ${endOffset}`);
    const currentMediaEntries = medias.slice(mediaOffset, endOffset);
    const pageCount = Math.ceil(medias.length / mediasPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * mediasPerPage) % medias.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <MediaEntries currentMediaEntries={currentMediaEntries} />
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
        />
      </>
    );
  }

  return (
    <PaginatedMediaEntries mediasPerPage={5}/>
  )
}
