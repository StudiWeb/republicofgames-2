<template>
  <PageTitle title="System requirements" />
  <SelectGame @select-game="selectGame" />

  <load-spinner v-if="loading"></load-spinner>
  <div v-else>
    <div v-if="gameId !== 'none'" class="d-flex flex-column">
      <alert-info>
        <template #default>
          <div class="d-flex flex-column">
            <p>Here you are an example of data.</p>
            <p>
              Intel Core i7-8700 3.2 GHz / AMD Ryzen 5 3600 3.6 GHz 16 GB RAM graphic card 8 GB
              GeForce GTX 1080 Ti / Radeon RX 5700 XT or better 85 GB SSD Windows 10 64-bit
            </p>
          </div>
        </template>
      </alert-info>
      <div class="mb-3">
        <label class="form-label">Minimum requirements </label>
        <textarea
          v-model.trim="minimum"
          id="minimum"
          class="form-control"
          rows="3"
          placeholder="minimum requirements ..."
        ></textarea>
      </div>
      <div class="mb-3">
        <label class="form-label">Recommended requirements</label>
        <textarea
          v-model.trim="recommended"
          class="form-control"
          rows="3"
          placeholder="recommended requirements ..."
        ></textarea>
      </div>
      <div class="mb-5">
        <label class="form-label">Ultra requirements</label>
        <textarea
          v-model.trim="ultra"
          class="form-control"
          rows="3"
          placeholder="ultra requirements ..."
        ></textarea>
      </div>
      <button class="btn btn-primary align-self-end" @click="validateForm">
        {{ buttonTitle }}
      </button>
    </div>
  </div>

  <base-modal id="dataModal" title="New Game">
    <template #body>
      <div v-if="minimum != ''">
        <div class="fw-bold">Minimum</div>
        <div>{{ minimum }}</div>
      </div>
      <div v-if="recommended != ''">
        <div class="fw-bold">Recommended</div>
        <div>{{ recommended }}</div>
      </div>
      <div v-if="ultra != ''">
        <div class="fw-bold">Ultra</div>
        <div>{{ ultra }}</div>
      </div>
    </template>
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <div class="px-1">{{ modalMessage }}</div>
        <div class="d-flex">
          <button class="btn btn-primary me-2" @click="addSystemRequirements">Yes</button>
          <button class="btn btn-primary" @click="closeDataModal">No</button>
        </div>
      </div>
    </template>
  </base-modal>

  <base-modal id="validationModal" title="Validation">
    <template #body> Fill up at least one system requirements. </template>
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

  <upload-spinner v-if="uploading"></upload-spinner>
</template>

<script>
import database from '../../firebase/database/database'
import { ref, get, child, update } from 'firebase/database'

import PageTitle from '../../components/admin/UI/PageTitle.vue'
import SelectGame from '../../components/admin/UI/SelectGame.vue'
import AlertInfo from '../../components/admin/UI/AlertInfo.vue'
import BaseModal from '../../components/admin/UI/BaseModal.vue'
import LoadSpinner from '../../components/reusable/LoadSpinner.vue'
import UploadSpinner from '../../components/reusable/UploadSpinner.vue'

export default {
  components: {
    PageTitle,
    SelectGame,
    AlertInfo,
    BaseModal,
    LoadSpinner,
    UploadSpinner
  },

  data() {
    return {
      game: null,
      gameId: 'none',
      minimum: '',
      recommended: '',
      ultra: '',
      hasGameRequirements: false,
      dataModal: false,
      validationModal: null,
      serverResponseModal: null,
      loading: false,
      uploading: false
    }
  },

  computed: {
    buttonTitle() {
      return this.hasGameRequirements ? 'Update system requirements' : 'Add system requirements'
    },

    modalMessage() {
      return this.hasGameRequirements
        ? 'Do you want to update this system requirements of the game?'
        : 'Do you want to add this system requirements to the game?'
    },

    serverResponse() {
      if (this.game) {
        return this.hasGameRequirements
          ? (this.serverResponse = `You have updated system requirements for ${this.game.title} successfully!`)
          : (this.serverResponse = `You have added system requirements for ${this.game.title} successfully!`)
      } else {
        return ''
      }
    }
  },

  methods: {
    async selectGame(game) {
      this.game = game
      this.gameId = game.id
      this.loading = true
      await this.checkIfGameHasRequirements(this.gameId)
      this.loading = false
    },

    async checkIfGameHasRequirements(gameId) {
      await get(child(ref(database), `games/${gameId}`))
        .then((snapshot) => {
          let minimum = ''
          let recommended = ''
          let ultra = ''

          if (snapshot.exists()) {
            minimum = snapshot.val().minimum ? snapshot.val().minimum : ''
            recommended = snapshot.val().recommended ? snapshot.val().recommended : ''
            ultra = snapshot.val().ultra ? snapshot.val().ultra : ''

            if (minimum !== '' || recommended !== '' || ultra !== '') {
              this.hasGameRequirements = true
              this.minimum = minimum
              this.recommended = recommended
              this.ultra = ultra
            } else {
              this.hasGameRequirements = false
              this.minimum = ''
              this.recommended = ''
              this.ultra = ''
            }
          } else {
            console.log('No data available')
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },

    validateForm() {
      if (this.minimum != '' || this.recommended != '' || this.ultra != '') {
        this.openDataModal()
      } else {
        this.openValidationModal()
      }
    },

    addSystemRequirements() {
      this.closeDataModal()
      this.uploading = true

      update(ref(database, 'games/' + this.gameId), {
        minimum: this.minimum,
        recommended: this.recommended,
        ultra: this.ultra
      })
        .then(() => {
          // Data saved successfully!
          this.uploading = false
          this.openServerResponseModal()
        })
        .catch((error) => {
          // The write failed...
          this.uploading = false
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
    }
  }
}
</script>
