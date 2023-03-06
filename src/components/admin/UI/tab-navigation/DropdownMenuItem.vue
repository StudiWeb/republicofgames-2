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
        case 'add cover':
          this.$emit('set-component', 'add-cover')
          break
        case 'edit cover':
          this.$emit('set-component', 'add-cover')
          break
        case 'delete cover':
          this.$emit('set-component', 'delete-cover')
          break
      }
    }
  }
}
</script>
