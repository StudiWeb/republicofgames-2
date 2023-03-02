<template>
  <h6
    class="sidebar-heading d-flex justify-content-between align-items-center px-3 mt-4 mb-1 text-muted"
  >
    <span>{{ title }}</span>
    <a class="link-secondary" href="#" aria-label="Add a new report">
      <span data-feather="plus-circle"></span>
    </a>
  </h6>
</template>

<script>
export default {
  props: ['title']
}
</script>

<style scoped>
.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}
</style>
