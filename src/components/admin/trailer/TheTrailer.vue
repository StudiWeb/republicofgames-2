<template>
  <AlertInfo v-if="!hasGameTrailer" info="This game does not have a trailer." />
  <div v-else class="ratio ratio-16x9" v-html="trailer"></div>
</template>
<script>
import AlertInfo from '../UI/AlertInfo.vue'
export default {
  components: {
    AlertInfo
  },

  props: ['trailer'],

  computed: {
    hasGameTrailer() {
      return this.trailer !== '' ? true : false
    }
  }
}
</script>
