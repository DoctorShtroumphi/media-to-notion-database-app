import axios from 'axios';

import { getFranchiseForJson, getGenresForJson, getOrderForJson, getReleaseDate, getRuntime, getTitle } from '../util/mediaUtil';

export async function addWatchedMovieToNotionDatabase(completeMedia, rewatch, chronologicalOrder, releaseOrder, rating, scareFactor, backdropUrl) {
  const body = createPostBodyForWatchedMovie(completeMedia, rewatch, chronologicalOrder, releaseOrder, rating, scareFactor, backdropUrl);
  return axios.post('http://localhost:5000/createWatchedMovie', body)
    .then((response) => {
      return response.data;
    })
    .catch(err => {
      console.error(err.message);
      return { result: false, message: err.message };
    });
}

function createPostBodyForWatchedMovie(completeMedia, rewatch, chronologicalOrder, releaseOrder, rating, scareFactor, backdropUrl) {
  return {
    'title': getTitle(completeMedia, 'movie'),
    'genres': getGenresForJson(completeMedia),
    'year': getReleaseDate(completeMedia, 'movie'),
    'runTime': getRuntime(completeMedia),
    'rewatch': rewatch,
    'rating': { 'id': rating },
    'scareFactor': { 'id': scareFactor },
    'franchise': getFranchiseForJson(completeMedia),
    'chronological': getOrderForJson(chronologicalOrder),
    'release': getOrderForJson(releaseOrder),
    'poster': backdropUrl
  };
}