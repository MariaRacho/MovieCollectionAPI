namespace MovieCollectionAPI.Models;

// Represents a loan in the database.
public class Loan
{
    // Primary key.
    public int Id { get; set; }

    // Date when the movie was borrowed.
    public DateTime LoanDate { get; set; }

    // Expected return date.
    public DateTime ReturnDate { get; set; }

    // Indicates whether the movie has been returned.
    public bool IsReturned { get; set; }

    // Foreign key to Movie.
    public int MovieId { get; set; }

    // Navigation property to the related movie.
    public Movie? Movie { get; set; }
}