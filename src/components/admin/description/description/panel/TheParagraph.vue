<template>
  <div
    v-if="hasValue"
    @mouseover="highlightParagraph"
    @mouseout="unhighlightParagraph"
    :id="paragraphId"
    class="d-flex flex-column p-2"
  >
    <div class="game-paragraph">{{ value }}</div>
    <button @click="cancelParagraph" class="btn btn-danger align-self-end mb-1">
      <i class="bi bi-x"></i>
    </button>
  </div>
  <div v-else class="d-flex flex-column bg-light mb-3 p-2">
    <div class="mb-3">
      <label class="form-label">Paragraph</label>
      <textarea v-model.trim="paragraph" class="form-control" rows="5"></textarea>
    </div>
    <div class="align-self-end">
      <button @click="confirmParagraph" class="btn btn-success me-1" ref="acceptParagraphButton">
        <i class="bi bi-check"></i>
      </button>
      <button @click="removeParagraph" class="btn btn-danger"><i class="bi bi-x"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['add-paragraph', 'delete-paragraph', 'remove-paragraph'],

  props: ['index', 'value'],

  data() {
    return {
      paragraph: ''
    }
  },

  computed: {
    paragraphId() {
      return 'paragraph-' + this.index
    },

    hasValue() {
      return this.value ? true : false
    }
  },

  watch: {
    paragraph(paragraph) {
      // if (paragraph !== '') {
      //   this.$refs.acceptParagraphButton.disabled = false
      // } else {
      //   this.$refs.acceptParagraphButton.disabled = true
      // }
    }
  },

  mounted() {
    // this.$refs.acceptParagraphButton.disabled = true
    if (this.value !== '') this.paragraph = this.value
  },

  methods: {
    confirmParagraph() {
      this.$emit('add-paragraph', this.index, this.paragraph)
    },

    cancelParagraph() {
      this.$emit('delete-paragraph', this.index, { component: 'the-paragraph', value: '' })
    },

    removeParagraph() {
      console.log(this.index)
      this.$emit('remove-paragraph', this.index)
    },

    highlightParagraph() {
      document.getElementById(this.paragraphId).classList.add('bg-light')
    },

    unhighlightParagraph() {
      document.getElementById(this.paragraphId).classList.remove('bg-light')
    }
  }
}
</script>
