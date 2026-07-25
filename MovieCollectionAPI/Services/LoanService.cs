using MovieCollectionAPI.DTOs.Create;
using MovieCollectionAPI.DTOs.Response;
using MovieCollectionAPI.DTOs.Update;
using MovieCollectionAPI.Interfaces;
using MovieCollectionAPI.Models;

namespace MovieCollectionAPI.Services;

// Service for loan operations.
public class LoanService : ILoanService
{
    private readonly ILoanRepository _loanRepository;
    private readonly IMovieRepository _movieRepository;

    // Constructor.
    public LoanService(
        ILoanRepository loanRepository,
        IMovieRepository movieRepository)
    {
        _loanRepository = loanRepository;
        _movieRepository = movieRepository;
    }

    // Get all loans and convert them to response DTOs.
    public async Task<IEnumerable<LoanResponseDto>> GetAllAsync()
    {
        var loans = await _loanRepository.GetAllAsync();
        var movies = await _movieRepository.GetAllAsync();

        var movieTitles = movies.ToDictionary(
            movie => movie.Id,
            movie => movie.Title);

        return loans.Select(loan => new LoanResponseDto
        {
            Id = loan.Id,
            MovieId = loan.MovieId,
            MovieTitle = movieTitles.TryGetValue(
                loan.MovieId,
                out var movieTitle)
                    ? movieTitle
                    : "Unknown movie",
            LoanDate = loan.LoanDate,
            ReturnDate = loan.ReturnDate,
            IsReturned = loan.IsReturned
        });
    }

    // Get one loan by id and convert it to a response DTO.
    public async Task<LoanResponseDto?> GetByIdAsync(int id)
    {
        var loan = await _loanRepository.GetByIdAsync(id);

        if (loan is null)
        {
            return null;
        }

        var movie = await _movieRepository.GetByIdAsync(loan.MovieId);

        return new LoanResponseDto
        {
            Id = loan.Id,
            MovieId = loan.MovieId,
            MovieTitle = movie?.Title ?? "Unknown movie",
            LoanDate = loan.LoanDate,
            ReturnDate = loan.ReturnDate,
            IsReturned = loan.IsReturned
        };
    }

    // Create a new loan from a create DTO.
    public async Task<LoanResponseDto?> AddAsync(LoanCreateDto dto)
    {
        var movie = await _movieRepository.GetByIdAsync(dto.MovieId);

        if (movie is null)
        {
            return null;
        }

        var loan = new Loan
        {
            MovieId = dto.MovieId,
            LoanDate = dto.LoanDate,
            ReturnDate = dto.ReturnDate,
            IsReturned = false
        };

        await _loanRepository.AddAsync(loan);
        await _loanRepository.SaveChangesAsync();

        return new LoanResponseDto
        {
            Id = loan.Id,
            MovieId = loan.MovieId,
            MovieTitle = movie.Title,
            LoanDate = loan.LoanDate,
            ReturnDate = loan.ReturnDate,
            IsReturned = loan.IsReturned
        };
    }

    // Update an existing loan from an update DTO.
    public async Task<bool> UpdateAsync(int id, LoanUpdateDto dto)
    {
        var loan = await _loanRepository.GetByIdAsync(id);

        if (loan is null)
        {
            return false;
        }

        loan.ReturnDate = dto.ReturnDate;
        loan.IsReturned = dto.IsReturned;

        await _loanRepository.UpdateAsync(loan);
        await _loanRepository.SaveChangesAsync();

        return true;
    }

    // Delete a loan by id.
    public async Task<bool> DeleteAsync(int id)
    {
        var loan = await _loanRepository.GetByIdAsync(id);

        if (loan is null)
        {
            return false;
        }

        await _loanRepository.DeleteAsync(loan);
        await _loanRepository.SaveChangesAsync();

        return true;
    }
}