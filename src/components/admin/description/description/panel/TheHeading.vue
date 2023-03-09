<template>
  <div
    v-if="hasValue"
    @mouseover="highlightHeading"
    @mouseout="unhighlightHeading"
    :id="headingId"
    class="d-flex flex-column p-2"
  >
    <div class="game-heading">
      {{ value }}
    </div>
    <button @click="cancelHeading" class="btn btn-danger align-self-end">
      <i class="bi bi-x"></i>
    </button>
  </div>
  <div v-else class="d-flex flex-column bg-light mb-3 p-2">
    <div class="mb-3">
      <label class="form-label">Heading</label>
      <input v-model.trim="heading" type="text" class="form-control" />
    </div>
    <div class="align-self-end">
      <button @click="confirmHeading" class="btn btn-success me-1" ref="acceptHeadingButton">
        <i class="bi bi-check"></i>
      </button>
      <button @click="removeHeading" class="btn btn-danger"><i class="bi bi-x"></i></button>
    </div>
  </div>
</template>

<script>
import ContentPanel from './ContentPanel.vue'

export default {
  components: {
    ContentPanel
  },

  emits: ['add-heading', 'delete-heading', 'remove-heading'],

  props: ['index', 'value'],

  data() {
    return {
      heading: ''
    }
  },

  computed: {
    headingId() {
      return 'heading-' + this.index
    },

    hasValue() {
      return this.value !== '' ? true : false
    }
  },

  // watch: {
  //   heading(heading) {
  //     if (heading !== '') {
  //       this.$refs.acceptHeadingButton.disabled = false
  //     } else {
  //       this.$refs.acceptHeadingButton.disabled = true
  //     }
  //   }
  // },

  mounted() {
    //this.$refs.acceptHeadingButton.disabled = true
    if (this.value !== '') this.heading = this.value
  },

  methods: {
    confirmHeading() {
      this.$emit('add-heading', this.index, this.heading)
    },

    cancelHeading() {
      this.$emit('delete-heading', this.index, { component: 'the-heading', value: '' })
    },

    removeHeading() {
      console.log(this.index)
      this.$emit('remove-heading', this.index)
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
