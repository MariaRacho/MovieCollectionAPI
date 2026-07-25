using MovieCollectionAPI.DTOs;
using MovieCollectionAPI.Interfaces;
using MovieCollectionAPI.Models;

namespace MovieCollectionAPI.Services;

// Service for movie operations.
public class MovieService : IMovieService
{
    private readonly IMovieRepository _movieRepository;

    // Constructor.
    public MovieService(IMovieRepository movieRepository)
    {
        _movieRepository = movieRepository;
    }

    // Get all movies and convert them to response DTOs.
    public async Task<IEnumerable<MovieResponseDto>> GetAllAsync()
    {
        var movies = await _movieRepository.GetAllAsync();

        return movies.Select(movie => new MovieResponseDto
        {
            Id = movie.Id,
            Title = movie.Title,
            Director = movie.Director,
            ReleaseYear = movie.ReleaseYear,
            Rating = movie.Rating,
            GenreId = movie.GenreId
        });
    }

    // Get one movie by id and convert it to a response DTO.
    public async Task<MovieResponseDto?> GetByIdAsync(int id)
    {
        var movie = await _movieRepository.GetByIdAsync(id);

        if (movie is null)
        {
            return null;
        }

        return new MovieResponseDto
        {
            Id = movie.Id,
            Title = movie.Title,
            Director = movie.Director,
            ReleaseYear = movie.ReleaseYear,
            Rating = movie.Rating,
            GenreId = movie.GenreId
        };
    }

    // Create a new movie from a create DTO.
    public async Task<MovieResponseDto> AddAsync(MovieCreateDto dto)
    {
        var movie = new Movie
        {
            Title = dto.Title,
            Director = dto.Director,
            ReleaseYear = dto.ReleaseYear,
            Rating = dto.Rating,
            GenreId = dto.GenreId
        };

        await _movieRepository.AddAsync(movie);
        await _movieRepository.SaveChangesAsync();

        return new MovieResponseDto
        {
            Id = movie.Id,
            Title = movie.Title,
            Director = movie.Director,
            ReleaseYear = movie.ReleaseYear,
            Rating = movie.Rating,
            GenreId = movie.GenreId
        };
    }

    // Update an existing movie from an update DTO.
    public async Task<bool> UpdateAsync(int id, MovieUpdateDto dto)
    {
        var movie = await _movieRepository.GetByIdAsync(id);

        if (movie is null)
        {
            return false;
        }

        movie.Title = dto.Title;
        movie.Director = dto.Director;
        movie.ReleaseYear = dto.ReleaseYear;
        movie.Rating = dto.Rating;
        movie.GenreId = dto.GenreId;

        await _movieRepository.UpdateAsync(movie);
        await _movieRepository.SaveChangesAsync();

        return true;
    }

    // Delete a movie by id.
    public async Task<bool> DeleteAsync(int id)
    {
        var movie = await _movieRepository.GetByIdAsync(id);

        if (movie is null)
        {
            return false;
        }

        await _movieRepository.DeleteAsync(movie);
        await _movieRepository.SaveChangesAsync();

        return true;
    }
}