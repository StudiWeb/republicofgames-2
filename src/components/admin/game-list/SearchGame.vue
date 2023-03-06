<template>
  <div class="my-4">
    <div class="mb-3">
      <input v-model="search" type="search" class="form-control" :placeholder="placeholder" />
    </div>
    <div class="input-group mb-3">
      <div class="form-check">
        <input
          v-model="searchBy"
          value="title"
          id="title"
          class="form-check-input me-2"
          type="radio"
        />
        <label class="form-check-label" for="title"> title </label>
      </div>
      <div class="form-check mx-2">
        <input
          v-model="searchBy"
          value="developer"
          id="developer"
          class="form-check-input"
          type="radio"
        />
        <label class="form-check-label" for="developer"> developer </label>
      </div>
      <div class="form-check mx-2">
        <input
          v-model="searchBy"
          value="publisher"
          id="publisher"
          class="form-check-input"
          type="radio"
        />
        <label class="form-check-label" for="publisher"> publisher </label>
      </div>
      <div class="form-check mx-2">
        <input v-model="searchBy" value="genre" id="genre" class="form-check-input" type="radio" />
        <label class="form-check-label" for="genre"> genre </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['games'],

  data() {
    return {
      search: '',
      searchBy: 'title'
    }
  },

  watch: {
    search(phrase) {
      if (this.searchBy === 'title') {
        let searchedGames = []
        searchedGames = this.games.filter((g) =>
          g.title.toLowerCase().includes(phrase.toLowerCase())
        )
        this.$emit('update-games', searchedGames)
      } else if (this.searchBy === 'developer') {
        let searchedGames = []
        searchedGames = this.games.filter((g) =>
          g.developer.toLowerCase().includes(phrase.toLowerCase())
        )
        this.$emit('update-games', searchedGames)
      } else if (this.searchBy === 'publisher') {
        let searchedGames = []
        searchedGames = this.games.filter((g) =>
          g.publisher.toLowerCase().includes(phrase.toLowerCase())
        )
        this.$emit('update-games', searchedGames)
      } else {
        //by genre
        let searchedGames = []
        searchedGames = this.games.filter((g) =>
          g.genre.toLowerCase().includes(phrase.toLowerCase())
        )
        this.$emit('update-games', searchedGames)
      }
    }
  },

  computed: {
    placeholder() {
      return 'search by ' + this.searchBy
    }
  }
}
</script>

<style scoped>
label:hover {
  cursor: pointer;
}
</style>
