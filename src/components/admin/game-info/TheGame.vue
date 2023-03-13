<template>
  <PageSubtitle :title="title" />
  <div class="d-flex flex-column">
    <GamePanel
      :title="title"
      :developer="developer"
      :publisher="publisher"
      :genre="genre"
      :cover="cover"
      :introduction="introduction"
    />
    <button @click="openFullScreenGameModal" class="btn btn-primary align-self-end mt-3">
      Game preview
    </button>
  </div>

  <GameModal :id="gameId" />
</template>

<script>
import PageSubtitle from '../UI/PageSubtitle.vue'
import GamePanel from './GamePanel.vue'
import GameModal from './about-game/GameModal.vue'

export default {
  components: {
    PageSubtitle,
    GamePanel,
    GameModal
  },

  props: ['gameId', 'game'],

  data() {
    return {
      gameModal: null
    }
  },

  computed: {
    title() {
      return this.game.title
    },

    developer() {
      return this.game.developer
    },

    publisher() {
      return this.game.publisher
    },

    genre() {
      return this.game.genre
    },

    cover() {
      return this.game.cover
    },

    introduction() {
      return this.game.introduction
    }
  },

  methods: {
    openFullScreenGameModal() {
      const gameModal = new bootstrap.Modal('#gameModal', {
        keyboard: false
      })
      console.log(gameModal)
      gameModal.show()
    }
  }
}
</script>
