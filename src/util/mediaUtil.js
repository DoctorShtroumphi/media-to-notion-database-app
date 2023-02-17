export const getTitle = (completeMedia, mediaType) => {
  if (mediaType === 'movie') {
    return completeMedia.original_title;
  } else {
    return completeMedia.original_name;
  }
}

export const getReleaseDate = (completeMedia, mediaType) => {
  if (mediaType === 'movie') {
    return completeMedia.release_date.slice(0, 4);
  } else {
    return completeMedia.first_air_date.slice(0, 4);
  }
}

export const getGenres = (completeMedia) => {
  var genresString = completeMedia.genres.map(genre => genre.name).join(", ");
  return genresString;
}

export const getRuntime = (completeMedia) => {
  return Math.floor(completeMedia.runtime / 60) + 'h ' + completeMedia.runtime % 60 + 'm'
}

export const getDescription = (completeMedia) => {
  return completeMedia.overview;
}

export const getBackdropUrl = (completeMedia) => {
  return `${'https://image.tmdb.org/t/p/original' + completeMedia.backdrop_path}`;
}

export const getBackdropUrls = (completeMedia) => {
  return completeMedia.images.backdrops.map(backdrop => `${'https://image.tmdb.org/t/p/original' + backdrop.file_path}`);
}

export const getFranchise = (completeMedia) => {
  if (completeMedia.belongs_to_collection) {
    return completeMedia.belongs_to_collection.name;
  } else {
    return "None";
  }
}