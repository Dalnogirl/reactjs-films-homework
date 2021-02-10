import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'https://api.themoviedb.org/3',
})

export const headerAPI = {
  getMovieInfo: (movieId) =>
    axiosInstance.get(`/movie/${movieId}?api_key=0d62501dce3049a65b9d183d8e927cfa`).then((response) => response.data),
  getTrailerKey: (movieId) =>
    axiosInstance
      .get(`/movie/${movieId}/videos?api_key=0d62501dce3049a65b9d183d8e927cfa`)
      .then((response) => response.data),
}

export const moviesApi = {
  getGenresObj: () =>
    axiosInstance.get('/genre/movie/list?api_key=0d62501dce3049a65b9d183d8e927cfa').then((response) => response.data),

  getMovies: (getUrl) => axiosInstance.get(getUrl).then((res) => res.data),
}
