namespace MovieCollectionAPI.DTOs.Update;

// DTO used when updating a loan.
public class LoanUpdateDto
{
    // Updated return date.
    public DateTime ReturnDate { get; set; }

    // Indicates whether the movie has been returned.
    public bool IsReturned { get; set; }
}