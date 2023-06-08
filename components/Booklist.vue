<template>
  <div class="booklist">
    <Book
      v-for="(book, i) in $store.state.booklist.books"
      :key="i"
      :book="book" />
  </div>
</template>

<script>

export default {
    name: "BookList",
    data() {
      return {
        
      };
    },
    methods: {
      
    }
}
</script>
