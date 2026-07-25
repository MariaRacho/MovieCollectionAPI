import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMovies } from "../services/movieService";
import { getGenres } from "../services/genreService";
import "../styles/Home.css";

function Home() {
  const [movieCount, setMovieCount] = useState(0);
  const [genreCount, setGenreCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      const [movies, genres] = await Promise.all([
        getMovies(),
        getGenres(),
      ]);

      setMovieCount(movies.length);
      setGenreCount(genres.length);
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <main className="home-page">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-label">Your personal movie library</span>

          <h1>
            Organize your movies.
            <span>Enjoy your collection.</span>
          </h1>

          <p>
            Keep track of your favorite movies, organize them by genre and
            manage your entire collection in one place.
          </p>

          <div className="hero-actions">
            <Link to="/movies" className="primary-button">
              Browse Movies
            </Link>

            <Link to="/genres" className="secondary-button">
              Manage Genres
            </Link>
          </div>
        </div>

        <div className="hero-card">
          <div className="movie-poster-placeholder">
            <span className="poster-icon">🎞️</span>
            <p>Build your movie collection</p>
          </div>

          <div className="hero-card-content">
            <span>Movie Collection</span>
            <h2>Everything in one place</h2>
            <p>Add, edit and organize your movies with ease.</p>
          </div>
        </div>
      </section>

      <section className="dashboard-section">
        <div className="section-heading">
          <span>Collection overview</span>
          <h2>Your library at a glance</h2>
          <p>
            See how many movies and genres are currently stored in your
            collection.
          </p>
        </div>

        {error && <p className="home-error-message">{error}</p>}

        <div className="dashboard-grid">
          <Link to="/movies" className="dashboard-card">
            <div className="dashboard-icon">🎬</div>

            <div>
              <span className="dashboard-label">Movies</span>
              <strong>{movieCount}</strong>
              <p>Movies saved in your collection</p>
            </div>
          </Link>

          <Link to="/genres" className="dashboard-card">
            <div className="dashboard-icon">🏷️</div>

            <div>
              <span className="dashboard-label">Genres</span>
              <strong>{genreCount}</strong>
              <p>Genres available for organizing movies</p>
            </div>
          </Link>
        </div>
      </section>

      <section className="features-section">
        <div className="section-heading">
          <span>Simple and organized</span>
          <h2>Manage your collection with ease</h2>
          <p>
            The application gives you the tools you need to keep your movie
            library structured and easy to explore.
          </p>
        </div>

        <div className="features-grid">
          <article className="feature-card">
            <span className="feature-icon">🎬</span>
            <h3>Manage Movies</h3>
            <p>Add, edit, view and remove movies from your collection.</p>
          </article>

          <article className="feature-card">
            <span className="feature-icon">🏷️</span>
            <h3>Organize Genres</h3>
            <p>Create and manage genres to keep your movies organized.</p>
          </article>

          <article className="feature-card">
            <span className="feature-icon">✨</span>
            <h3>Clean Experience</h3>
            <p>Use a modern and simple interface built for easy navigation.</p>
          </article>
        </div>
      </section>
    </main>
  );
}

export default Home;