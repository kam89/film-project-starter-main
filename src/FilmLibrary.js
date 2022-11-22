import { useState, useEffect } from "react";
import FilmDetail, { FilmDetailEmpty } from "./FilmDetail";
import './FilmLibrary.css';
import FilmRow from "./FilmRow";
import { TMDB, TMDB_API_KEY } from "./TMDB";

const years = [2022, 2021, 2020];

function FilmLibrary() {

  // const films = TMDB.films;
  const [films, setFilms] = useState([]);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [favourite, setFavourite] = useState([]);
  const [isFavouriteView, setIsFavouriteView] = useState(false);
  const [page, setPage] = useState(1);
  const [year, setYear] = useState(years[0]);

  const handleonSelect = (film) => {
    const url = `https://api.themoviedb.org/3/movie/${film.id}?api_key=${TMDB_API_KEY}&language=en-US`;
    fetch(url).then((response) => {
      response.json().then((data) => {
        setSelectedFilm(data);
      });
    });
  };

  const loadMore = () => {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_watch_monetization_types=flatrate&primary_release_year=${year}`;
    fetch(url).then((response) => {
      response.json().then((data) => {
        const newFilmsList = [...films, ...data.results];
        setFilms(newFilmsList);
        setPage(page + 1);
      });
    });
  };

  const handleFavourite = (film, action) => {
    let newFavouriteList = favourite.slice();
    const favIndex = newFavouriteList.findIndex(item => item.id === film.id);

    if (action === "add") {
      newFavouriteList = [film, ...newFavouriteList];
      film.isFavourite = true;
    }

    if (action === "remove") {
      newFavouriteList.splice(favIndex, 1);
      film.isFavourite = false;
    }
    setFavourite(newFavouriteList);

    const newFilmsList = films.slice();
    const index = newFilmsList.findIndex(item => item.id === film.id);
    newFilmsList.splice(index, 1, film);
    setFilms(newFilmsList);
  };

  const handleChangeView = (value) => {
    setIsFavouriteView(value);
  };

  const handleChangeYear = (event) => {
    setYear(event.target.value);
    setFilms([]);
    setPage(1);
  };

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
        <div className="section-title">
          <select onChange={handleChangeYear} name="year">
            {years.map((item, index) => <option value={item}>{item}</option>)}
          </select>
        </div>
        <div className="film-list-filters">
          <button className={!isFavouriteView ? "film-list-filter is-active" : "film-list-filter"} onClick={() => handleChangeView(false)}>
            ALL
            <span className="section-count">{films.length}</span>
          </button>
          <button className={isFavouriteView ? "film-list-filter is-active" : "film-list-filter"} onClick={() => handleChangeView(true)}>
            FAVES
            <span className="section-count">{favourite.length}</span>
          </button>
        </div>
        {(isFavouriteView ? favourite : films).map((item, index) => <FilmRow
          key={index}
          onReadMore={() => handleonSelect(item)}
          onHandleFavourite={(action) => handleFavourite(item, action)}
          {...item}
        />)}
        <div className="film-details">
          <button className="film-details" onClick={loadMore}>Load More</button>
        </div>
      </div>
      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        {selectedFilm === null ?
          <FilmDetailEmpty />
          :
          <FilmDetail {...selectedFilm} />}
      </div>
    </div >
  );
}

export default FilmLibrary;;;;;