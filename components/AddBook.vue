<template>
  <b-card class="mb-3">
    <b-card-text>
      <b-form-group label="ISBN:" label-cols-sm="2">
        <b-form-input v-model="isbn" placeholder="ISBN"></b-form-input>
        <b-button @click="getBook" variant="secondary" :disabled="!isbn" class="float-right mt-2">Get book details</b-button>
      </b-form-group>
      <b-form-group label="Title:" label-cols-sm="2">
        <b-form-input v-model="title" placeholder="Title"></b-form-input>
      </b-form-group>
      <b-form-group label="Author:" label-cols-sm="2">
        <b-form-input v-model="author" placeholder="Author"></b-form-input>
      </b-form-group>
      <b-button @click="addBook" variant="primary" class="mb-3">Add Book</b-button>
    </b-card-text>
  </b-card>
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
