using MovieCollectionAPI.DTOs.Create;
using MovieCollectionAPI.DTOs.Response;
using MovieCollectionAPI.DTOs.Update;

namespace MovieCollectionAPI.Interfaces;

// Service interface for loan operations.
public interface ILoanService
{
    Task<IEnumerable<LoanResponseDto>> GetAllAsync();

    Task<LoanResponseDto?> GetByIdAsync(int id);

    Task<LoanResponseDto?> AddAsync(LoanCreateDto dto);

    Task<bool> UpdateAsync(int id, LoanUpdateDto dto);

    Task<bool> DeleteAsync(int id);
}