import * as React from 'react';
import {useState, useRef} from "react";

const DEFAULT_PLACEHOLDER_IMAGE =
"https://m.media-amazon.com/images/M/MV5BMjE5MzcyNjk1M15BMl5BanBnXkFtZTcwMjQ4MjcxOQ@@._V1_SX300.jpg";


const Movie = ({movie, getMovieDetails}) => {
  const [selectedValue, setSelectedValue] = useState([]);
  const inputRef = useRef<HTMLInputElement>()
  const handleSearchInputChanges = (e) => {
    setSelectedValue(e.target.value);
  }

  const callGetMovieDetails = (e) => {
    if(inputRef&&selectedValue){
      console.log(inputRef.current.value);
      let value = inputRef.current.value;
      getMovieDetails(value);
    }   
  };

  const poster =
    movie.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movie.Poster;
  return (
    <div className="movie" onClick={callGetMovieDetails}
      <h2>{movie.Title}</h2>
      <input ref={inputRef} value={movie.Title} onChange={handleSearchInputChanges} type="text" hidden/>
        <img 
          width="200"
          alt={`The movie titled: ${movie.Title}`}
          src={poster}
        />
      <p>({movie.Year})</p>
    </div>
  );
};


export default Movie;
