<template>
  <LoadSpinner v-if="loading" />
  <div v-else>
    <AlertInfo v-if="!hasGameScreens" info="This game does not have screens." />
    <div v-else>
      <ScreenInfo
        @load-screens="loadScreens"
        v-for="(screen, index) in screens"
        :key="index"
        :index="index"
        :screen="screen"
        :screens="screens"
        :gameTitle="gameTitle"
        :gameId="gameId"
      />
    </div>
  </div>
</template>
<script>
import LoadSpinner from '../../reusable/LoadSpinner.vue'
import AlertInfo from '../UI/AlertInfo.vue'
import ScreenInfo from './ScreenInfo.vue'

export default {
  components: {
    LoadSpinner,
    AlertInfo,
    ScreenInfo
  },

  props: ['game', 'screens'],

  data() {
    return {
      loading: false
    }
  },

  computed: {
    gameId() {
      return this.game.id
    },

    gameTitle() {
      return this.game.title
    },

    hasGameScreens() {
      return this.screens.length > 0 ? true : false
    }
  }
}
</script>
