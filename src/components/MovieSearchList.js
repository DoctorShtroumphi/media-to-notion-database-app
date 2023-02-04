import React, { useState } from 'react'
import ReactPaginate from 'react-paginate';
import MovieEntry from './MovieEntry';

export default function MovieSearchList({ movieList }) {
  function Movies({ currentMovies }) {
    return (
      <>
        {
          currentMovies && currentMovies.map((movie) => (
            <MovieEntry key={movie.id} movie={movie}/>
          ))
        }
      </>
    );
  }

  function PaginatedMovies({ moviesPerPage }) {
    // Here we use movie offsets; we could also use page offsets
    // following the API or data you're working with.
    const [movieOffset, setItemOffset] = useState(0);
    const movies = movieList.results;
  
    // Simulate fetching movies from another resources.
    // (This could be movies from props; or movies loaded in a local state
    // from an API endpoint with useEffect and useState)
    const endOffset = movieOffset + moviesPerPage;
    console.log(`Loading movies from ${movieOffset} to ${endOffset}`);
    const currentMovies = movies.slice(movieOffset, endOffset);
    const pageCount = Math.ceil(movies.length / moviesPerPage);
  
    // Invoke when user click to request another page.
    const handlePageClick = (event) => {
      const newOffset = (event.selected * moviesPerPage) % movies.length;
      console.log(
        `User requested page number ${event.selected}, which is offset ${newOffset}`
      );
      setItemOffset(newOffset);
    };

    return (
      <>
        <Movies currentMovies={currentMovies} />
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
    <PaginatedMovies moviesPerPage={5}/>
  )
}
