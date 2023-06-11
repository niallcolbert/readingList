export const state = () => ({
    booklist: {
        books: [],
        sortBy: 'title'
    }
})

export const mutations = {
    ADD_BOOK(state, book) {
        state.booklist.books.push({ 
            isbn: book.isbn, 
            title: book.title,
            author: book.author,
            status: 0,// 0: unread, 1:in progress, 2: finished,
            rating: null
        });
        this.commit('SORT_BOOKS', state.booklist.sortBy);
    },

    REMOVE_BOOK(state, book) {
        state.booklist.books.splice(state.booklist.books.indexOf(book), 1);
    },

    UPDATE_BOOK_STATUS(state, payload) {
        let index = state.booklist.books.indexOf(payload.book);
        payload.book.status = payload.status;
        state.booklist.books[index] = payload.book;
        this.commit('SORT_BOOKS', state.booklist.sortBy);
    },

    UPDATE_BOOK_RATING(state, payload) {
        let index = state.booklist.books.indexOf(payload.book);
        payload.book.rating = payload.rating;
        state.booklist.books[index] = payload.book;
        this.commit('SORT_BOOKS', state.booklist.sortBy);
    },
    
    UPDATE_BOOK_DETAILS(state, payload) {
        let index = state.booklist.books.indexOf(payload.book);
        payload.book.title = payload.title;
        payload.book.author = payload.author;
        payload.book.isbn = payload.isbn;
        state.booklist.books[index] = payload.book;
        this.commit('SORT_BOOKS', state.booklist.sortBy);
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
        state.booklist.sortBy = sortBy;
        state.booklist.books = books;  
    },

    TOGGLE_SORT_DIRECTION(state) {
        state.booklist.books.reverse();
    },

    IMPORT_BOOKLIST(state, books) {
        state.booklist.books = books; 
    }

}