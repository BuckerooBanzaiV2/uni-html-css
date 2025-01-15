import { generateId } from './utils.js';
import fs from 'fs';

let books = [];


export function loadBooks() {
    if (fs.existsSync('books.txt')) {
        const data = fs.readFileSync('books.txt', 'utf8');
        books = JSON.parse(data);
        console.log('Bücher geladen.');
    }
}

export function saveBooks() {
    fs.writeFileSync('books.txt', JSON.stringify(books, null, 2), 'utf8');
    console.log('Bücher gespeichert.');
}

export function addBook(title, author, year) {
    const id = generateId(books);
    const book = { id, title, author, year };
    books.push(book);
    console.log(`Buch hinzugefügt:`, book);
    saveBooks();
}

export function removeBook(id) {
    books = books.filter(book => book.id !== id);
    console.log(`Buch mit ID ${id} entfernt.`);
    saveBooks();
}

export function findBookByTitle(title) {
    const book = books.find(book => book.title === title);
    console.log(`Buch mit Titel "${title}" gefunden:`, book);
    return book;
}

export function getBooks() {
    return books;
}
