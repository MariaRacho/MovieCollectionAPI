using System.ComponentModel.DataAnnotations;

namespace MovieCollectionAPI.DTOs;

// DTO used when creating a new movie.
public class MovieCreateDto
{
    [Required]
    public string Title { get; set; } = string.Empty;

    [Required]
    public string Director { get; set; } = string.Empty;

    [Range(1888, 2100)]
    public int ReleaseYear { get; set; }

    [Range(1, 10)]
    public double Rating { get; set; }

    [Required]
    public int GenreId { get; set; }
}