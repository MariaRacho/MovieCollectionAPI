namespace MovieCollectionAPI.DTOs.Create;

// DTO used when creating a new loan.
public class LoanCreateDto
{
    // Id of the movie being borrowed.
    public int MovieId { get; set; }

    // Date when the movie is borrowed.
    public DateTime LoanDate { get; set; }

    // Expected return date.
    public DateTime ReturnDate { get; set; }
}