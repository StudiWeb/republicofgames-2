<template>
  <PageSubtitle title="Add trailer" />
  <div class="d-flex flex-column">
    <div class="mb-3">
      <label for="trailer" class="form-label">Trailer</label>
      <input v-model.trim="newTrailer" type="text" class="form-control" id="trailer" />
      <div class="form-text">
        Remeber that trailer must be an iframe element comming from YouTube.com
      </div>
      <div class="invalid-feedback">Please enter an iframe element comming from YouTube.com</div>
    </div>
    <button @click="validateTrailer" class="btn btn-primary align-self-end">Add trailer</button>
  </div>

  <UploadSpinner v-if="uploading" />

  <base-modal id="dataModal" title="Trailer">
    <template #body>
      <div class="ratio ratio-16x9" v-html="newTrailer"></div>
    </template>
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <div>Do you want to add this trailer to the game?</div>
        <div class="d-flex">
          <button class="btn btn-primary me-2" @click="addTrailer">Yes</button>
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
import { ref, update } from 'firebase/database'

import PageSubtitle from '../UI/PageSubtitle.vue'
import BaseModal from '../UI/BaseModal.vue'
import UploadSpinner from '../../reusable/UploadSpinner.vue'

export default {
  components: {
    PageSubtitle,
    BaseModal,
    UploadSpinner
  },

  emits: ['update-component'],

  props: ['gameId', 'trailer'],

  data() {
    return {
      newTrailer: '',
      dataModal: false,
      serverResponseModal: null,
      serverResponse: '',
      uploading: false,
      loading: false
    }
  },

  computed: {
    hasGameTrailer() {
      return this.trailer !== '' ? true : false
    }
  },

  watch: {
    newTrailer(trailer) {
      if (trailer !== '') document.getElementById('trailer').classList.remove('is-invalid')
    }
  },

  methods: {
    validateTrailer() {
      let validation = true
      if (this.newTrailer === '') validation = false

      if (validation) {
        this.openDataModal()
      } else {
        document.getElementById('trailer').classList.add('is-invalid')
      }
    },

    async addTrailer() {
      this.closeDataModal()
      this.uploading = true
      await update(ref(database, `games/${this.gameId}`), {
        trailer: this.newTrailer
      })
        .then(() => {
          // Data saved successfully!
          this.uploading = false
          this.serverResponse = 'You added the trailer to the game successfully!'
          this.openServerResponseModal()
        })
        .catch((error) => {
          // The write failed...
          this.uploading = false
          this.serverResponse = 'Ups something went wrong... You did not add the trailer.'
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
