using System.ComponentModel.DataAnnotations;

namespace MovieCollectionAPI.DTOs;

// DTO used when updating an existing genre.
public class GenreUpdateDto
{
    [Required]
    [StringLength(50)]
    public string Name { get; set; } = string.Empty;
}