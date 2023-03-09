<template>
  <PageSubtitle title="Add introduction" />
  <AlertInfo v-if="hasGameIntroduction" info="This game already has got an introduction." />
  <div v-else class="d-flex flex-column">
    <div class="mb-3">
      <label class="form-label">Introduction</label>
      <textarea
        v-model.trim="newIntroduction"
        id="introduction"
        class="form-control"
        placeholder="introduction ..."
        rows="5"
      ></textarea>
      <div class="invalid-feedback">This field cannot be empty</div>
    </div>
    <button @click="validateIntroduction" class="btn btn-primary align-self-end">
      Add introduction
    </button>
  </div>

  <UploadSpinner v-if="uploading" />

  <base-modal id="dataModal" title="Add introduction">
    <template #body>
      <p>{{ newIntroduction }}</p>
    </template>
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <div>Do you want to add this introduction to the game?</div>
        <div class="d-flex">
          <button class="btn btn-primary me-2" @click="addintroduction">Yes</button>
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
import { database } from '../../../../firebase'
import { ref, update } from 'firebase/database'

import PageSubtitle from '../../UI/PageSubtitle.vue'
import UploadSpinner from '../../../reusable/UploadSpinner.vue'
import BaseModal from '../../UI/BaseModal.vue'
import AlertInfo from '../../UI/AlertInfo.vue'

export default {
  components: {
    PageSubtitle,
    UploadSpinner,
    BaseModal,
    AlertInfo
  },

  emits: ['update-component'],

  props: ['gameId', 'introduction'],

  data() {
    return {
      newIntroduction: '',
      dataModal: null,
      serverResponseModal: null,
      serverResponse: '',
      uploading: false
    }
  },

  computed: {
    hasGameIntroduction() {
      return this.introduction !== '' ? true : false
    }
  },

  watch: {
    introduction(newIntroduction) {
      if (newIntroduction !== '') {
        document.getElementById('introduction').classList.remove('is-invalid')
      }
    }
  },

  methods: {
    validateIntroduction() {
      let validation = true

      if (this.newIntroduction === '') {
        validation = false
        document.getElementById('introduction').classList.add('is-invalid')
      }

      if (validation) {
        this.openDataModal()
      } else {
        this.openValidationModal()
      }
    },

    async addintroduction() {
      this.closeDataModal()
      this.uploading = true
      await update(ref(database, `games/${this.gameId}`), {
        introduction: this.newIntroduction
      })
        .then(() => {
          this.uploading = false
          // Data saved successfully!
          this.serverResponse = 'You added the introduction to the game successfully!'
          this.openServerResponseModal()
        })
        .catch((error) => {
          // The write failed...
          this.uploading = false
          this.serverResponse =
            'Ups something went wrong... you did not add the introduction to the game>!'
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
