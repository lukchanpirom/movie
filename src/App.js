import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => {
  const API_KEY = "97d75a6588c16cef472567b546d507b2";
  const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1`;
  const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/";

  const [dataAPI, setdataAPI] = useState([]);

  async function showMovies(url) {
    const res = await fetch(url);
    res.json().then((res) => setdataAPI(res.results));
  }

  async function submitForm(event) {
    event.preventDefault();

    const searchValue = document.getElementById("seacrh").value;
    showMovies(SEARCH_API + searchValue);
  }

  useEffect(() => {
    showMovies(API_URL);
  }, []);

  return (
    <div className="wrapper">
      <header>
        <h2>Movie</h2>
        <form onSubmit={submitForm}>
          <input id="seacrh" type="text" placeholder="Search" />
        </form>
      </header>
      <main>
        {dataAPI.map((element) => {
          return (
            <section>
              <img src={IMAGE_PATH + element.poster_path} />
              <h2>{element.title}</h2>
            </section>
          );
        })}
      </main>
    </div>
  );
};

export default App;
