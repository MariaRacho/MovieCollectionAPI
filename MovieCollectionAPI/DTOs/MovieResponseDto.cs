namespace MovieCollectionAPI.DTOs;

// DTO returned when sending movie data to the client.
public class MovieResponseDto
{
    public int Id { get; set; }

    public string Title { get; set; } = string.Empty;

    public string Director { get; set; } = string.Empty;

    public int ReleaseYear { get; set; }

    public double Rating { get; set; }

    public int GenreId { get; set; }
}