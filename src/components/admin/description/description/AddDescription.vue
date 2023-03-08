<template>
  <PageSubtitle title="Add description" />
  <component
    v-for="(cmp, index) in components"
    :key="index"
    :is="cmp"
    :index="index"
    @add-heading="addHeading"
    @delete-heading="deleteContent"
    @remove-heading="removeComponent"
    @add-paragraph="addParagraph"
    @delete-paragraph="deleteContent"
    @remove-paragraph="removeComponent"
  ></component>
  <div class="d-flex justify-content-between mt-5">
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
    <button @click="validateDescription" class="btn btn-primary align-self-center">
      Add description
    </button>
  </div>

  <UploadSpinner v-if="uploading" />

  <base-modal id="dataModal" title="Game cover">
    <template #body>
      <div v-for="(text, index) in description" :key="index" v-html="text"></div>
    </template>
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <div>Do you want to add this description to the game?</div>
        <div class="d-flex">
          <button class="btn btn-primary me-2" @click="addDescription">Yes</button>
          <button class="btn btn-primary" @click="closeDataModal">No</button>
        </div>
      </div>
    </template>
  </base-modal>

  <base-modal id="validationModal" title="Validation">
    <template #body> Please add some description to the game.</template>
    <template #footer>
      <button class="btn btn-primary" @click="closeValidationModal">Close</button>
    </template>
  </base-modal>

  <base-modal id="serverResponseModal" title="Server response">
    <template #body> {{ serverResponse }}</template>
    <template #footer>
      <button class="btn btn-primary" @click="closeServerResponseModal">Close</button>
    </template>
  </base-modal>
</template>
<script>
import { database } from '../../../../firebase'
import { ref, update } from 'firebase/database'

import PageSubtitle from '../../UI/PageSubtitle.vue'
import BaseModal from '../../UI/BaseModal.vue'
import UploadSpinner from '../../../reusable/UploadSpinner.vue'

//components
import TheHeading from './panel/TheHeading.vue'
import TheDescription from './panel/TheDescription.vue'

export default {
  components: {
    PageSubtitle,
    TheHeading,
    TheDescription,
    BaseModal,
    UploadSpinner
  },

  emits: ['update-component'],

  props: ['gameId'],

  data() {
    return {
      showAddPanel: false,
      components: [],
      description: [],
      dataModal: null,
      validationModal: null,
      serverResponse: '',
      serverResponseModal: null,
      uploading: false
    }
  },

  methods: {
    toggleAddPanel() {
      this.showAddPanel = !this.showAddPanel
    },

    insertHeading() {
      this.components.push('the-heading')
      this.description.push('')
    },

    insertDescription() {
      this.components.push('the-description')
      this.description.push('')
    },

    addHeading(index, heading) {
      console.log('before adding heading:')
      console.log(this.description)
      console.log(`adding ${heading} at ${index}`)
      this.description.splice(index, 1, heading)
      console.log('after adding heading:')
      console.log(this.description)
    },

    addParagraph(index, paragraph) {
      console.log('before adding paragraph:')
      console.log(this.description)
      console.log(`adding ${paragraph} at ${index}`)
      this.description.splice(index, 1, paragraph)
      console.log('after adding paragraph:')
      console.log(this.description)
    },

    deleteContent(index) {
      console.log(`removing at ${index}`)
      this.description.splice(index, 1, '')
      console.log(this.description)
    },

    removeComponent(index) {
      delete this.components[index]
    },

    validateDescription() {
      let validation = false

      this.description.forEach((text) => {
        if (text !== '') {
          validation = true
        }
      })

      if (validation) {
        this.openDataModal()
      } else {
        this.openValidationModal()
      }
    },

    async addDescription() {
      this.closeDataModal()

      let description = []
      this.description.forEach((text) => {
        if (text !== '') {
          description.push(text)
        }
      })

      this.uploading = true
      await update(ref(database, `games/${this.gameId}`), {
        description: description
      })
        .then(() => {
          // Data saved successfully!
          this.uploading = false
          this.serverResponse = 'You added the description to the game successfully!'
          this.openServerResponseModal()
        })
        .catch((error) => {
          // The write failed...
          this.uploading = false
          this.serverResponse =
            'Ups... something went wrong. You did not add the description to the game.'
          this.openServerResponseModal()
        })
    },

    openDataModal() {
      this.dataModal = new bootstrap.Modal('#dataModal', {
        keyboard: false
      })
      this.dataModal.show()
    },

    closeDataModal() {
      this.dataModal.hide()
    },

    openValidationModal() {
      this.validationModal = new bootstrap.Modal('#validationModal', {
        keyboard: false
      })
      this.validationModal.show()
    },

    closeValidationModal() {
      this.validationModal.hide()
      // this.$emit('update-component')
    },

    openServerResponseModal() {
      this.serverResponseModal = new bootstrap.Modal('#serverResponseModal', {
        keyboard: false
      })
      this.serverResponseModal.show()
    },

    closeServerResponseModal() {
      this.serverResponseModal.hide()
      this.$emit('update-component')
    }
  }
}
</script>
