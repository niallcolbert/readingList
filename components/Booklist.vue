<template>
  <div>
    <input v-model="isbn" type="text" @keyup.enter="getBook">
    <button @click="getBook">Get book details</button>
    <hr>
    <p>Title: <span v-text='book.title'></span></p>
    <p>Author: {{ book.author }}</p>
    <p>ISBN: <span v-text='book.isbn'></span></p>
  </div>
</template>

<script>
import { parseComponent } from 'vue-template-compiler';

export default {
    name: "BookList",
    data() {
      return {
        isbn: "",
        book: {},
      };
    },
    methods: {
      async getBook() {
        try {
          const data = await this.$axios.$get(`https://openlibrary.org/isbn/${this.isbn}.json`);
          this.updateBook(data, this.isbn);
          this.isbn = ''
        } catch (error) {
          console.error(error);
        }
      },
      updateBook(data, isbn) {
        this.getAuthor(data.authors);
        this.book.title = data.title;
        this.book.isbn = isbn;
      }, 
      async getAuthor(author) {
        await this.$axios.$get(`https://openlibrary.org${author[0].key}.json`).then((res) => {
          this.book.author = res.name;
        }).catch((err) => console.log(err))
        }
    }
}
</script>
