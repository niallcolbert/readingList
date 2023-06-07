export const state = () => ({
    booklist: []
})

export const mutations = {
    ADD_BOOK(state, book) {
        state.booklist = [{ 
            isbn: book.isbn, 
            title: book.title,
            author: book.author,
            status: 0// 0: unread, 1:in progress, 2: finished
        }, ...state.booklist];
    },

    REMOVE_BOOK(state, book) {
        state.booklist.splice(state.booklist.indexof(book), 1);
    },

    // UPDATE_BOOK_STATUS(state, book) {

    // }

}