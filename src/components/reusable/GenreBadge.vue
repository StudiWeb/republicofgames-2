<template>
  <button type="button" class="btn btn-secondary text-uppercase">
    {{ genre }}
  </button>
</template>
<script>
export default {
  props: ['genre']
}
</script>
