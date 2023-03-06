<template>
  <div class="d-flex flex-column">
    <PageSubtitle title="Add release date" />
    <release-date-panel @release-date="setData"></release-date-panel>
    <button class="btn btn-primary align-self-end" @click="validateData">Add release date</button>
  </div>

  <base-modal id="dataModal" title="Release date">
    <template #body> <ReleaseDateBadge :date="date" :platforms="platforms" /> </template>
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <div>Do you want to add this release date to the game?</div>
        <div class="d-flex">
          <button class="btn btn-primary me-2" @click="addReleaseDate">Yes</button>
          <button class="btn btn-primary" @click="closeDataModal">No</button>
        </div>
      </div>
    </template>
  </base-modal>

  <base-modal id="validationModal" title="Validation">
    <template #body>
      Please make sure you have entered a release date and marked a platform.</template
    >
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
import { database } from '../../../firebase'
import { ref, push } from 'firebase/database'

import ReleaseDatePanel from './ReleaseDatePanel.vue'
import ReleaseDateBadge from '../../reusable/ReleaseDateBadge.vue'
import BaseModal from '../UI/BaseModal.vue'
import PageSubtitle from '../UI/PageSubtitle.vue'

export default {
  components: { ReleaseDatePanel, ReleaseDateBadge, BaseModal, PageSubtitle },

  emits: ['update-component'],

  props: ['game'],

  data() {
    return {
      date: '',
      platforms: [],
      dataModal: false,
      validationModal: false,
      serverResponseModal: null,
      serverResponse: ''
    }
  },

  computed: {
    gameId() {
      return this.game.id
    }
  },

  methods: {
    setData(data) {
      this.date = data.date
      this.platforms = data.platforms
    },

    validateData() {
      let validation = true
      if (this.date === '') {
        validation = false
      }

      if (this.platforms.lenght === 0) {
        validation = false
      }

      if (validation) {
        this.openDataModal()
      } else {
        this.openValidationModal()
      }
    },

    async addReleaseDate() {
      this.closeDataModal()

      await push(ref(database, 'releaseDates'), {
        gameId: this.gameId,
        date: this.date,
        platforms: this.platforms
      })
        .then(() => {
          // Data saved successfully!
          this.serverResponse = 'You added a new release date to the game successfully!'
          this.openServerResponseModal()
        })
        .catch((error) => {
          // The write failed...
          this.serverResponse =
            'Ups something went wrong... you did not add the release date to the game>!'
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
