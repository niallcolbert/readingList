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

    <button @click="removeBook" class="delete">Delete</button>
  </div>
</template>

<script>
export default {
  name: 'Book',
  props: ['book'],
  methods: {
    removeBook() {
      this.$store.commit('REMOVE_BOOK', this.book);
    }
  }
}
</script>

<style></style>