<template>
  <div class="booklist">
    <Book
      v-for="(book, i) in $store.state.booklist.books"
      :key="i"
      :book="book"
      :statuses="statuses" />
  </div>
</template>

<script>

export default {
    name: "BookList",
    data() {
      return {
        statuses: ['Unread', 'In Progress', 'Finished']
      };
    },
    methods: {
      
    }
}
</script>
