namespace MovieCollectionAPI.DTOs.Response;

// DTO returned when retrieving loan information.
public class LoanResponseDto
{
    // Loan identifier.
    public int Id { get; set; }

    // Movie identifier.
    public int MovieId { get; set; }

    // Movie title.
    public string MovieTitle { get; set; } = string.Empty;

    // Date when the movie was borrowed.
    public DateTime LoanDate { get; set; }

    // Expected return date.
    public DateTime ReturnDate { get; set; }

    // Indicates whether the movie has been returned.
    public bool IsReturned { get; set; }
}