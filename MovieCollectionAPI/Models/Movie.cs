namespace MovieCollectionAPI.Models;

// Represents a movie in the database.
public class Movie
{
    // Primary key.
    public int Id { get; set; }

    // Movie title.
    public string Title { get; set; } = string.Empty;

    // Movie director.
    public string Director { get; set; } = string.Empty;

    // Year the movie was released.
    public int ReleaseYear { get; set; }

    // Movie rating (1–10).
    public double Rating { get; set; }

    // Foreign key to Genre.
    public int GenreId { get; set; }

    // Navigation property to the related genre.
    public Genre? Genre { get; set; }
}