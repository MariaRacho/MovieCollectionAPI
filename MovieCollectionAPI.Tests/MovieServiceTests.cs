using MovieCollectionAPI.DTOs;
using MovieCollectionAPI.Interfaces;
using MovieCollectionAPI.Models;
using MovieCollectionAPI.Services;
using NSubstitute;

namespace MovieCollectionAPI.Tests;

public class MovieServiceTests
{
    private readonly IMovieRepository _movieRepository;
    private readonly MovieService _movieService;

    public MovieServiceTests()
    {
        _movieRepository = Substitute.For<IMovieRepository>();
        _movieService = new MovieService(_movieRepository);
    }

    [Fact]
    public async Task GetAllAsync_ShouldReturnAllMovies()
    {
        // Arrange.
        var movies = new List<Movie>
        {
            new Movie
            {
                Id = 1,
                Title = "Gladiator",
                Director = "Ridley Scott",
                ReleaseYear = 2000,
                Rating = 8.5,
                GenreId = 1
            },
            new Movie
            {
                Id = 2,
                Title = "Inception",
                Director = "Christopher Nolan",
                ReleaseYear = 2010,
                Rating = 8.8,
                GenreId = 2
            }
        };

        _movieRepository.GetAllAsync().Returns(movies);

        // Act.
        var result = await _movieService.GetAllAsync();

        // Assert.
        Assert.Equal(2, result.Count());
    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnMovie_WhenMovieExists()
    {
        // Arrange.
        var movie = new Movie
        {
            Id = 1,
            Title = "Gladiator",
            Director = "Ridley Scott",
            ReleaseYear = 2000,
            Rating = 8.5,
            GenreId = 1
        };

        _movieRepository.GetByIdAsync(1).Returns(movie);

        // Act.
        var result = await _movieService.GetByIdAsync(1);

        // Assert.
        Assert.NotNull(result);
        Assert.Equal("Gladiator", result!.Title);
    }

    [Fact]
    public async Task GetByIdAsync_ShouldReturnNull_WhenMovieDoesNotExist()
    {
        // Arrange.
        _movieRepository.GetByIdAsync(99).Returns((Movie?)null);

        // Act.
        var result = await _movieService.GetByIdAsync(99);

        // Assert.
        Assert.Null(result);
    }

    [Fact]
    public async Task AddAsync_ShouldCreateMovie()
    {
        // Arrange.
        var dto = new MovieCreateDto
        {
            Title = "The Dark Knight",
            Director = "Christopher Nolan",
            ReleaseYear = 2008,
            Rating = 9.0,
            GenreId = 1
        };

        // Act.
        var result = await _movieService.AddAsync(dto);

        // Assert.
        Assert.NotNull(result);
        Assert.Equal("The Dark Knight", result.Title);

        await _movieRepository.Received(1).AddAsync(Arg.Any<Movie>());
        await _movieRepository.Received(1).SaveChangesAsync();
    }

    [Fact]
    public async Task UpdateAsync_ShouldReturnTrue_WhenMovieExists()
    {
        // Arrange.
        var movie = new Movie
        {
            Id = 1,
            Title = "Old Title",
            Director = "Old Director",
            ReleaseYear = 2000,
            Rating = 7.0,
            GenreId = 1
        };

        var dto = new MovieUpdateDto
        {
            Title = "New Title",
            Director = "New Director",
            ReleaseYear = 2025,
            Rating = 9.5,
            GenreId = 2
        };

        _movieRepository.GetByIdAsync(1).Returns(movie);

        // Act.
        var result = await _movieService.UpdateAsync(1, dto);

        // Assert.
        Assert.True(result);

        await _movieRepository.Received(1).UpdateAsync(movie);
        await _movieRepository.Received(1).SaveChangesAsync();
    }

    [Fact]
    public async Task UpdateAsync_ShouldReturnFalse_WhenMovieDoesNotExist()
    {
        // Arrange.
        var dto = new MovieUpdateDto
        {
            Title = "New Title",
            Director = "New Director",
            ReleaseYear = 2025,
            Rating = 9.5,
            GenreId = 2
        };

        _movieRepository.GetByIdAsync(99).Returns((Movie?)null);

        // Act.
        var result = await _movieService.UpdateAsync(99, dto);

        // Assert.
        Assert.False(result);
    }

    [Fact]
    public async Task DeleteAsync_ShouldReturnTrue_WhenMovieExists()
    {
        // Arrange.
        var movie = new Movie
        {
            Id = 1,
            Title = "Gladiator",
            Director = "Ridley Scott",
            ReleaseYear = 2000,
            Rating = 8.5,
            GenreId = 1
        };

        _movieRepository.GetByIdAsync(1).Returns(movie);

        // Act.
        var result = await _movieService.DeleteAsync(1);

        // Assert.
        Assert.True(result);

        await _movieRepository.Received(1).DeleteAsync(movie);
        await _movieRepository.Received(1).SaveChangesAsync();
    }
}