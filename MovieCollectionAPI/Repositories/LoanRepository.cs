using MovieCollectionAPI.Data;
using MovieCollectionAPI.Interfaces;
using MovieCollectionAPI.Models;

namespace MovieCollectionAPI.Repositories;

// Repository implementation for Loan.
public class LoanRepository : GenericRepository<Loan>, ILoanRepository
{
    // Constructor.
    public LoanRepository(AppDbContext context)
        : base(context)
    {
    }
}