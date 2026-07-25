using MovieCollectionAPI.DTOs;

namespace MovieCollectionAPI.Interfaces;

// Service interface for genre operations.
public interface IGenreService
{
    Task<IEnumerable<GenreResponseDto>> GetAllAsync();

    Task<GenreResponseDto?> GetByIdAsync(int id);

    Task<GenreResponseDto> AddAsync(GenreCreateDto dto);

    Task<bool> UpdateAsync(int id, GenreUpdateDto dto);

    Task<bool> DeleteAsync(int id);
}