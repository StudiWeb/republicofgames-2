<template>
  <div class="d-flex bg-light p-2">
    <div class="d-flex flex-column text-center me-5">
      <span class="form-text">{{ title }}</span>
      <span class="fw-bold">Release date</span>
    </div>
    <div class="align-self-center">
      <div class="d-flex flex-wrap">
        <ReleaseDateBadge
          class="me-2 mb-2"
          v-for="(release, index) in releaseDates"
          :key="index"
          :date="release.date"
          :platforms="release.platforms"
        />
      </div>
    </div>
  </div>
</template>

<script>
import ReleaseDateBadge from '../../../../reusable/ReleaseDateBadge.vue'
export default {
  components: {
    ReleaseDateBadge
  },

  props: ['title', 'releaseDates']
}
</script>
