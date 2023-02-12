import * as React from 'react';
import './style.css';
import { useReducer, useState, useEffect } from "react";
import Header from "./Header";
import Movie from "./Movie";
import Search from "./Search";
import MovieDetails from "./MovieDetails";

const MOVIE_API_URL = "https://www.omdbapi.com/?s=man&apikey=b3f2b182"; // you should replace this with yours


const initialState = {
  loading: true,
  movies: [],
  movieDetails: [],
  errorMessage: null
};


const reducer = (state, action) => {
  switch (action.type) {
    case "SEARCH_MOVIES_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "SEARCH_MOVIES_SUCCESS":
      return {
        ...state,
        loading: false,
        movies: action.payload
      };
    case "SEARCH_MOVIES_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
      case "MOVIE_DETAILS_REQUEST":
      return {
        ...state,
        loading: true,
        errorMessage: null
      };
    case "MOVIE_DETAILS_SUCCESS":
      return {
        ...state,
        loading: false,
        movieDetails: action.payload
      };
    case "MOVIE_DETAILS_FAILURE":
      return {
        ...state,
        loading: false,
        errorMessage: action.error
      };
    default:
      return state;
  }
};

export default function App() {

  
  const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
    
        fetch(MOVIE_API_URL)
            .then(response => response.json())
            .then(jsonResponse => {
        
            dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
        	});
      	});
  	}, []);

    const search = searchValue => {
    	dispatch({
      	type: "SEARCH_MOVIES_REQUEST"
    	});
	
        fetch(`https://www.omdbapi.com/?s=${searchValue}&apikey=4a3b711b`)
      	.then(response => response.json())
      	.then(jsonResponse => {
        	if (jsonResponse.Response === "True") {
          	dispatch({
                type: "SEARCH_MOVIES_SUCCESS",
                payload: jsonResponse.Search
          	});
        	} else {
          	dispatch({
                type: "SEARCH_MOVIES_FAILURE",
                error: jsonResponse.Error
          	});
          }
      	});
	  };

    const getMovieDetails = selectedValue => {
      console.log(selectedValue);
    	dispatch({
      	type: "MOVIE_DETAILS_REQUEST"
    	});
	
        fetch(`https://www.omdbapi.com/?t=${selectedValue}&apikey=4a3b711b`)
      	.then(response => response.json())
      	.then(jsonResponse => {
        	if (jsonResponse.Response === "True") {
          	dispatch({
                type: "MOVIE_DETAILS_SUCCESS",
                payload: jsonResponse
          	});
        	} else {
          	dispatch({
                type: "MOVIE_DETAILS_FAILURE",
                error: jsonResponse.Error
          	});
          }
      	});
	  };

    const { movies, movieDetails, errorMessage, loading } = state;

    return (
    <div className="App">
      <Header text="SELECTED" />
      <Search search={search} />
      {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          <div>{movieDetails.Year!==undefined?(<MovieDetails movieDetails={movieDetails}/>):""}</div>
      )}
      <p className="App-intro">Search existing titles or select a title to view details</p>
      <div className="movies">
        {loading && !errorMessage ? (
          <span>loading... </span>
        ) : errorMessage ? (
          <div className="errorMessage">{errorMessage}</div>
        ) : (
          movies.map((movie, index) => (
            <Movie key={`${index}-${movie.Title}`} movie={movie} getMovieDetails={getMovieDetails}/>
          ))
        )}
      </div>
    </div>
  );
}
