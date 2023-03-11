<template>
  <AlertInfo v-if="!hasGameTrailer" info="This game does not have a trailer." />
  <div v-else>
    <div class="d-flex flex-column">
      <div class="ratio ratio-16x9 mb-3" v-html="trailer"></div>
      <button @click="openDataModal" class="btn btn-primary align-self-end">Delete trailer</button>
    </div>
  </div>

  <UploadSpinner v-if="uploading" />

  <base-modal id="dataModal" title="Trailer">
    <template #body>
      <div class="ratio ratio-16x9" v-html="trailer"></div>
    </template>
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <div>Do you want to delete this trailer ?</div>
        <div class="d-flex">
          <button class="btn btn-primary me-2" @click="deleteTrailer">Yes</button>
          <button class="btn btn-primary" @click="closeDataModal">No</button>
        </div>
      </div>
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
import { database } from '../../../firebase'
import { ref, set } from 'firebase/database'
import AlertInfo from '../UI/AlertInfo.vue'
import BaseModal from '../UI/BaseModal.vue'
import UploadSpinner from '../../reusable/UploadSpinner.vue'

export default {
  components: {
    AlertInfo,
    BaseModal,
    UploadSpinner
  },

  emits: ['update-component'],

  props: ['gameId', 'trailer'],

  data() {
    return {
      dataModal: false,
      serverResponseModal: null,
      serverResponse: '',
      uploading: false
    }
  },

  computed: {
    hasGameTrailer() {
      return this.trailer !== '' ? true : false
    }
  },

  methods: {
    deleteTrailer() {
      this.closeDataModal()
      this.uploading = true
      set(ref(database, `games/${this.gameId}/trailer`), null)
        .then(() => {
          // Data saved successfully!
          this.uploading = false
          this.serverResponse = 'You deleted the trailer successfully!'
          this.openServerResponseModal()
        })
        .catch((error) => {
          // The write failed...
          this.uploading = false
          this.serverResponse = 'Ups something went wrong... You did not delete the trailer.'
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
