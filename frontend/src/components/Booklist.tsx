import { useEffect, useState } from "react";
import type { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/BooksAPI";
import Pagination from "./Pagination";

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
        const loadBooks = async () => {
            setIsLoading(true);
            try {
                const data = await fetchBooks(pageNumber, pageSize, sortOrder, selectedCategories);
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (error) {
                console.error("Error fetching books:", error);
            } finally {
                setIsLoading(false);
            }
        };
        loadBooks();
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

            <Pagination
                currentPage={pageNumber}
                totalPages={totalPages}
                onPageChange={(page) => setPageNumber(page)}
                pageSize={pageSize}
                onPageSizeChange={(size) => {
                    setPageSize(size);
                    setPageNumber(1);
                }}
            />
        </>
    );
}

export default BookList;