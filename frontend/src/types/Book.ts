// This file defines the TypeScript interface for a Book object, which includes properties such as bookID, title, author, publisher, isbn, classification, category, pageCount, and price.
export interface Book {
    bookID: number;
    title: string;
    author: string;
    publisher: string;
    isbn: string;
    classification: string;
    category: string;
    pageCount: number;
    price: number;
}