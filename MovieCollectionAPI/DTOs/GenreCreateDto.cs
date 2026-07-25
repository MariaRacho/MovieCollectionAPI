using System.ComponentModel.DataAnnotations;

namespace MovieCollectionAPI.DTOs;

// DTO used when creating a new genre.
public class GenreCreateDto
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = string.Empty;
}