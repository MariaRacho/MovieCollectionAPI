using Microsoft.AspNetCore.Mvc;
using MovieCollectionAPI.DTOs.Create;
using MovieCollectionAPI.DTOs.Update;
using MovieCollectionAPI.Interfaces;

namespace MovieCollectionAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class LoansController : ControllerBase
{
    private readonly ILoanService _loanService;

    // Constructor.
    public LoansController(ILoanService loanService)
    {
        _loanService = loanService;
    }

    // Get all loans.
    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var loans = await _loanService.GetAllAsync();

        return Ok(loans);
    }

    // Get one loan by id.
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var loan = await _loanService.GetByIdAsync(id);

        if (loan is null)
        {
            return NotFound();
        }

        return Ok(loan);
    }

    // Create a new loan.
    [HttpPost]
    public async Task<IActionResult> Create(LoanCreateDto dto)
    {
        var createdLoan = await _loanService.AddAsync(dto);

        if (createdLoan is null)
        {
            return BadRequest("The selected movie does not exist.");
        }

        return CreatedAtAction(
            nameof(GetById),
            new { id = createdLoan.Id },
            createdLoan
        );
    }

    // Update an existing loan.
    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, LoanUpdateDto dto)
    {
        var wasUpdated = await _loanService.UpdateAsync(id, dto);

        if (!wasUpdated)
        {
            return NotFound();
        }

        return NoContent();
    }

    // Delete a loan.
    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var wasDeleted = await _loanService.DeleteAsync(id);

        if (!wasDeleted)
        {
            return NotFound();
        }

        return NoContent();
    }
}