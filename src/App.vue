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

<style>
.game-heading {
  font-size: 26px;
  font-weight: bold;
  color: #e44600;
  line-height: 28px;
  letter-spacing: -0.5px;
  margin-bottom: 10px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-bottom: 1px dotted #e3a286;
}

.game-paragraph {
  color: #1a1a1a;
  font-size: 15px;
  line-height: 22px;
  padding-bottom: 20px;
  text-align: justify;
}
</style>
