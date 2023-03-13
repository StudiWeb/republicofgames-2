<template>
  <div class="card mb-5">
    <img :src="screen.url" class="card-img-top" alt="..." />
    <div v-if="showBody" class="card-body">
      <div class="mb-2"><a :href="screen.url" target="_blank">See screen</a></div>
      <div class="mb-2"><span class="fw-bold">name: </span> {{ screen.file.name }}</div>
      <div class="mb-2"><span class="fw-bold">type: </span> {{ screen.file.type }}</div>
      <div class="mb-2"><span class="fw-bold">size: </span> {{ screen.file.size }}</div>
      <button @click="openDataModal" class="btn btn-danger w-100">Delete</button>
    </div>
    <button @click="toggleBody" class="btn btn-light">
      <i v-if="showBody" class="bi bi-caret-up-fill"></i>
      <i v-else class="bi bi-caret-down-fill"></i>
    </button>
  </div>

  <UploadSpinner v-if="uploading" />

  <base-modal :id="dataModalId" title="Delete screen">
    <template #body> Do you want to delete this screen? </template>
    <template #footer>
      <button class="btn btn-primary me-2" @click="deleteScreen">Yes</button>
      <button class="btn btn-primary" @click="closeDataModal">No</button>
    </template>
  </base-modal>

  <base-modal :id="serverResponseModalId" title="Server response">
    <template #body> {{ serverResponse }}</template>
    <template #footer>
      <button class="btn btn-primary" @click="closeServerResponseModal">Close</button>
    </template>
  </base-modal>
</template>

<script>
//database
import { database } from '../../../firebase'
import { ref as dbRef, update } from 'firebase/database'
//storage
import { storage } from '../../../firebase'
import { ref, deleteObject } from 'firebase/storage'
//components used in template
import BaseModal from '../UI/BaseModal.vue'
import UploadSpinner from '../../reusable/UploadSpinner.vue'

export default {
  components: {
    BaseModal,
    UploadSpinner
  },

  emits: ['update-screens'],

  props: ['index', 'screen', 'screens', 'gameTitle', 'gameId'],

  data() {
    return {
      showBody: false,
      dataModal: false,
      serverResponseModal: null,
      serverResponse: '',
      uploading: false
    }
  },

  computed: {
    screenId() {
      return this.screen.id
    },

    screenName() {
      return this.screen.file.name
    },

    dataModalId() {
      return 'dataModal-' + this.index
    },

    serverResponseModalId() {
      return 'serverResponseModal-' + this.index
    }
  },

  methods: {
    toggleBody() {
      this.showBody = !this.showBody
    },

    async deleteScreen() {
      this.closeDataModal()
      this.uploading = true

      // Create a reference to the file to delete with storage
      const screenPath = `screens/${this.gameTitle}/${this.screenName}`

      // Delete the file
      await deleteObject(ref(storage, screenPath))
        .then(() => {
          // File deleted successfully
          this.screens.splice(this.index, 1)
          update(dbRef(database, `games/${this.gameId}`), {
            screens: this.screens
          })
            .then(() => {
              // Data saved successfully!
              this.uploading = false
              this.serverResponse = 'You deleted the screen successfully!'
            })
            .catch((error) => {
              // The write failed...
              this.uploading = false
              this.serverResponse = 'Ups something went wrong... You did not delete the screen.'
            })
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
          this.uploading = false
          this.serverResponse = 'Ups something went wrong... You did not delete the screen.'
        })
    },

    openDataModal() {
      this.dataModal = new bootstrap.Modal(`#${this.dataModalId}`, {
        keyboard: false
      })
      this.dataModal.show()
    },

    closeDataModal() {
      this.dataModal.hide()
    },

    openServerResponseModal() {
      this.serverResponseModal = new bootstrap.Modal(`#${this.serverResponseModalId}`, {
        keyboard: false
      })
      this.serverResponseModal.show()
    },

    closeServerResponseModal() {
      this.serverResponseModal.hide()
      this.$parent.$emit('update-screens')
    }
  }
}
</script>
