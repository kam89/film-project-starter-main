
import './FilmRow.css';

const FilmRow = (props) => {
  const {
    poster_path,
    title,
    release_date,
    isFavourite,
    onReadMore,
    onHandleFavourite,
  } = props;

  return (
    <div className="FilmRow">
      <img src={"https://image.tmdb.org/t/p/w780" + poster_path} alt="{film title} film poster" />
      <div className="film-summary">
        <h3>{title}</h3>
        <p>YEAR {new Date(release_date).getFullYear()}</p>
        <div className="actions">
          <button className="action" onClick={() => onHandleFavourite(isFavourite ? "remove" : "add")}>
            <span className="material-icons">{isFavourite ? "remove_from_queue" : "add_to_queue"}</span>
          </button>
          <button className="action" onClick={onReadMore}>
            <span className="material-icons">read_more</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilmRow;