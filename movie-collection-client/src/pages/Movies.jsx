import { useEffect, useState } from "react";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../services/movieService";
import { getGenres } from "../services/genreService";
import "../styles/Movies.css";

function Movies() {
  const [movies, setMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingMovieId, setEditingMovieId] = useState(null);

  const [movieForm, setMovieForm] = useState({
    title: "",
    director: "",
    releaseYear: "",
    rating: "",
    genreId: "",
  });

  useEffect(() => {
    loadMovies();
    loadGenres();
  }, []);

  async function loadMovies() {
    try {
      const data = await getMovies();
      setMovies(data);
    } catch (error) {
      setError(error.message);
    }
  }

  async function loadGenres() {
    try {
      const data = await getGenres();
      setGenres(data);
    } catch (error) {
      setError(error.message);
    }
  }

  function getGenreName(genreId) {
    const genre = genres.find((genre) => genre.id === genreId);

    return genre ? genre.name : "Unknown";
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setMovieForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));
  }

  function resetForm() {
    setMovieForm({
      title: "",
      director: "",
      releaseYear: "",
      rating: "",
      genreId: "",
    });

    setEditingMovieId(null);
    setShowForm(false);
  }

  function handleAddMovie() {
    setError("");
    setEditingMovieId(null);

    setMovieForm({
      title: "",
      director: "",
      releaseYear: "",
      rating: "",
      genreId: "",
    });

    setShowForm(true);
  }

  function handleEditMovie(movie) {
    setError("");
    setEditingMovieId(movie.id);

    setMovieForm({
      title: movie.title,
      director: movie.director,
      releaseYear: movie.releaseYear,
      rating: movie.rating,
      genreId: movie.genreId,
    });

    setShowForm(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    const movieData = {
      title: movieForm.title,
      director: movieForm.director,
      releaseYear: Number(movieForm.releaseYear),
      rating: Number(movieForm.rating),
      genreId: Number(movieForm.genreId),
    };

    try {
      if (editingMovieId !== null) {
        await updateMovie(editingMovieId, movieData);
      } else {
        await createMovie(movieData);
      }

      await loadMovies();
      resetForm();
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDeleteMovie(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this movie?"
    );

    if (!confirmed) {
      return;
    }

    setError("");

    try {
      await deleteMovie(id);
      await loadMovies();
    } catch (error) {
      setError(error.message);
    }
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      resetForm();
    }
  }

  return (
    <main className="movies-page">
      <section className="movies-container">
        <header className="movies-header">
          <div className="movies-heading">
            <span className="section-label">Movie Collection</span>
            <h1>Movies</h1>

            <p>
              Browse, add, edit and manage your movie collection in one place.
            </p>
          </div>

          <button
            type="button"
            className="add-movie-button"
            onClick={handleAddMovie}
          >
            <span>+</span>
            Add Movie
          </button>
        </header>

        {error && <p className="error-message">{error}</p>}

        {movies.length === 0 ? (
          <section className="empty-state">
            <div className="empty-state-icon">🎬</div>
            <h2>No movies yet</h2>
            <p>Add your first movie to start building your collection.</p>

            <button
              type="button"
              className="add-movie-button"
              onClick={handleAddMovie}
            >
              <span>+</span>
              Add Movie
            </button>
          </section>
        ) : (
          <section className="movies-grid">
            {movies.map((movie) => (
              <article className="movie-card" key={movie.id}>
                <div className="movie-poster">
                  <span>🎬</span>
                </div>

                <div className="movie-content">
                  <div className="movie-card-header">
                    <div>
                      <span className="genre-badge">
                        {getGenreName(movie.genreId)}
                      </span>

                      <h2>{movie.title}</h2>
                    </div>

                    <span className="rating-badge">
                      ★ {movie.rating}/10
                    </span>
                  </div>

                  <div className="movie-information">
                    <div className="movie-detail">
                      <span className="detail-label">Director</span>
                      <span className="detail-value">{movie.director}</span>
                    </div>

                    <div className="movie-detail">
                      <span className="detail-label">Release year</span>
                      <span className="detail-value">{movie.releaseYear}</span>
                    </div>
                  </div>

                  <div className="movie-actions">
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => handleEditMovie(movie)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDeleteMovie(movie.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </section>
        )}
      </section>

      {showForm && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <section className="movie-form">
            <div className="modal-header">
              <div>
                <span className="section-label">
                  {editingMovieId !== null
                    ? "Update movie details"
                    : "Create a new movie"}
                </span>

                <h2>
                  {editingMovieId !== null ? "Edit Movie" : "Add Movie"}
                </h2>
              </div>

              <button
                type="button"
                className="close-modal-button"
                onClick={resetForm}
                aria-label="Close movie form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title</label>

                <input
                  id="title"
                  type="text"
                  name="title"
                  placeholder="Enter movie title"
                  value={movieForm.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="director">Director</label>

                <input
                  id="director"
                  type="text"
                  name="director"
                  placeholder="Enter director name"
                  value={movieForm.director}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="releaseYear">Release year</label>

                  <input
                    id="releaseYear"
                    type="number"
                    name="releaseYear"
                    placeholder="For example 1999"
                    value={movieForm.releaseYear}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="rating">Rating</label>

                  <input
                    id="rating"
                    type="number"
                    name="rating"
                    placeholder="1–10"
                    min="1"
                    max="10"
                    step="0.1"
                    value={movieForm.rating}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="genreId">Genre</label>

                <select
                  id="genreId"
                  name="genreId"
                  value={movieForm.genreId}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select genre</option>

                  {genres.map((genre) => (
                    <option key={genre.id} value={genre.id}>
                      {genre.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button type="submit" className="save-button">
                  {editingMovieId !== null ? "Update Movie" : "Save Movie"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

export default Movies;