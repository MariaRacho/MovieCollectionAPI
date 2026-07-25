using MovieCollectionAPI.DTOs;
using MovieCollectionAPI.Interfaces;
using MovieCollectionAPI.Models;

namespace MovieCollectionAPI.Services;

// Service for genre operations.
public class GenreService : IGenreService
{
    private readonly IGenreRepository _genreRepository;

    // Constructor.
    public GenreService(IGenreRepository genreRepository)
    {
        _genreRepository = genreRepository;
    }

    // Get all genres and convert them to response DTOs.
    public async Task<IEnumerable<GenreResponseDto>> GetAllAsync()
    {
        var genres = await _genreRepository.GetAllAsync();

        return genres.Select(genre => new GenreResponseDto
        {
            Id = genre.Id,
            Name = genre.Name
        });
    }

    // Get one genre by id and convert it to a response DTO.
    public async Task<GenreResponseDto?> GetByIdAsync(int id)
    {
        var genre = await _genreRepository.GetByIdAsync(id);

        if (genre is null)
        {
            return null;
        }

        return new GenreResponseDto
        {
            Id = genre.Id,
            Name = genre.Name
        };
    }

    // Create a new genre from a create DTO.
    public async Task<GenreResponseDto> AddAsync(GenreCreateDto dto)
    {
        var genre = new Genre
        {
            Name = dto.Name
        };

        await _genreRepository.AddAsync(genre);
        await _genreRepository.SaveChangesAsync();

        return new GenreResponseDto
        {
            Id = genre.Id,
            Name = genre.Name
        };
    }

    // Update an existing genre from an update DTO.
    public async Task<bool> UpdateAsync(int id, GenreUpdateDto dto)
    {
        var genre = await _genreRepository.GetByIdAsync(id);

        if (genre is null)
        {
            return false;
        }

        genre.Name = dto.Name;

        await _genreRepository.UpdateAsync(genre);
        await _genreRepository.SaveChangesAsync();

        return true;
    }

    // Delete a genre by id.
    public async Task<bool> DeleteAsync(int id)
    {
        var genre = await _genreRepository.GetByIdAsync(id);

        if (genre is null)
        {
            return false;
        }

        await _genreRepository.DeleteAsync(genre);
        await _genreRepository.SaveChangesAsync();

        return true;
    }
}