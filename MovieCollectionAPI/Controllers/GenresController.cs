using Microsoft.AspNetCore.Mvc;
using MovieCollectionAPI.DTOs;
using MovieCollectionAPI.Interfaces;

namespace MovieCollectionAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class GenresController : ControllerBase
{
    private readonly IGenreService _genreService;

    // Constructor.
    public GenresController(IGenreService genreService)
    {
        _genreService = genreService;
    }

    // Get all genres.
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var genres = await _genreService.GetAllAsync();

        return Ok(genres);
    }

    // Get one genre by id.
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var genre = await _genreService.GetByIdAsync(id);

        if (genre is null)
        {
            return NotFound();
        }

        return Ok(genre);
    }

    // Create a new genre.
    [HttpPost]
    public async Task<IActionResult> Create(GenreCreateDto dto)
    {
        var createdGenre = await _genreService.AddAsync(dto);

        return CreatedAtAction(
            nameof(GetById),
            new { id = createdGenre.Id },
            createdGenre
        );
    }

    // Update an existing genre.
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, GenreUpdateDto dto)
    {
        var wasUpdated = await _genreService.UpdateAsync(id, dto);

        if (!wasUpdated)
        {
            return NotFound();
        }

        return NoContent();
    }

    // Delete a genre.
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var wasDeleted = await _genreService.DeleteAsync(id);

        if (!wasDeleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}