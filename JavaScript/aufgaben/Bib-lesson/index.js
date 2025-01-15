import { addBook, removeBook, findBookByTitle, getBooks, loadBooks } from './bookManager.js';
import { printBooks } from './utils.js';
import readline from 'readline';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

function promptUser() {
    rl.question('Was möchtest du tun? (hinzufügen/entfernen/suchen/exit): ', action => {
        if (action.toLowerCase() === 'hinzufügen') {
            rl.question('Titel: ', title => {
                rl.question('Autor: ', author => {
                    rl.question('Erscheinungsjahr: ', year => {
                        addBook(title, author, parseInt(year, 10));
                        printBooks(getBooks());
                        promptUser();
                    });
                });
            });
        } else if (action.toLowerCase() === 'entfernen') {
            rl.question('ID des zu entfernenden Buches: ', id => {
                removeBook(parseInt(id, 10));
                printBooks(getBooks());
                promptUser();
            });
        } else if (action.toLowerCase() === 'suchen') {
            rl.question('Titel des zu suchenden Buches: ', title => {
                findBookByTitle(title);
                promptUser();
            });
        } else if (action.toLowerCase() === 'exit') {
            rl.close();
        } else {
            console.log('Ungültige Option, bitte versuche es erneut.');
            promptUser();
        }
    });
}


loadBooks();


printBooks(getBooks());


promptUser();
