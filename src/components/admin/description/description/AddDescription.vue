<template>
  <PageSubtitle title="Add description" />
  <AlertInfo v-if="hasGameDescription" info="This game already has got a description." />
  <div v-else>
    <component
      v-for="(data, index) in components"
      :key="index"
      :is="data.component"
      :value="data.value"
      :index="index"
      @add-heading="addHeading"
      @delete-heading="deleteContent"
      @remove-heading="removeComponent"
      @add-paragraph="addParagraph"
      @delete-paragraph="deleteContent"
      @remove-paragraph="removeComponent"
    ></component>
    <div class="d-flex justify-content-between mt-3">
      <ContentPanel @insert-heading="insertHeading" @insert-description="insertDescription" />
      <button @click="validateDescription" class="btn btn-primary align-self-center">
        Add description
      </button>
    </div>
  </div>

  <UploadSpinner v-if="uploading" />

  <base-modal id="dataModal" title="Description">
    <template #body>
      <div v-for="(obj, index) in newDescription" :key="index">
        <div
          :class="{
            'game-heading': obj.type === 'heading',
            'game-paragraph': obj.type === 'paragraph'
          }"
        >
          {{ obj.value }}
        </div>
      </div>
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
import AlertInfo from '../../UI/AlertInfo.vue'
import ContentPanel from './panel/ContentPanel.vue'
//components
import TheHeading from './panel/TheHeading.vue'
import TheParagraph from './panel/TheParagraph.vue'

export default {
  components: {
    PageSubtitle,
    TheHeading,
    TheParagraph,
    BaseModal,
    UploadSpinner,
    AlertInfo,
    ContentPanel
  },

  emits: ['update-component'],

  props: ['gameId', 'description'],

  data() {
    return {
      components: [],
      newDescription: [],
      dataModal: null,
      validationModal: null,
      serverResponse: '',
      serverResponseModal: null,
      uploading: false
    }
  },

  computed: {
    hasGameDescription() {
      return this.description.length > 0 ? true : false
    }
  },

  methods: {
    insertHeading() {
      this.components.push({ component: 'the-heading', value: '' })
    },

    insertDescription() {
      this.components.push({ component: 'the-paragraph', value: '' })
    },

    addHeading(index, heading) {
      this.components.splice(index, 1, { component: 'the-heading', value: heading })
    },

    addParagraph(index, paragraph) {
      this.components.splice(index, 1, { component: 'the-paragraph', value: paragraph })
    },

    deleteContent(index, value) {
      this.components.splice(index, 1, value)
    },

    removeComponent(index) {
      console.log(this.components)
      this.components.splice(index, 1, { component: '', value: '' })
    },

    validateDescription() {
      let validation = false
      this.newDescription = []

      this.components.forEach((cmp) => {
        console.log(cmp)
        if (cmp.value !== '') {
          validation = true

          if (cmp.component === 'the-heading')
            this.newDescription.push({ type: 'heading', value: cmp.value })

          if (cmp.component === 'the-paragraph')
            this.newDescription.push({ type: 'paragraph', value: cmp.value })
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

      this.uploading = true
      await update(ref(database, `games/${this.gameId}`), {
        description: this.newDescription
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
