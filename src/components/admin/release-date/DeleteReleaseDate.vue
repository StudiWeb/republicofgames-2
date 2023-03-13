<template>
  <PageSubtitle title="Delete release date" />
  <AlertInfo v-if="!hasGameReleaseDate" :info="alertInfo" />
  <div v-else>
    <SelectReleaseDate @date-index="setReleaseDateIndex" :releaseDates="releaseDates" />
    <div v-if="releaseDateIndex" class="d-flex flex-column">
      <ReleaseDateBadge class="align-self-start mb-4" :date="releaseDate" :platforms="platforms" />
      <button @click="openDataModal" class="btn btn-primary align-self-start">
        Delete release date
      </button>
    </div>
  </div>

  <UploadSpinner v-if="uploading" />

  <base-modal id="dataModal" title="Release date">
    <template #body> <ReleaseDateBadge :date="releaseDate" :platforms="platforms" /> </template>
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <div>Do you want to delete this release date?</div>
        <div class="d-flex">
          <button class="btn btn-primary me-2" @click="deleteReleaseDate">Yes</button>
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
import SelectReleaseDate from './SelectReleaseDate.vue'
import ReleaseDateBadge from '../../reusable/ReleaseDateBadge.vue'
import BaseModal from '../UI/BaseModal.vue'
import AlertInfo from '../UI/AlertInfo.vue'
import UploadSpinner from '../../reusable/UploadSpinner.vue'

export default {
  components: {
    PageSubtitle,
    SelectReleaseDate,
    ReleaseDateBadge,
    BaseModal,
    AlertInfo,
    UploadSpinner
  },

  emits: ['update-component'],

  props: ['game', 'releaseDates'],

  data() {
    return {
      releaseDateIndex: null,
      dataModal: false,
      serverResponseModal: null,
      serverResponse: '',
      uploading: false
    }
  },

  computed: {
    gameId() {
      return this.game.id
    },

    releaseDate() {
      const releaseDate = this.releaseDates[this.releaseDateIndex]
      return releaseDate ? releaseDate.date : ''
    },

    platforms() {
      const releaseDate = this.releaseDates[this.releaseDateIndex]
      return releaseDate ? releaseDate.platforms : []
    },

    hasGameReleaseDate() {
      return this.releaseDates.length > 0 ? true : false
    },

    alertInfo() {
      return 'This game does not have an added release date.'
    }
  },

  methods: {
    setReleaseDateIndex(index) {
      this.releaseDateIndex = index
    },

    async deleteReleaseDate() {
      this.closeDataModal()
      this.releaseDates.splice(this.releaseDateIndex, 1)

      this.uploading = true
      await update(ref(database, `games/${this.gameId}`), {
        releaseDates: this.releaseDates
      })
        .then(() => {
          // Data saved successfully!
          this.uploading = false
          this.serverResponse = 'You deleted the release date successfully.'
          this.openServerResponseModal()
        })
        .catch((error) => {
          // The write failed...
          this.uploading = false
          this.serverResponse = 'Ups something went wrong ... You did not delete the release date.'
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
