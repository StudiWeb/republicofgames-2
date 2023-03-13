<template>
  <div class="ratio ratio-16x9" v-html="trailer"></div>
</template>
<script>
export default {
  props: ['trailer'],
  mounted() {
    console.log(this.trailer)
  }
}
</script>
