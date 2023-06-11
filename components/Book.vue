<template>
  <b-card class="mb-2 p-5">
    <div v-if="!editMode">
      <p class="title">
        Title: {{ book.title }}
      </p>
      <p class="author">
        Author: {{ book.author }}
      </p>
      <p class="isbn">
        ISBN: {{ book.isbn }}
      </p>
    </div>
    <div v-else>
      <b-card-text>
        <b-form-group label="Title:" label-cols-sm="2">
          <b-form-input v-model="title" placeholder="Title"></b-form-input>
        </b-form-group>
        <b-form-group label="Author:" label-cols-sm="2">
          <b-form-input v-model="author" placeholder="Author"></b-form-input>
        </b-form-group>
          <b-form-group label="ISBN:" label-cols-sm="2">
        <b-form-input v-model="isbn" placeholder="ISBN"></b-form-input>
        </b-form-group>
        <b-button @click="updateBookDetails" variant="primary" class="mb-3 updateDetails">Update book details</b-button>
      </b-card-text>
    </div>
    <span class="position-absolute m-2" style="top:0;right:0;">
      <star-rating 
        :rating="rating"
        :inline="true"
        :star-size="25"
        :show-rating="false"
        @rating-selected="updateBookRating"
        ></star-rating>

      <span class="btn disabled" :class="statusClasses[status]" >
          Status: {{ statuses[status] }}
      </span>
    </span>


    <b-button-toolbar aria-label="Toolbar with button groups and dropdown menu">
      <b-button-group class="mb-3">
        <b-button variant="secondary" @click="updateBookStatus(0)" :disabled="status === 0" class="updateStatus">Change status to Unread</b-button>
        <b-button variant="info" @click="updateBookStatus(1)" :disabled="status === 1" class="updateStatus">Change status to In Progress</b-button>
        <b-button variant="success" @click="updateBookStatus(2)" :disabled="status === 2" class="updateStatus">Change status to Finished</b-button>
      </b-button-group>

      <b-button-group class="mb-3 ml-3">
        <b-button variant="warning" @click="toggleEditMode" class="toggleEditMode">
          <span v-if="editMode">Leave Edit Mode</span>
          <span v-else>Enter Edit Mode</span>
        </b-button>
        <b-button variant="danger" @click="removeBook" class="removeBook">Delete</b-button>
      </b-button-group>

    </b-button-toolbar>
    
  </b-card>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  name: 'Book',
  props: ['book','status','rating','statuses'],
  components: {
    StarRating
  },
  data() {
    return {
      isbn: '',
      title: '',
      author: '',
      editMode: false,
      statusClasses: ['btn-secondary', 'btn-info', 'btn-success']
    };
  },
  created() {
    this.initValues();
  },
  methods: {
    removeBook() {
      this.$store.commit('REMOVE_BOOK', this.book);
    },

    updateBookStatus(status) {
      this.$store.commit('UPDATE_BOOK_STATUS', {book: this.book, status: status});
    },

    updateBookRating(rating) {
      this.$store.commit('UPDATE_BOOK_RATING', { book: this.book, rating: rating });
    },

    updateBookDetails() {
      this.$store.commit('UPDATE_BOOK_DETAILS', { 
        book: this.book, 
        title: this.title, 
        author: this.author, 
        isbn: this.isbn 
      });
      this.toggleEditMode();
    },

    initValues () {
      this.isbn = this.book.isbn;
      this.title = this.book.title;
      this.author = this.book.author;
    },

    toggleEditMode() {
      this.editMode = !this.editMode;
      this.initValues();
    }
  }
}
</script>

<style></style>