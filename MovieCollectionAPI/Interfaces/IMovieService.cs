using MovieCollectionAPI.DTOs;

namespace MovieCollectionAPI.Interfaces;

// Service interface for movie operations.
public interface IMovieService
{
    Task<IEnumerable<MovieResponseDto>> GetAllAsync();

    Task<MovieResponseDto?> GetByIdAsync(int id);

    Task<MovieResponseDto> AddAsync(MovieCreateDto dto);

    Task<bool> UpdateAsync(int id, MovieUpdateDto dto);

    Task<bool> DeleteAsync(int id);
}