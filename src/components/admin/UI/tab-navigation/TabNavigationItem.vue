<template>
  <li class="nav-item">
    <a @click="setComponent" class="nav-link active" aria-current="page" href="#">{{ title }}</a>
  </li>
</template>

<script>
export default {
  emits: ['set-component'],

  props: ['title'],

  methods: {
    setComponent() {
      switch (this.title.toLowerCase()) {
        case 'cover':
          this.$emit('set-component', 'game-cover')
          break
        case 'release date list':
          this.$emit('set-component', 'release-date-list')
          break
        case 'information':
          this.$emit('set-component', 'the-information')
          break
        case 'screens':
          this.$emit('set-component', 'screen-list')
          break
        case 'add screen':
          this.$emit('set-component', 'add-screen')
          break
        case 'trailer':
          this.$emit('set-component', 'the-trailer')
          break
      }
    }
  }
}
</script>
