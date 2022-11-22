import './FilmDetail.css';

function FilmDetail(props) {
  const {
    title,
    poster_path,
    backdrop_path,
    overview,
    release_date,
  } = props;
  return (
    <div className="FilmDetail is-hydrated">
      <figure className="film-backdrop">
        <img src={'https://image.tmdb.org/t/p/w1280' + backdrop_path} alt="Baby Driver backdrop" />
        <h1 className="film-title">{title}</h1>
      </figure>

      <div className="film-meta">
        <p className="film-detail-overview">
          <img src={'https://image.tmdb.org/t/p/w780/' + poster_path} className="film-detail-poster" alt={'Baby driver poster'} />
          {overview}
        </p>
      </div>
    </div>
  );
}

export function FilmDetailEmpty() {
  return (
    <div className="FilmDetail">
      <p>
        <i className="material-icons">subscriptions</i>
        <span>No film selected</span>
      </p>

    </div>
  );
}

export default FilmDetail;