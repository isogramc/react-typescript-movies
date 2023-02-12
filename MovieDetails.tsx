import * as React from 'react';

const DEFAULT_PLACEHOLDER_IMAGE =
  "https://m.media-amazon.com/images/M/MV5BMTc5OTk4MTM3M15BMl5BanBnXkFtZTgwODcxNjg3MDE@._V1_SX300.jpg";


const MovieDetails = ({ movieDetails }) => {
  const poster =
    movieDetails.Poster === "N/A" ? DEFAULT_PLACEHOLDER_IMAGE : movieDetails.Poster;
  return (
    <div>
      <h2>{movieDetails.Title}</h2>
      <div>
        <img
          width="200"
          alt={`The movie titled: ${movieDetails.Title}`}
          src={poster}
        />
      </div>
      <p>({movieDetails.Year})</p>
      <p>{movieDetails.Genre}</p>
      <p>
      {movieDetails.Ratings&&movieDetails.Ratings.map((rating, i)=>(
        <span>{rating.Source} | {rating.Value} *</span>
      ))}
      <span>IMDB | {movieDetails.imdbRating}</span></p>
      <p>{movieDetails.Plot}</p>
      <p>{movieDetails.Runtime}</p>
      <hr/>
    </div>
  );
};


export default MovieDetails;