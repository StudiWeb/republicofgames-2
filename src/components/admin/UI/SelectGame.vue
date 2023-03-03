<template>
  <div class="mb-4">
    <label for="games" class="form-label">Select game</label>
    <select class="form-select" id="games" @change="selectGame">
      <option value="none">none</option>
      <option v-for="game in games" :key="game.id" :value="game.id">{{ game.title }}</option>
    </select>
  </div>
</template>

<script>
export default {
  emits: ['select-game'],

  data() {
    return {
      games: []
    }
  },

  created() {
    this.games = this.$store.getters['games/games']
  },

  methods: {
    selectGame(e) {
      const id = e.target.value
      const game = this.games.find((game) => game.id === id)
      this.$emit('select-game', game ? game : { id: 'none', title: 'none' })
    }
  }
}
</script>
