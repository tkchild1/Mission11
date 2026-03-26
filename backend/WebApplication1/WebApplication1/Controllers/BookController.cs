using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;

namespace WebApplication1.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BookController : ControllerBase
    {
        private BookstoreContext _bookContext;

        public BookController(BookstoreContext temp)
        {
            _bookContext = temp;
        }

        [HttpGet]
        public IActionResult GetBooks(int pageSize, int pageNum, string? sortOrder, [FromQuery] List<string>? bookCategories = null)
        {
            var query = _bookContext.Books.AsQueryable();

            if (bookCategories != null && bookCategories.Any())
            {
                query = query.Where(p => bookCategories.Contains(p.Category));
            }

            if (sortOrder == "asc")
                query = query.OrderBy(b => b.Title);
            else if (sortOrder == "desc")
                query = query.OrderByDescending(b => b.Title);

            var something = query.Skip((pageNum - 1) * pageSize).Take(pageSize).ToList();
            
            var totalNumBooks = query.Count();
            return Ok(new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            });
        }

        [HttpGet("GetCategories")]
        public IActionResult GetProjectTypes()
        {
            var bookCategories = _bookContext.Books
                .Select(b => b.Category)
                .Distinct()
                .ToList();

            return Ok(bookCategories);
        }
    }
}