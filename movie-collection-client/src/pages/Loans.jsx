import { useEffect, useState } from "react";
import {
  getLoans,
  createLoan,
  updateLoan,
  deleteLoan,
} from "../services/loanService";
import { getMovies } from "../services/movieService";
import "../styles/Loans.css";

function Loans() {
  const [loans, setLoans] = useState([]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingLoanId, setEditingLoanId] = useState(null);

  const [loanForm, setLoanForm] = useState({
    movieId: "",
    loanDate: "",
    returnDate: "",
    isReturned: false,
  });

  useEffect(() => {
    loadLoans();
    loadMovies();
  }, []);

  async function loadLoans() {
    try {
      const data = await getLoans();
      setLoans(data);
    } catch (error) {
      setError(error.message);
    }
  }

  async function loadMovies() {
    try {
      const data = await getMovies();
      setMovies(data);
    } catch (error) {
      setError(error.message);
    }
  }

  function handleChange(event) {
    const { name, value, type, checked } = event.target;

    setLoanForm((currentForm) => ({
      ...currentForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  function resetForm() {
    setLoanForm({
      movieId: "",
      loanDate: "",
      returnDate: "",
      isReturned: false,
    });

    setEditingLoanId(null);
    setShowForm(false);
  }

  function handleAddLoan() {
    setError("");
    setEditingLoanId(null);

    setLoanForm({
      movieId: "",
      loanDate: "",
      returnDate: "",
      isReturned: false,
    });

    setShowForm(true);
  }

  function handleEditLoan(loan) {
    setError("");
    setEditingLoanId(loan.id);

    setLoanForm({
      movieId: loan.movieId,
      loanDate: formatDateForInput(loan.loanDate),
      returnDate: formatDateForInput(loan.returnDate),
      isReturned: loan.isReturned,
    });

    setShowForm(true);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      if (editingLoanId !== null) {
        const updatedLoan = {
          returnDate: loanForm.returnDate,
          isReturned: loanForm.isReturned,
        };

        await updateLoan(editingLoanId, updatedLoan);
      } else {
        const newLoan = {
          movieId: Number(loanForm.movieId),
          loanDate: loanForm.loanDate,
          returnDate: loanForm.returnDate,
        };

        await createLoan(newLoan);
      }

      await loadLoans();
      resetForm();
    } catch (error) {
      setError(error.message);
    }
  }

  async function handleDeleteLoan(id) {
    const confirmed = window.confirm(
      "Are you sure you want to delete this loan?"
    );

    if (!confirmed) {
      return;
    }

    setError("");

    try {
      await deleteLoan(id);
      await loadLoans();
    } catch (error) {
      setError(error.message);
    }
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      resetForm();
    }
  }

  function formatDateForInput(dateValue) {
    if (!dateValue) {
      return "";
    }

    return dateValue.split("T")[0];
  }

  function formatDisplayDate(dateValue) {
    if (!dateValue) {
      return "No date";
    }

    return new Date(dateValue).toLocaleDateString();
  }

  return (
    <main className="loans-page">
      <section className="loans-container">
        <header className="loans-header">
          <div className="loans-heading">
            <span className="section-label">Movie Collection</span>

            <h1>Loans</h1>

            <p>
              Keep track of borrowed movies, return dates and completed loans.
            </p>
          </div>

          <button
            type="button"
            className="add-loan-button"
            onClick={handleAddLoan}
            disabled={movies.length === 0}
          >
            <span>+</span>
            Add Loan
          </button>
        </header>

        {error && <p className="error-message">{error}</p>}

        {movies.length === 0 && !error && (
          <p className="information-message">
            You need to add at least one movie before creating a loan.
          </p>
        )}

        {loans.length === 0 ? (
          <section className="empty-state">
            <div className="empty-state-icon">📅</div>

            <h2>No loans yet</h2>

            <p>
              Add your first loan to start keeping track of borrowed movies.
            </p>

            {movies.length > 0 && (
              <button
                type="button"
                className="add-loan-button"
                onClick={handleAddLoan}
              >
                <span>+</span>
                Add Loan
              </button>
            )}
          </section>
        ) : (
          <section className="loans-grid">
            {loans.map((loan) => (
              <article className="loan-card" key={loan.id}>
                <div className="loan-poster">
                  <span>🎬</span>
                </div>

                <div className="loan-content">
                  <div className="loan-card-header">
                    <div>
                      <span
                        className={
                          loan.isReturned
                            ? "loan-status returned-status"
                            : "loan-status active-status"
                        }
                      >
                        {loan.isReturned ? "Returned" : "Active"}
                      </span>

                      <h2>{loan.movieTitle}</h2>
                    </div>
                  </div>

                  <div className="loan-information">
                    <div className="loan-detail">
                      <span className="detail-label">Loan date</span>

                      <span className="detail-value">
                        {formatDisplayDate(loan.loanDate)}
                      </span>
                    </div>

                    <div className="loan-detail">
                      <span className="detail-label">Return date</span>

                      <span className="detail-value">
                        {formatDisplayDate(loan.returnDate)}
                      </span>
                    </div>
                  </div>

                  <div className="loan-actions">
                    <button
                      type="button"
                      className="edit-button"
                      onClick={() => handleEditLoan(loan)}
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => handleDeleteLoan(loan.id)}
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
          <section className="loan-form">
            <div className="modal-header">
              <div>
                <span className="section-label">
                  {editingLoanId !== null
                    ? "Update loan details"
                    : "Create a new loan"}
                </span>

                <h2>
                  {editingLoanId !== null ? "Edit Loan" : "Add Loan"}
                </h2>
              </div>

              <button
                type="button"
                className="close-modal-button"
                onClick={resetForm}
                aria-label="Close loan form"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              {editingLoanId === null && (
                <>
                  <div className="form-group">
                    <label htmlFor="movieId">Movie</label>

                    <select
                      id="movieId"
                      name="movieId"
                      value={loanForm.movieId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select movie</option>

                      {movies.map((movie) => (
                        <option key={movie.id} value={movie.id}>
                          {movie.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="loanDate">Loan date</label>

                      <input
                        id="loanDate"
                        type="date"
                        name="loanDate"
                        value={loanForm.loanDate}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="returnDate">Return date</label>

                      <input
                        id="returnDate"
                        type="date"
                        name="returnDate"
                        value={loanForm.returnDate}
                        onChange={handleChange}
                        min={loanForm.loanDate}
                        required
                      />
                    </div>
                  </div>
                </>
              )}

              {editingLoanId !== null && (
                <>
                  <div className="form-group">
                    <label htmlFor="returnDate">Return date</label>

                    <input
                      id="returnDate"
                      type="date"
                      name="returnDate"
                      value={loanForm.returnDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <label className="returned-checkbox">
                    <input
                      type="checkbox"
                      name="isReturned"
                      checked={loanForm.isReturned}
                      onChange={handleChange}
                    />

                    <span>
                      <strong>Movie returned</strong>
                      Mark this loan as completed.
                    </span>
                  </label>
                </>
              )}

              <div className="modal-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={resetForm}
                >
                  Cancel
                </button>

                <button type="submit" className="save-button">
                  {editingLoanId !== null ? "Update Loan" : "Save Loan"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}

export default Loans;