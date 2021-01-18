import axios from 'axios'


let axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    // headers: {
    //     'API-KEY': '0d62501dce3049a65b9d183d8e927cfa'
    // }
})

export let headerAPI = {
    getMovieInfo: (movieId) => {
        return axiosInstance.get(`/movie/${movieId}?api_key=0d62501dce3049a65b9d183d8e927cfa`).then(response => response.data)
    }
}

export let moviesApi = {
    getTopRatedMovies: (page) => (
        axiosInstance.get(`/movie/top_rated?api_key=0d62501dce3049a65b9d183d8e927cfa&page=${page}`)
            .then(response => response.data)
    ),
    getPopularMovies:(page) => (
        axiosInstance.get(`/movie/popular?api_key=0d62501dce3049a65b9d183d8e927cfa&page=${page}`)
            .then(response => response.data)
    ),
     getGenresArray: () => {
         return (
             axiosInstance.get('/genre/movie/list?api_key=0d62501dce3049a65b9d183d8e927cfa')
                 .then(response => response.data)
         )
     }
}


