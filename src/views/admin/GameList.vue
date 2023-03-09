<template>
  <PageTitle title="Game list" />
  <SearchGame @update-games="updateGameList" :games="games" />
  <table class="table table-striped">
    <thead>
      <th scope="col">#</th>
      <th scope="col">Title</th>
      <th scope="col">Developer</th>
      <th scope="col">Publisher</th>
      <th scope="col">Genre</th>
    </thead>
    <tbody>
      <tr v-for="(g, index) in searchedGames" :key="g.id" scope="row">
        <td>{{ ++index }}</td>
        <td>{{ g.title }}</td>
        <td>{{ g.developer }}</td>
        <td>{{ g.publisher }}</td>
        <td>{{ g.genre }}</td>
      </tr>
    </tbody>
  </table>
</template>
<script>
import { database } from '../../firebase'
import { ref, get, child } from 'firebase/database'

import PageTitle from '../../components/admin/UI/PageTitle.vue'
import SearchGame from '../../components/admin/game-list/SearchGame.vue'

export default {
  components: {
    PageTitle,
    SearchGame
  },

  data() {
    return {
      games: [],
      searchedGames: []
    }
  },

  created() {
    this.loadGames()
  },

  methods: {
    loadGames() {
      this.games = this.$store.getters['games/games']
      this.searchedGames = this.$store.getters['games/games']
    },

    updateGameList(games) {
      this.searchedGames = games
    }
  }
}
</script>
