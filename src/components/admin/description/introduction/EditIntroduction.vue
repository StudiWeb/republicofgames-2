<template>
  <PageSubtitle title="Edit introduction" />
  <AlertInfo v-if="!hasIntroduction" :info="alertInfo" />
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
      Edit introduction
    </button>
  </div>

  <UploadSpinner v-if="uploading" />

  <base-modal id="dataModal" title="Release date">
    <template #body>
      <p v-html="htmlIntroduction"></p>
    </template>
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <div>Do you want to edit this introduction?</div>
        <div class="d-flex">
          <button class="btn btn-primary me-2" @click="editintroduction">Yes</button>
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
import AlertInfo from '../../UI/AlertInfo.vue'
import UploadSpinner from '../../../reusable/UploadSpinner.vue'
import BaseModal from '../../UI/BaseModal.vue'

export default {
  components: {
    PageSubtitle,
    AlertInfo,
    UploadSpinner,
    BaseModal
  },

  emits: ['update-component'],

  props: ['gameId', 'introduction'],

  data() {
    return {
      newIntroduction: '',
      htmlIntroduction: '',
      dataModal: null,
      serverResponseModal: null,
      serverResponse: '',
      uploading: false
    }
  },

  computed: {
    hasIntroduction() {
      return this.introduction !== '' ? true : false
    },

    alertInfo() {
      return 'This game does not have an introduction'
    }
  },

  created() {
    this.hasIntroduction ? (this.newIntroduction = this.introduction) : ''
  },

  watch: {
    newIntroduction(introduction) {
      if (introduction !== '') {
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
      } else {
        this.htmlIntroduction = '<p class="game-paragraph">' + this.newIntroduction + '</p>'
      }

      if (validation) {
        this.openDataModal()
      } else {
        this.openValidationModal()
      }
    },

    async editintroduction() {
      this.closeDataModal()
      this.uploading = true
      await update(ref(database, `games/${this.gameId}`), {
        introduction: this.htmlIntroduction
      })
        .then(() => {
          this.uploading = false
          // Data saved successfully!
          this.serverResponse = 'You added the introduction date to the game successfully!'
          this.openServerResponseModal()
        })
        .catch((error) => {
          // The write failed...
          this.uploading = false
          this.serverResponse =
            'Ups something went wrong... you did not add the introduction date to the game>!'
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
