<template>
  <li>
    <a @click="setComponent" class="dropdown-item" href="#">{{ title }}</a>
  </li>
</template>

<script>
export default {
  emits: ['set-component'],

  props: ['title'],

  methods: {
    setComponent() {
      switch (this.title.toLowerCase()) {
        //COVER
        case 'add cover':
          this.$emit('set-component', 'add-cover')
          break
        case 'edit cover':
          this.$emit('set-component', 'add-cover')
          break
        case 'delete cover':
          this.$emit('set-component', 'delete-cover')
          break
        //RELEASE DATE
        case 'add release date':
          this.$emit('set-component', 'add-release-date')
          break
        case 'delete release date':
          this.$emit('set-component', 'delete-release-date')
          break
      }
    }
  }
}
</script>
