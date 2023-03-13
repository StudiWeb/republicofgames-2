<template>
  <div class="card">
    <h5 class="card-header">System requirements</h5>
    <div v-if="!isConsoleGame" class="card-body">
      <div class="d-flex mb-3">
        <img
          class="align-self-start"
          src="https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fpc%2Fpc.svg?alt=media&token=662fc995-9b91-41b4-b6f1-02119a006cbf"
        />
        <div class="px-3">
          <div v-if="hasMinimum">
            <span class="fw-bold">Minimum </span>
            <p>{{ minimum }}</p>
          </div>
          <div v-if="hasRecommended">
            <span class="fw-bold"> Recommended </span>
            <p>{{ recommended }}</p>
          </div>
          <div v-if="hasUltra">
            <span class="fw-bold">Ultra </span>
            <p>{{ ultra }}</p>
          </div>
        </div>
      </div>
      <div v-if="platformList.length > 0">
        <div class="mb-3 h5">Play also on</div>
        <PlatformIcons :platforms="platformList" />
      </div>
    </div>
    <div class="card-body" v-else>
      <div class="mb-3 h5">Play on</div>
      <PlatformIcons :platforms="platformList" />
    </div>
  </div>
</template>

<script>
import PlatformIcons from '../../../../reusable/PlatformIcons.vue'
export default {
  components: {
    PlatformIcons
  },

  props: ['minimum', 'recommended', 'ultra', 'releaseDates'],

  computed: {
    hasMinimum() {
      return this.minimum !== '' ? true : false
    },

    hasRecommended() {
      return this.recommended !== '' ? true : false
    },

    hasUltra() {
      return this.ultra !== '' ? true : false
    },

    isConsoleGame() {
      const console = this.minimum + this.recommended + this.ultra
      return console === '' ? true : false
    },

    platformList() {
      /**
       * list of platforms without pc
       */

      if (this.releaseDates.length > 0) {
        let platforms = []
        this.releaseDates.forEach((releaseDate) => {
          releaseDate.platforms.forEach((p) => {
            if (p !== 'pc') {
              platforms.push(p)
            }
          })
        })
        return platforms.sort()
      } else {
        return []
      }
    }
  }
}
</script>
