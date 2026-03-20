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
        public IActionResult GetBooks(int pageSize, int pageNum, string? sortOrder)
        {
            var query = _bookContext.Books.AsQueryable();

            if (sortOrder == "asc")
                query = query.OrderBy(b => b.Title);
            else if (sortOrder == "desc")
                query = query.OrderByDescending(b => b.Title);

            var something = query.Skip((pageNum - 1) * pageSize).Take(pageSize).ToList();
            var totalNumBooks = _bookContext.Books.Count();
            return Ok(new
            {
                Books = something,
                TotalNumBooks = totalNumBooks
            });
        }
    }
}