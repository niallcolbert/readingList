<template>
  <div>
    <input v-model="isbn" type="text" @keyup.enter="getBook">
    <button @click="getBook">Get book details</button>
  </div>
</template>

<script>
export default {
  name: 'BookList',
  data () {
    return {
      isbn: '0358380235'
    }
  },
  methods: {
    getBook() {
      console.log("getting book", this.isbn)
    }
  }
}
</script>
