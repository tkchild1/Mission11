import { useEffect, useState } from "react";
import { deleteBook, fetchBooks } from "../api/BooksAPI";
import EditBookForm from "../components/EditBookForm";
import NewBookForm from "../components/NewBookForm";
import type { Book } from "../types/Book";
import Pagination from "../components/Pagination";

const AdminBooksPage = () => {
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [books, setBooks] = useState<Book[]>([]);
    const [pageSize, setPageSize] = useState(5);
    const [pageNum, setPageNum] = useState(1);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [showForm, setShowForm] = useState(false);
    const [editingBook, setEditingBook] = useState<Book | null>(null);

    useEffect(() => {
        const loadBooks = async () => {
            try {
                setLoading(true);
                const data = await fetchBooks(pageNum, pageSize, "asc", []);
                setBooks(data.books);
                setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
            } catch (err) {
                setError("Failed to fetch books.");
            } finally {
                setLoading(false);
            }
        };
        loadBooks();
    }, [pageNum, pageSize]);

    const handleDelete = async (bookId: number) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (!confirmDelete) return;
        try {
            await deleteBook(bookId);
            // If we deleted the last book on this page, go back one page
            if (books.length === 1 && pageNum > 1) setPageNum(pageNum - 1);
            setBooks(books.filter((book) => book.bookID !== bookId));
        } catch (err) {
            setError("Failed to delete book.");
        }
    };

    if (loading) {
        return <div className="text-center my-5"><div className="spinner-border text-primary" role="status"><span className="visually-hidden">Loading...</span></div></div>;
    }
    if (error) {
        return <div className="alert alert-danger">{error}</div>;
    }

    return (
        <div>
            <h1>Admin Books Management</h1>

            {/* Only show Add button when neither form is open */}
            {!showForm && !editingBook && (
                <button className="btn btn-primary mb-3" onClick={() => setShowForm(true)}>
                    Add New Book
                </button>
            )}

            {showForm && (
                <NewBookForm
                    onSuccess={() => {
                        setShowForm(false);
                        fetchBooks(pageNum, pageSize, "asc", []).then((data) => {
                            setBooks(data.books);
                            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
                        });
                    }}
                    onCancel={() => setShowForm(false)}
                />
            )}

            {editingBook && (
                <EditBookForm
                    book={editingBook}
                    onSuccess={() => {
                        setEditingBook(null);
                        fetchBooks(pageNum, pageSize, "asc", []).then((data) => {
                            setBooks(data.books);
                            setTotalPages(Math.ceil(data.totalNumBooks / pageSize));
                        });
                    }}
                    onCancel={() => setEditingBook(null)}
                />
            )}

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Author</th>
                            <th>Publisher</th>
                            <th>ISBN</th>
                            <th>Classification</th>
                            <th>Category</th>
                            <th>Page Count</th>
                            <th>Price</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.map((book) => (
                            <tr key={book.bookID}>
                                <td>{book.title}</td>
                                <td>{book.author}</td>
                                <td>{book.publisher}</td>
                                <td>{book.isbn}</td>
                                <td>{book.classification}</td>
                                <td>{book.category}</td>
                                <td>{book.pageCount}</td>
                                <td>${book.price.toFixed(2)}</td>
                                <td>
                                    <button
                                        className="btn btn-sm btn-outline-primary me-2"
                                        onClick={() => setEditingBook(book)}
                                    >
                                        Edit
                                    </button>
                                    <button
                                        className="btn btn-sm btn-outline-danger"
                                        onClick={() => handleDelete(book.bookID)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <Pagination
                currentPage={pageNum}
                totalPages={totalPages}
                pageSize={pageSize}
                onPageChange={(newPage) => setPageNum(newPage)}
                onPageSizeChange={(newSize) => {
                    setPageSize(newSize);
                    setPageNum(1);
                }}
            />
        </div>
    );
};

export default AdminBooksPage;