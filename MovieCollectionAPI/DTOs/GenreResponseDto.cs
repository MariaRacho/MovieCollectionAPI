namespace MovieCollectionAPI.DTOs;

// DTO returned when sending genre data to the client.
public class GenreResponseDto
{
    public int Id { get; set; }

    public string Name { get; set; } = string.Empty;
}