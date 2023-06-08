<template>
  <div>
   <p>
      ISBN: <input v-model="isbn" type="text">
      <button @click="getBook">Get book details</button>
    </p>
    <p>
      Title: <input v-model="title" type="text">
    </p>
    <p>
      Author: <input v-model="author" type="text">
    </p>
   
    <button @click="addBook">Add Book</button>

  </div>
</template>

<script>

export default {
    name: "AddBook",
    data() {
      return {
        isbn: "",
        title: "",
        author: ""
      };
    },
    methods: {
      async getBook() {
        await this.$axios.$get(`https://openlibrary.org/isbn/${this.isbn}.json`).then((res) => {
          this.updateBook(res, this.isbn);
        }).catch((err) => console.log(err))
      },
      updateBook(data, isbn) {
        if(data.authors) {
          this.getAuthor(data.authors)
        }
        this.title = data.title;
      }, 
      async getAuthor(author) {
        await this.$axios.$get(`https://openlibrary.org${author[0].key}.json`).then((res) => {
          this.author = res.name;
        }).catch((err) => console.log(err))
      },
      addBook  () {
        const book = {
          isbn: this.isbn,
          title: this.title,
          author: this.author
        }
        this.$store.commit('ADD_BOOK', book);
      }
    }
}
</script>
