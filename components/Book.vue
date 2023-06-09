<template>
  <div>
    <p class="title">
      Title: {{ book.title }}
    </p>
    <p class="author">
      Author: {{ book.author }}
    </p>
    <p class="isbn">
      ISBN: {{ book.isbn }}
    </p>
     <p class="status">
      Status: {{ statuses[status] }}
    </p>
    <button v-if="status !== 0" @click="updateBookStatus(0)" class="update">Change status to Unread</button> 
    <button v-if="status !== 1" @click="updateBookStatus(1)" class="update">Change status to In Progress</button>
    <button v-if="status !== 2" @click="updateBookStatus(2)" class="update">Change status to Finished</button>
    <button @click="removeBook" class="delete">Delete</button>
  </div>
</template>

<script>
export default {
  name: 'Book',
  props: ['book', 'statuses'],
  data() {
    return {
      status: 0
    };
  },
  created() {
    this.status = this.book.status || 0;
  },
  methods: {
    removeBook() {
      this.$store.commit('REMOVE_BOOK', this.book);
    },
    updateBookStatus(status) {
      this.status = status;
      this.$store.commit('UPDATE_BOOK_STATUS', {book: this.book, status: status});
    }
  }
}
</script>

<style></style>