import { useState } from "react";
import FilmDetail, { FilmDetailEmpty } from "./FilmDetail";
import './FilmLibrary.css';
import FilmRow from "./FilmRow";
import TMDB from "./TMDB";


function FilmLibrary() {

  // const films = TMDB.films;
  const [films, setFilms] = useState(TMDB.films);
  const [currentList, setCurrentList] = useState(films);
  const [selectedFilm, setSelectedFilm] = useState(null);
  const [favourite, setFavourite] = useState([]);
  const [isFavouriteView, setIsFavouriteView] = useState(false);

  const handleonSelect = (film) => {
    setSelectedFilm(film);
  };

  const handleFavourite = (film, action) => {
    let newFavouriteList = favourite.slice();
    const favIndex = favourite.findIndex(item => item.id === film.id);
    const index = films.findIndex(item => item.id === film.id);
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
    newFilmsList.splice(index, 1, film);
    setFilms(newFilmsList);

    if (isFavouriteView) return setCurrentList(newFavouriteList);
    setCurrentList(newFilmsList);
  };

  const handleChangeView = (value) => {
    setCurrentList(value ? favourite : films);
    setIsFavouriteView(value);
  };

  return (
    <div className="FilmLibrary">
      <div className="film-list">
        <h1 className="section-title">FILMS</h1>
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
        {currentList.map((item, index) => <FilmRow
          key={index}
          onReadMore={() => handleonSelect(item)}
          onHandleFavourite={(action) => handleFavourite(item, action)}
          {...item}
        />)}
      </div>
      <div className="film-details">
        <h1 className="section-title">DETAILS</h1>
        {selectedFilm === null ?
          <FilmDetailEmpty />
          :
          <FilmDetail {...selectedFilm} />}
      </div>
    </div>
  );
}

export default FilmLibrary;;;;;