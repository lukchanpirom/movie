import React from "react";
import "./App.css";

const API_KEY = "97d75a6588c16cef472567b546d507b2";
const API_URL = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&page=1`;
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`;

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataAPI: [],
    };

    this.submitForm = this.submitForm.bind(this);
  }

  showMovies(url) {
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        this.setState({
          dataAPI: data.results,
        });
      });
  }

  submitForm(event) {
    event.preventDefault();
    
    const searchValue = document.getElementById('seacrh').value;
    this.showMovies(SEARCH_API + searchValue);
  }

  componentDidMount() {
    this.showMovies(API_URL);
  }

  render() {
    const { dataAPI } = this.state;
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w500/";

    return (
      <div className="wrapper">
        <header>
          <h2>Movie</h2>
          <form onSubmit={this.submitForm}>
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
  }
}

export default App;
