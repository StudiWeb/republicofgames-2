<template>
  <div
    v-if="isAccepted"
    @mouseover="highlightHeading"
    @mouseout="unhighlightHeading"
    :id="headingId"
    class="d-flex flex-column p-2"
  >
    <div class="game-heading">
      {{ heading }}
    </div>
    <button @click="toggleIsAccepted" class="btn btn-danger align-self-end">
      <i class="bi bi-x"></i>
    </button>
  </div>
  <div v-else class="d-flex flex-column bg-light mb-3 p-2">
    <div class="mb-3">
      <label class="form-label">Heading</label>
      <input v-model.trim="heading" type="text" class="form-control" />
    </div>
    <div class="align-self-end">
      <button @click="toggleIsAccepted" class="btn btn-success me-1" ref="acceptHeadingButton">
        <i class="bi bi-check"></i>
      </button>
      <button @click="removeHeading" class="btn btn-danger"><i class="bi bi-x"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['add-heading', 'delete-heading', 'remove-heading'],

  props: ['index'],

  data() {
    return {
      isAccepted: false,
      heading: ''
    }
  },

  computed: {
    headingId() {
      return 'heading-' + this.index
    }
  },

  watch: {
    heading(heading) {
      if (heading !== '') {
        this.$refs.acceptHeadingButton.disabled = false
      } else {
        this.$refs.acceptHeadingButton.disabled = true
      }
    },

    isAccepted(accepted) {
      if (accepted === true) {
        const heading = `<h4 class="game-heading">${this.heading}</h4>`
        this.$emit('add-heading', this.index, heading)
      } else {
        this.$emit('delete-heading', this.index)
      }
    }
  },

  mounted() {
    this.$refs.acceptHeadingButton.disabled = true
  },

  methods: {
    removeHeading() {
      this.$emit('remove-heading', this.index)
    },

    toggleIsAccepted() {
      this.isAccepted = !this.isAccepted
    },

    highlightHeading() {
      document.getElementById(this.headingId).classList.add('bg-light')
    },

    unhighlightHeading() {
      document.getElementById(this.headingId).classList.remove('bg-light')
    }
  }
}
</script>
