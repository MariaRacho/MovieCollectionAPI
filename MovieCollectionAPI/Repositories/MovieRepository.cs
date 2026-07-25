using MovieCollectionAPI.Data;
using MovieCollectionAPI.Interfaces;
using MovieCollectionAPI.Models;

namespace MovieCollectionAPI.Repositories;

// Repository implementation for Movie.
public class MovieRepository : GenericRepository<Movie>, IMovieRepository
{
    // Constructor.
    public MovieRepository(AppDbContext context)
        : base(context)
    {
    }
}