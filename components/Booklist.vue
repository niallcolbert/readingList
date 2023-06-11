<template>
  <b-card>
      <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
        <b-button-group class="mb-3">
          <b-button variant="success" @click="sortBooks('title')" :disabled="sortBy === 'title'" class="sortBooks">Sort by title</b-button>
          <b-button variant="info" @click="sortBooks('author')" :disabled="sortBy === 'author'" class="sortBooks">Sort by author</b-button>
          <b-button variant="warning" @click="sortBooks('rating')" :disabled="sortBy === 'rating'" class="sortBooks">Sort by rating</b-button>
          <b-button variant="danger" @click="sortBooks('isbn')" :disabled="sortBy === 'isbn'" class="sortBooks">Sort by ISBN</b-button>
          <b-button variant="primary" @click="sortBooks('status')" :disabled="sortBy === 'status'" class="sortBooks">Sort by status</b-button>
        </b-button-group>

        <b-button-group class="mb-3 ml-3">
          <b-button variant="primary" @click="reverseSortDirection()" class="reverseSortDirection">Asc/Desc</b-button>
        </b-button-group>
      </b-button-toolbar>
   
      <div class="booklist">
        <Book
          v-for="(book, i) in books"
          :key="i"
          :book="book"
          :status="book.status"
          :rating="book.rating"
          :statuses="statuses" />
      </div>
  </b-card>
 
</template>

<script>

export default {
    name: "BookList",
    data() {
      return {
        statuses: ['Unread', 'In Progress', 'Finished'],
        books: this.$store.state.booklist.books,
        sortBy: this.$store.state.booklist.sortBy
      };
    },
    methods: {
      sortBooks(sortBy) {
        this.sortBy = sortBy;
        this.$store.commit('SORT_BOOKS', sortBy);
      },

      reverseSortDirection() {
        this.$store.commit('TOGGLE_SORT_DIRECTION');
      }
    }
}
</script>
