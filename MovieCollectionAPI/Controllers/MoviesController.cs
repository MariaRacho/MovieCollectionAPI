using Microsoft.AspNetCore.Mvc;
using MovieCollectionAPI.DTOs;
using MovieCollectionAPI.Interfaces;

namespace MovieCollectionAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MoviesController : ControllerBase
{
    private readonly IMovieService _movieService;

    // Constructor.
    public MoviesController(IMovieService movieService)
    {
        _movieService = movieService;
    }

    // Get all movies.
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var movies = await _movieService.GetAllAsync();

        return Ok(movies);
    }

    // Get one movie by id.
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var movie = await _movieService.GetByIdAsync(id);

        if (movie is null)
        {
            return NotFound();
        }

        return Ok(movie);
    }

    // Create a new movie.
    [HttpPost]
    public async Task<IActionResult> Create(MovieCreateDto dto)
    {
        var createdMovie = await _movieService.AddAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = createdMovie.Id },
            createdMovie
        );
    }

    // Update an existing movie.
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, MovieUpdateDto dto)
    {
        var wasUpdated = await _movieService.UpdateAsync(id, dto);

        if (!wasUpdated)
        {
            return NotFound();
        }

        return NoContent();
    }

    // Delete a movie.
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var wasDeleted = await _movieService.DeleteAsync(id);

        if (!wasDeleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}