import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";

function BookList({ selectedCategories }: { selectedCategories: string[] }) {
    // State variables for books, pagination, and sorting
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageNumber, setPageNumber] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [sortOrder, setSortOrder] = useState("asc");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    // Fetch books from the API whenever page number, page size, or sort order changes
    useEffect(() => {
        const fetchBooks = async () => {
            setIsLoading(true);
            const categoryParams = selectedCategories.map(c => `bookCategories=${encodeURIComponent(c)}`).join('&');

            try {
                const response = await fetch(`https://localhost:7122/api/Book?pageSize=${pageSize}&pageNum=${pageNumber}&sortOrder=${sortOrder}${categoryParams ? `&${categoryParams}` : ''}`);
                const data = await response.json();
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchBooks();
    }, [pageNumber, pageSize, sortOrder, selectedCategories]);

    // Reset to page 1 whenever the selected category changes
    useEffect(() => {
        setPageNumber(1);
    }, [selectedCategories]);

    // Render the bookstore UI
    return (
        <>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h1>Bookstore</h1>
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => {
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                        setPageNumber(1);
                    }}>
                    Sort by Title {sortOrder === "asc" ? "↑" : "↓"}
                </button>
            </div>

            {isLoading ? (
                <div className="text-center my-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <>
                    {books.map((book) => (
                        <div key={book.bookID} className="card mb-3">
                            <div className="card-body">
                                <h2 className="card-title">{book.title}</h2>
                                <ul className="list-unstyled">
                                    <li><strong>Author:</strong> {book.author}</li>
                                    <li><strong>Publisher:</strong> {book.publisher}</li>
                                    <li><strong>ISBN:</strong> {book.isbn}</li>
                                    <li><strong>Classification:</strong> <span className="badge bg-primary">{book.classification}</span></li>
                                    <li><strong>Category:</strong> <span className="badge bg-secondary">{book.category}</span></li>
                                    <li><strong>Pages:</strong> {book.pageCount}</li>
                                    <li><strong>Price:</strong> ${book.price}</li>
                                </ul>
                                <button className="btn btn-success" onClick={() => navigate(`/buy/${book.title}/${book.bookID}/${book.price}`)}>Buy</button>
                            </div>
                        </div>
                    ))}
                </>
            )}

            <div className="d-flex gap-2 my-3">
                <button className="btn btn-outline-primary" onClick={() => setPageNumber(pageNumber - 1)} disabled={pageNumber === 1}>Previous</button>

                {[...Array(totalPages)].map((_, index) => (
                    <button
                        className={pageNumber === index + 1 ? "btn btn-primary" : "btn btn-outline-secondary"}
                        key={index}
                        onClick={() => setPageNumber(index + 1)}>
                        {index + 1}
                    </button>
                ))}

                <button className="btn btn-outline-primary" onClick={() => setPageNumber(pageNumber + 1)} disabled={pageNumber === totalPages}>Next</button>
            </div>

            <label>
                Results per page:
                <select value={pageSize} onChange={(e) => {
                    setPageSize(Number(e.target.value));
                    setPageNumber(1);
                }}>
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="20">20</option>
                </select>
            </label>
        </>
    );
}

export default BookList;