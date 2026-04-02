import { useState } from "react";
import type { Book } from "../types/Book";
import { addBook } from "../api/BooksAPI";

interface NewBookFormProps {
    onSuccess: () => void;
    onCancel: () => void;
}

const NewBookForm = ({onSuccess, onCancel}: NewBookFormProps) => {
    const [formData, setFormData] = useState<Book>({
        bookID: 0,
        title: "",
        author: "",
        publisher: "",
        isbn: "",
        classification: "",
        category: "",
        pageCount: 0,
        price: 0,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: e.target.type === "number" ? Number(value) : value});
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await addBook(formData);
        onSuccess();
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Book</h2>
            <label>Book Title:</label>
            <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
            />
            <label>Author:</label>
            <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
            />
            <label>Publisher:</label>
            <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={handleChange}
                required
            />
            <label>ISBN:</label>
            <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                required
            />
            <label>Classification:</label>
            <input
                type="text"
                name="classification"
                value={formData.classification}
                onChange={handleChange}
                required
            />
            <label>Category:</label>
            <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
            />
            <label>Page Count:</label>
            <input
                type="number"
                name="pageCount"
                value={formData.pageCount}
                onChange={handleChange}
                required
            />
            <label>Price:</label>
            <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                required
            />
            <button type="submit">Add Book</button>
            <button type="button" onClick={onCancel}>Cancel</button>
        </form>
    );
};

export default NewBookForm;