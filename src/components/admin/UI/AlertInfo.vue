<template>
  <div class="alert alert-info" role="alert">
    <div class="d-flex align-items-center">
      <i class="bi bi-info-square fs-3 me-2"></i>
      {{ info }}
    </div>
  </div>
</template>

<script>
export default {
  props: ['info']
}
</script>
