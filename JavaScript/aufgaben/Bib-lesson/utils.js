export function generateId(books) {
    return books.length ? Math.max(...books.map(book => book.id)) + 1 : 1;
}

export function printBooks(books) {
    console.table(books);
}
