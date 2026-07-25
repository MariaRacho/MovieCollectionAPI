using MovieCollectionAPI.Data;
using MovieCollectionAPI.Interfaces;
using MovieCollectionAPI.Models;

namespace MovieCollectionAPI.Repositories;

// Repository implementation for Genre.
public class GenreRepository : GenericRepository<Genre>, IGenreRepository
{
    // Constructor.
    public GenreRepository(AppDbContext context)
        : base(context)
    {
    }
}