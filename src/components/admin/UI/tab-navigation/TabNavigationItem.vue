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
      }
    }
  }
}
</script>
