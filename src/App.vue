<template>
  <UploadSpinner v-if="uploading" />
  <router-view v-else></router-view>
</template>

<script>
import UploadSpinner from './components/reusable/UploadSpinner.vue'
export default {
  components: {
    UploadSpinner
  },

  data() {
    return {
      uploading: false
    }
  },

  async created() {
    this.uploading = true
    await this.$store.getters['games/loadGames']
    this.uploading = false
  }
}
</script>
