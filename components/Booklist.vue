<template>
  <div>
    <button v-if="sortBy !== 'title'" @click="sortBooks('title')" class="update">Sort by title</button>
    <button v-if="sortBy !== 'author'" @click="sortBooks('author')" class="update">Sort by author</button>
    <button v-if="sortBy !== 'isbn'" @click="sortBooks('isbn')" class="update">Sort by isbn</button>
    <button v-if="sortBy !== 'status'" @click="sortBooks('status')" class="update">Sort by status</button>
    <div class="booklist">
      <Book
        v-for="(book, i) in books"
        :key="i"
        :book="book"
        :status="book.status"
        :statuses="statuses" />
    </div>
  </div>
 
</template>

<script>

export default {
    name: "BookList",
    data() {
      return {
        statuses: ['Unread', 'In Progress', 'Finished'],
        books: this.$store.state.booklist.books,
        sortBy: ''
      };
    },
    methods: {
      sortBooks(sortBy) {
        this.sortBy = sortBy;
        this.$store.commit('SORT_BOOKS', sortBy);
      }
    }
}
</script>
