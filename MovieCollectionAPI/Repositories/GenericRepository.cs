using Microsoft.EntityFrameworkCore;
using MovieCollectionAPI.Data;
using MovieCollectionAPI.Interfaces;

namespace MovieCollectionAPI.Repositories;

// Generic repository implementation for basic CRUD operations.
public class GenericRepository<T> : IGenericRepository<T> where T : class
{
    private readonly AppDbContext _context;
    private readonly DbSet<T> _dbSet;

    // Constructor.
    public GenericRepository(AppDbContext context)
    {
        _context = context;
        _dbSet = context.Set<T>();
    }

    // Get all entities.
    public async Task<IEnumerable<T>> GetAllAsync()
    {
        return await _dbSet.ToListAsync();
    }

    // Get one entity by id.
    public async Task<T?> GetByIdAsync(int id)
    {
        return await _dbSet.FindAsync(id);
    }

    // Add a new entity.
    public async Task AddAsync(T entity)
    {
        await _dbSet.AddAsync(entity);
    }

    // Update an existing entity.
    public Task UpdateAsync(T entity)
    {
        _dbSet.Update(entity);
        return Task.CompletedTask;
    }

    // Delete an entity.
    public Task DeleteAsync(T entity)
    {
        _dbSet.Remove(entity);
        return Task.CompletedTask;
    }

    // Save changes to the database.
    public async Task SaveChangesAsync()
    {
        await _context.SaveChangesAsync();
    }
}