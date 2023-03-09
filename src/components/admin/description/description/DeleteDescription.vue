<template>
  <AlertInfo v-if="!hasGameDescription" info="This game does not have a description." />
  <div v-else class="d-flex flex-column">
    <ShowDescription class="mb-3" :description="description" />
    <button @click="openDataModal" class="btn btn-primary align-self-end">
      Delete description
    </button>
  </div>

  <UploadSpinner v-if="uploading" />

  <base-modal id="dataModal" title="Description">
    <template #body>
      <div>Do you want to delete this description?</div>
    </template>
    <template #footer>
      <button class="btn btn-primary me-2" @click="deleteDescription">Yes</button>
      <button class="btn btn-primary" @click="closeDataModal">No</button>
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
//database
import { database } from '../../../../firebase'
import { ref, set } from 'firebase/database'
//components used in template
import ShowDescription from './ShowDescription.vue'
import AlertInfo from '../../UI/AlertInfo.vue'
import BaseModal from '../../UI/BaseModal.vue'
import UploadSpinner from '../../../reusable/UploadSpinner.vue'

export default {
  components: {
    ShowDescription,
    AlertInfo,
    BaseModal,
    UploadSpinner
  },

  props: ['gameId', 'description'],

  data() {
    return {
      dataModal: null,
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
    deleteDescription() {
      this.closeDataModal()
      this.uploading = true
      set(ref(database, `games/${this.gameId}/description`), null)
        .then(() => {
          // Data saved successfully!
          this.uploading = false
          this.serverResponse = 'You deleted the description successfully!'
          this.openServerResponseModal()
        })
        .catch((error) => {
          // The write failed...
          this.uploading = false
          this.serverResponse = 'Ups something went wrong... You did not delete the description.'
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
