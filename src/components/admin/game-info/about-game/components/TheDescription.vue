<template>
  <div v-if="type === 'heading'" class="game-heading">{{ value }}</div>
  <div v-if="type === 'paragraph'" class="game-paragraph">{{ value }}</div>
</template>

<script>
export default {
  props: ['text'],

  computed: {
    type() {
      return this.text.type
    },

    value() {
      return this.text.value
    }
  }
}
</script>
