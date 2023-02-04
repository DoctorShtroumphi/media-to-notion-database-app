import React from 'react'

export default function MovieEntry({ movie }) {
  return (
    <div>
      {movie.original_title}
      <br/>
      {movie.release_date}
    </div>
  )
}
