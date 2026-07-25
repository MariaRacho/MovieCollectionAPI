namespace MovieCollectionAPI.Models;

// Represents a movie genre in the database.
public class Genre
{
    // Primary key.
    public int Id { get; set; }

    // Name of the genre (e.g. Action, Comedy).
    public string Name { get; set; } = string.Empty;

    // One genre can have many movies.
    public List<Movie> Movies { get; set; } = new();
}