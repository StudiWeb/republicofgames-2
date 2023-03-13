<template>
  <div class="mb-4">
    <label for="releaseDates" class="form-label">Select release date</label>
    <select class="form-select" id="releaseDates" @change="selectReleaseDateIndex">
      <option value="none">none</option>
      <option v-for="(date, index) in releaseDates" :key="index" :value="index">
        {{ releaseDate(date) }}
      </option>
    </select>
  </div>
  <div></div>
</template>

<script>
export default {
  emits: ['date-index'],

  props: ['releaseDates'],

  data() {
    return {
      releaseDateIndex: ''
    }
  },

  methods: {
    releaseDate(date) {
      let platformsString = ''
      date.platforms.forEach((p) => {
        platformsString += p.toUpperCase() + ', '
      })

      return date.date + ' - ' + platformsString
    },

    selectReleaseDateIndex(e) {
      this.$emit('date-index', e.target.value)
    }
  }
}
</script>
