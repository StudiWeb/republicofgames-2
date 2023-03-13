<template>
  <div class="card mb-3">
    <div class="row g-0">
      <div class="col-md-3 d-flex justify-content-center justify-content-md-start">
        <img :src="cover" class="img-fluid rounded-start align-self-start" :alt="title" />
      </div>
      <div class="col-md-9">
        <div class="card-body">
          <GenreBadge class="mb-3" :genre="genre" />
          <h5 class="card-title">{{ title }}</h5>
          <p class="card-text">
            {{ introduction }}
          </p>
          <div>
            <div><span class="fw-bold">Developer: </span>{{ developer }}</div>
            <div><span class="fw-bold">Publisher: </span>{{ publisher }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import GenreBadge from '../../reusable/GenreBadge.vue'

export default {
  components: {
    GenreBadge
  },

  props: ['title', 'developer', 'publisher', 'genre', 'cover', 'introduction']
}
</script>
