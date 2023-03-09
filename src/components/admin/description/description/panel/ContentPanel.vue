<template>
  <div class="d-flex">
    <button @click="toggleAddPanel" class="btn btn-secondary border-0 rounded-0">
      <i class="fs-2 bi bi-plus"></i>
    </button>
    <div v-if="showAddPanel">
      <button @click="insertHeading" class="btn btn-light border-0 rounded-0">
        <i class="fs-2 bi bi-card-heading"></i>
      </button>
      <button @click="insertDescription" class="btn btn-light border-0 rounded-0">
        <i class="fs-2 bi bi-card-text"></i>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['insert-heading', 'insert-description', 'validate-description'],

  data() {
    return {
      showAddPanel: false
    }
  },

  methods: {
    toggleAddPanel() {
      this.showAddPanel = !this.showAddPanel
    },

    insertHeading() {
      this.$emit('insert-heading')
    },

    insertDescription() {
      this.$emit('insert-description')
    }
  }
}
</script>
