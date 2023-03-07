<template>
  <div v-if="isAccepted" :id="paragraphId" class="d-flex flex-column p-2">
    <div class="game-paragraph">{{ paragraph }}</div>
    <button
      @click="toggleIsAccepted"
      @mouseover="highlightParagraph"
      @mouseout="unhighlightParagraph"
      class="btn btn-danger align-self-end mb-1"
    >
      <i class="bi bi-x"></i>
    </button>
  </div>
  <div v-else class="d-flex flex-column bg-light mb-3 p-2">
    <div class="mb-3">
      <label class="form-label">Paragraph</label>
      <textarea v-model.trim="paragraph" class="form-control" rows="5"></textarea>
    </div>
    <div class="align-self-end">
      <button @click="toggleIsAccepted" class="btn btn-success me-1" ref="acceptParagraphButton">
        <i class="bi bi-check"></i>
      </button>
      <button @click="removeParagraph" class="btn btn-danger"><i class="bi bi-x"></i></button>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['remove-paragraph'],

  props: ['index'],

  data() {
    return {
      isAccepted: false,
      paragraph: ''
    }
  },

  computed: {
    paragraphId() {
      return 'paragraph-' + this.index
    }
  },

  watch: {
    paragraph(paragraph) {
      if (paragraph !== '') {
        this.$refs.acceptParagraphButton.disabled = false
      } else {
        this.$refs.acceptParagraphButton.disabled = true
      }
    }
  },

  mounted() {
    this.$refs.acceptParagraphButton.disabled = true
  },

  methods: {
    removeParagraph() {
      this.$emit('remove-paragraph', this.index)
    },

    toggleIsAccepted() {
      this.isAccepted = !this.isAccepted
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
