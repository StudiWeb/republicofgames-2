<template>
  <div class="mb-4">
    <label for="releaseDates" class="form-label">Select release date</label>
    <select class="form-select" id="releaseDates" @change="selectReleaseDateId">
      <option value="none">none</option>
      <option v-for="(date, index) in releaseDates" :key="index" :value="date.id">
        {{ releaseDate(date) }}
      </option>
    </select>
  </div>
  <div></div>
</template>

<script>
export default {
  props: ['releaseDates'],

  data() {
    return {
      releaseDateId: ''
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

    selectReleaseDateId(e) {
      this.$emit('date-id', e.target.value)
    }
  }
}
</script>
