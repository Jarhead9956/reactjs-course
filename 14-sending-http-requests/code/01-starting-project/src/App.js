import React, {useState, useCallback, useEffect} from 'react';

import MoviesList from './components/MoviesList';
import AddMovie from './components/AddMovie';
import './App.css';

function App() {
  const [moviesData, setMoviesData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  //***********USE FETCH */
  const fetchMoviesHandler = useCallback(() => {
    setIsLoading(true)
    fetch('https://educationdb-97121.firebaseio.com/movies.json')
      .then(response => {
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        return response.json()
      })
      .then((data) => {
        const transformedMovies = []
        for (const key in data) {
          transformedMovies.push({
            id:key,
            title: data[key].title,
            openingText: data[key].openingText,
            releaseDate: data[key].releaseDate
          })
        }

        setMoviesData(transformedMovies)
        setIsLoading(false)
      }).catch(e => {
        setError(e.message)
      })
  }, [])

  useEffect(() => {
    fetchMoviesHandler()
  }, [fetchMoviesHandler])

  const addMovieHandler = (movie) => {
    fetch('https://educationdb-97121.firebaseio.com/movies.json', {
      method: 'POST',
      body: JSON.stringify(movie),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(responce => {
      return responce.json()
    })
    .then(data => {
      console.log(data)
    }).catch(error => {
      setError(error.message)
    })
  }


  //********USE ASYNC AWAIT */

  // const fetchMoviesHandler = useCallback(async() => {
  //   setIsLoading(true)
  //   try {
  //     const response = await fetch('https://swapi.dev/api/films/')
  //     if(!response.ok) {
  //       throw new Error('Something went wrong!')
  //     }

  //     const data = await response.json()

  //     const transformedMovies = data.results.map(movieData => {
  //       return {
  //         id: movieData.episode_id,
  //         title: movieData.title,
  //         openingText: movieData.opening_crawl,
  //         releaseDate: movieData.release_date,
  //       }
  //     })

  //     setMoviesData(transformedMovies)
  //   } catch (e) {
  //     setError(e.message)
  //   }
  //   setIsLoading(false)
  // }, [])

  // useEffect(() => {
  //    fetchMoviesHandler()
  // }, [fetchMoviesHandler])

  // const addMovieHandler = async(movie) => {
  //   try {
  //     const response = await fetch('https://educationdb-97121.firebaseio.com/movies.json', {
  //     method: 'POST',
  //     body: JSON.stringify(movie),
  //     headers: {
  //       'Content-Type': 'application/json'
  //     }
  //     });
  //     const data = await response.json();
  //     console.log(data);
  //   } catch(error) {
  //     console.log(error)
  //   }
  // }

  let content = <p>No movies found</p>
  if(moviesData.length > 0) {
    content = <MoviesList movies={moviesData} />
  }

  if(isLoading) {
    content = <p>Loading...</p>
  }

  if(error) {
    content = <p>{error}</p>
  }

  return (
    <React.Fragment>
      <section>
        <AddMovie onAddMovie={addMovieHandler} />
      </section>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>{content}</section>
    </React.Fragment>
  );
}

export default App;
