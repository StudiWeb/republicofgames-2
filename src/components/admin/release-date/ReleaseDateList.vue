<template>
  <PageSubtitle title="Release date list" />
  <AlertInfo v-if="!hasGameReleaseDate" :info="alertInfo" />
  <div v-else class="d-flex flex-wrap">
    <ReleaseDateBadge
      class="mb-1 me-2"
      v-for="(date, index) in releaseDates"
      :key="index"
      :date="date.date"
      :platforms="date.platforms"
    />
  </div>
</template>
<script>
import AlertInfo from '../UI/AlertInfo.vue'
import ReleaseDateBadge from '../../reusable/ReleaseDateBadge.vue'
import PageSubtitle from '../UI/PageSubtitle.vue'

export default {
  components: {
    AlertInfo,
    ReleaseDateBadge,
    PageSubtitle
  },

  props: ['game', 'releaseDates'],

  computed: {
    gameId() {
      return this.game.id
    },

    hasGameReleaseDate() {
      return this.releaseDates.length > 0 ? true : false
    },

    alertInfo() {
      return 'This game does not have an added release date.'
    }
  }
}
</script>
