<template>
  <button type="button" class="btn btn-secondary">
    <div class="d-flex flex-wrap align-items-baseline">
      <span class="me-2"> {{ date }}</span>
      <div class="d-flex flex-wrap">
        <span
          v-for="(p, index) in platforms"
          :key="index"
          class="badge bg-dark m-1 text-uppercase"
          >{{ p }}</span
        >
      </div>
    </div>
  </button>
</template>

<script>
export default {
  props: ['date', 'platforms']
}
</script>
