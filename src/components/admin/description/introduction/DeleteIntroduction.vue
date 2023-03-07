<template>
  <PageSubtitle title="Delete introduction" />
  <AlertInfo v-if="!hasIntroduction" :info="alertInfo" />
  <div v-else class="d-flex flex-column">
    <div class="card mb-3">
      <h5 class="card-header">Introduction</h5>
      <div class="card-body" v-html="introduction"></div>
    </div>
    <button @click="openDataModal" class="btn btn-primary align-self-end">
      Delete introduction
    </button>
  </div>

  <UploadSpinner v-if="uploading" />

  <base-modal id="dataModal" title="Release date">
    <template #body>
      <p v-html="introduction"></p>
    </template>
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <div>Do you want to delete this introduction?</div>
        <div class="d-flex">
          <button class="btn btn-primary me-2" @click="deleteIntroduction">Yes</button>
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

import AlertInfo from '../../UI/AlertInfo.vue'
import BaseModal from '../../UI/BaseModal.vue'
import UploadSpinner from '../../../reusable/UploadSpinner.vue'
import PageSubtitle from '../../UI/PageSubtitle.vue'

export default {
  components: {
    AlertInfo,
    BaseModal,
    UploadSpinner,
    PageSubtitle
  },

  props: ['gameId', 'introduction'],

  data() {
    return {
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

  methods: {
    async deleteIntroduction() {
      this.closeDataModal()
      this.uploading = true
      await update(ref(database, `games/${this.gameId}`), {
        introduction: ''
      })
        .then(() => {
          this.uploading = false
          // Data saved successfully!
          this.serverResponse = 'You deleted the introduction successfully!'
          this.openServerResponseModal()
        })
        .catch((error) => {
          // The write failed...
          this.uploading = false
          this.serverResponse = 'Ups something went wrong... you did not delete the introduction.'
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
