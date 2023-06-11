export const state = () => ({
    booklist: {
        books: []
    }
})

export const mutations = {
    ADD_BOOK(state, book) {
        state.booklist.books = [{ 
            isbn: book.isbn, 
            title: book.title,
            author: book.author,
            status: 0// 0: unread, 1:in progress, 2: finished
        }, ...state.booklist.books];
    },

    REMOVE_BOOK(state, book) {
        state.booklist.books.splice(state.booklist.books.indexOf(book), 1);
    },

    UPDATE_BOOK_STATUS(state, payload) {
        let index = state.booklist.books.indexOf(payload.book);
        payload.book.status = payload.status;
        state.booklist.books[index] = payload.book;
    },
    
    UPDATE_BOOK_DETAILS(state, payload) {
        let index = state.booklist.books.indexOf(payload.book);
        payload.book.title = payload.title;
        payload.book.author = payload.author;
        payload.book.isbn = payload.isbn;
        state.booklist.books[index] = payload.book;
    },

    SORT_BOOKS(state, sortBy) {
        const books = state.booklist.books;
        books.sort((a, b) => {
            let compare = 0;
            if (a[sortBy] > b[sortBy]) {
                compare = 1;
            } else if (b[sortBy] > a[sortBy]) {
                compare = -1;
            }
            return compare;
        });
        state.booklist.books = books;  
    },

    IMPORT_BOOKLIST(state, books) {
        state.booklist.books = books; 
    }

}