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
        //DESCRIPTION
        case 'add introduction':
          this.$emit('set-component', 'add-introduction')
          break
        case 'edit introduction':
          this.$emit('set-component', 'edit-introduction')
          break
        case 'delete introduction':
          this.$emit('set-component', 'delete-introduction')
          break
        case 'add description':
          this.$emit('set-component', 'add-description')
          break
        case 'edit description':
          this.$emit('set-component', 'edit-description')
          break
        case 'delete description':
          this.$emit('set-component', 'delete-description')
          break
        //TRAILER
        case 'add trailer':
          this.$emit('set-component', 'add-trailer')
          break
        case 'edit trailer':
          this.$emit('set-component', 'edit-trailer')
          break
        case 'delete trailer':
          this.$emit('set-component', 'delete-trailer')
          break
      }
    }
  }
}
</script>
