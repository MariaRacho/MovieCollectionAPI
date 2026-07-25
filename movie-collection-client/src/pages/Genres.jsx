import { useEffect, useState } from "react";
import {
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../services/genreService";
import "../styles/Genres.css";

function Genres() {
  const [genres, setGenres] = useState([]);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editingGenreId, setEditingGenreId] = useState(null);

  const [genreForm, setGenreForm] = useState({
    name: "",
  });

  useEffect(() => {
    loadGenres();
  }, []);

  async function loadGenres() {
    try {
      const data = await getGenres();
      setGenres(data);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;

    setGenreForm({
      ...genreForm,
      [name]: value,
    });
  }

  function resetForm() {
    setGenreForm({
      name: "",
    });

    setEditingGenreId(null);
    setShowForm(false);
  }

  function handleAddGenre() {
    setError("");
    setEditingGenreId(null);

    setGenreForm({
      name: "",
    });

    setShowForm(true);
  }

  function handleEditGenre(genre) {
    setError("");
    setEditingGenreId(genre.id);

    setGenreForm({
      name: genre.name,
    });

    setShowForm(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      if (editingGenreId !== null) {
        await updateGenre(editingGenreId, genreForm);
      } else {
        await createGenre(genreForm);
      }

      await loadGenres();
      resetForm();
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDeleteGenre(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this genre?"
    );

    if (!confirmed) {
      return;
    }

    setError("");

    try {
      await deleteGenre(id);
      await loadGenres();
    } catch (error) {
      setError(error.message);
    }
  }

  function handleModalClick(event) {
    if (event.target === event.currentTarget) {
      resetForm();
    }
  }

  return (
    <main className="genres-page">
      <section className="genres-header">
        <div className="genres-header-content">
          <span className="genres-section-label">Genre Collection</span>

          <h1>Genres</h1>

          <p>
            Browse, add, edit and manage the genres used in your movie
            collection.
          </p>
        </div>

        <button
          type="button"
          className="add-genre-button"
          onClick={handleAddGenre}
        >
          <span>+</span>
          Add Genre
        </button>
      </section>

      {error && <p className="genres-error-message">{error}</p>}

      {genres.length === 0 && !error ? (
        <section className="genres-empty-state">
          <div className="genres-empty-icon">🎭</div>

          <h2>No genres yet</h2>

          <p>
            Add your first genre to start organizing your movie collection.
          </p>

          <button
            type="button"
            className="add-genre-button"
            onClick={handleAddGenre}
          >
            <span>+</span>
            Add First Genre
          </button>
        </section>
      ) : (
        <section className="genres-grid">
          {genres.map((genre) => (
            <article className="genre-card" key={genre.id}>
              <div className="genre-icon">
                <span>🎭</span>
              </div>

              <div className="genre-content">
                <span className="genre-card-label">Movie Genre</span>

                <h2>{genre.name}</h2>

                <p>
                  Movies connected to this genre can be managed from the Movies
                  page.
                </p>

                <div className="genre-actions">
                  <button
                    type="button"
                    className="genre-edit-button"
                    onClick={() => handleEditGenre(genre)}
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="genre-delete-button"
                    onClick={() => handleDeleteGenre(genre.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      )}

      {showForm && (
        <div
          className="genre-modal-overlay"
          onMouseDown={handleModalClick}
          role="presentation"
        >
          <section
            className="genre-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="genre-modal-title"
          >
            <div className="genre-modal-header">
              <div>
                <span className="genre-modal-label">
                  {editingGenreId !== null
                    ? "Update genre"
                    : "Create new genre"}
                </span>

                <h2 id="genre-modal-title">
                  {editingGenreId !== null ? "Edit Genre" : "Add Genre"}
                </h2>
              </div>

              <button
                type="button"
                className="genre-modal-close"
                onClick={resetForm}
                aria-label="Close modal"
              >
                ×
              </button>
            </div>

            <form className="genre-form" onSubmit={handleSubmit}>
              <div className="genre-form-group">
                <label htmlFor="genre-name">Genre name</label>

                <input
                  id="genre-name"
                  type="text"
                  name="name"
                  placeholder="For example: Action"
                  value={genreForm.name}
                  onChange={handleChange}
                  required
                  autoFocus
                />
              </div>

              <div className="genre-form-actions">
                <button
                  type="button"
                  className="genre-cancel-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button type="submit" className="genre-save-button">
                  {editingGenreId !== null ? "Update Genre" : "Save Genre"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

export default Genres;