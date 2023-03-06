<template>
  <div class="progress mb-3">
    <div
      class="progress-bar progress-bar-striped"
      role="progressbar"
      aria-label="Default striped example"
      :style="style"
      :aria-valuenow="value"
      aria-valuemin="0"
      aria-valuemax="100"
    >
      {{ value }} %
    </div>
  </div>
</template>

<script>
export default {
  props: ['value'],

  computed: {
    style() {
      return `width: ${this.value}%`
    }
  }
}
</script>
