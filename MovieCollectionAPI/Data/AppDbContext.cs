using Microsoft.EntityFrameworkCore;
using MovieCollectionAPI.Models;

namespace MovieCollectionAPI.Data;

// Database context for the application.
public class AppDbContext : DbContext
{
    // Constructor that passes options to the base DbContext class.
    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    // Table for movies.
    public DbSet<Movie> Movies { get; set; }

    // Table for genres.
    public DbSet<Genre> Genres { get; set; }

    // Table for loans.
    public DbSet<Loan> Loans { get; set; }
}