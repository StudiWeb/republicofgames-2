<template>
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-2 d-flex justify-content-center justify-content-md-start align-self-start">
        <img :src="cover" class="img-fluid rounded-start" :alt="title" />
      </div>
      <div class="col-md-10">
        <div class="card-body">
          <GenreBadge class="mb-3" :genre="genre" />
          <h5 class="card-title">{{ title }}</h5>
          <p class="card-text">
            {{ introduction }}
          </p>
          <div class="d-flex mb-3">
            <div class="me-3"><span class="fw-bold">Developer: </span> {{ developer }}</div>
            <div><span class="fw-bold">Publisher: </span> {{ publisher }}</div>
          </div>
          <ReleaseDates :title="title" :releaseDates="releaseDates" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ReleaseDates from './ReleaseDates.vue'
import GenreBadge from '../../../../reusable/GenreBadge.vue'

export default {
  components: { ReleaseDates, GenreBadge },

  props: ['cover', 'title', 'developer', 'publisher', 'genre', 'introduction', 'releaseDates']
}
</script>
