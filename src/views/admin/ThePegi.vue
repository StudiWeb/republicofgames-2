<template>
  <PageTitle title="PEGI" />
  <SelectGame @select-game="selectGame" />
  <div v-if="gameId !== 'none'">
    <LoadSpinner v-if="loading" />
    <div v-else class="d-flex flex-column">
      <div class="mb-4">
        <div class="h6 mb-3">Age rating</div>
        <div class="d-flex">
          <div class="form-check me-3">
            <input v-model="ageRating" class="form-check-input" type="radio" id="3" value="3" />
            <label class="form-check-label" for="3"> 3 </label>
          </div>
          <div class="form-check me-3">
            <input v-model="ageRating" class="form-check-input" type="radio" id="7" value="7" />
            <label class="form-check-label" for="7"> 7 </label>
          </div>
          <div class="form-check me-3">
            <input v-model="ageRating" class="form-check-input" type="radio" id="12" value="12" />
            <label class="form-check-label" for="12"> 12 </label>
          </div>
          <div class="form-check me-3">
            <input v-model="ageRating" class="form-check-input" type="radio" id="16" value="16" />
            <label class="form-check-label" for="16"> 16 </label>
          </div>
          <div class="form-check">
            <input v-model="ageRating" class="form-check-input" type="radio" id="18" value="18" />
            <label class="form-check-label" for="18"> 18 </label>
          </div>
        </div>
      </div>

      <div class="mb-4">
        <div class="h6 mb-3">Content descriptors</div>
        <div class="d-flex flex-wrap">
          <div class="form-check me-3 mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              value="violence"
              id="violence"
              v-model="contentDescriptors"
            />
            <label class="form-check-label" for="violence"> Violence </label>
          </div>
          <div class="form-check me-3 mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              value="bad-language"
              id="bad-language"
              v-model="contentDescriptors"
            />
            <label class="form-check-label" for="bad-language"> Bad language </label>
          </div>
          <div class="form-check me-3 mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              value="fear"
              id="fear"
              v-model="contentDescriptors"
            />
            <label class="form-check-label" for="fear"> Fear </label>
          </div>
          <div class="form-check me-3 mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              value="gambling"
              id="gambling"
              v-model="contentDescriptors"
            />
            <label class="form-check-label" for="gambling"> Gambling </label>
          </div>
          <div class="form-check me-3 mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              value="sex"
              id="sex"
              v-model="contentDescriptors"
            />
            <label class="form-check-label" for="sex"> Sex </label>
          </div>
          <div class="form-check me-3 mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              value="drugs"
              id="drugs"
              v-model="contentDescriptors"
            />
            <label class="form-check-label" for="drugs"> Drugs </label>
          </div>
          <div class="form-check me-3 mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              value="discrimination"
              id="discrimination"
              v-model="contentDescriptors"
            />
            <label class="form-check-label" for="discrimination"> Discrimination </label>
          </div>
          <div class="form-check me-3 mb-2">
            <input
              class="form-check-input"
              type="checkbox"
              value="in-game-purchases"
              id="in-game-purchases"
              v-model="contentDescriptors"
            />
            <label class="form-check-label" for="in-game-purchases"> In-Game Purchases </label>
          </div>
        </div>
      </div>

      <button @click="validateData" class="btn btn-primary align-self-end">Set PEGI</button>
    </div>
  </div>

  <UploadSpinner v-if="uploading" />

  <base-modal id="dataModal" title="PEGI">
    <template #body>
      <div class="row">
        <div class="col-4">
          <div class="fw-bold">Age rating</div>
          <div>{{ ageRating }}</div>
        </div>
        <div v-if="hasGameContentDescriptors" class="col-8">
          <div class="fw-bold">Content descriptors</div>
          <div>{{ contentDescriptors }}</div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <div>Do you want to add this PEGI to the game?</div>
        <div class="d-flex">
          <button class="btn btn-primary me-2" @click="setPegi">Yes</button>
          <button class="btn btn-primary" @click="closeDataModal">No</button>
        </div>
      </div>
    </template>
  </base-modal>

  <base-modal id="validationModal" title="Validation">
    <template #body> Please choose at least age rating for the game.</template>
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
//database
import { database } from '../../firebase'
import { ref, get, child, update } from 'firebase/database'
//componets used in template
import PageTitle from '../../components/admin/UI/PageTitle.vue'
import SelectGame from '../../components/admin/UI/SelectGame.vue'
import BaseModal from '../../components/admin/UI/BaseModal.vue'
import LoadSpinner from '../../components/reusable/LoadSpinner.vue'
import UploadSpinner from '../../components/reusable/UploadSpinner.vue'

export default {
  components: {
    PageTitle,
    SelectGame,
    BaseModal,
    LoadSpinner,
    UploadSpinner
  },

  data() {
    return {
      gameId: 'none',
      ageRating: '',
      contentDescriptors: [],
      dataModal: false,
      validationModal: false,
      serverResponseModal: null,
      serverResponse: '',
      loading: false,
      uploading: false
    }
  },

  computed: {
    hasGameContentDescriptors() {
      return this.contentDescriptors.length > 0 ? true : false
    }
  },

  watch: {
    async gameId(id) {
      if (id !== 'none') {
        this.loading = true
        await this.loadPegi(id)
        this.loading = false
      }
    }
  },

  methods: {
    selectGame(game) {
      this.gameId = game.id
    },

    async loadPegi(gameId) {
      await get(child(ref(database), `games/${gameId}/pegi`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.ageRating = snapshot.val()[0].ageRating
            this.contentDescriptors = snapshot.val()[1].contentDescriptors
          } else {
            console.log('No data available')
            this.ageRating = ''
            this.contentDescriptors = []
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },

    validateData() {
      let validation = true
      if (this.ageRating === '') {
        validation = false
      }

      if (validation) {
        this.openDataModal()
      } else {
        this.openValidationModal()
      }
    },

    setPegi() {
      this.closeDataModal()
      this.uploading = true
      update(ref(database, `games/${this.gameId}`), {
        pegi: [{ ageRating: this.ageRating }, { contentDescriptors: this.contentDescriptors }]
      })
        .then(() => {
          // Data saved successfully!
          this.uploading = false
          this.serverResponse = 'You added the pegi to the game successfully!'
          this.openServerResponseModal()
        })
        .catch((error) => {
          // The write failed...
          this.uploading = false
          this.serverResponse = 'Ups something went wrong... You did not add the pegi to the game.'
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
    }
  }
}
</script>

<style scoped>
.form-check-label:hover,
.form-check-input:hover {
  cursor: pointer;
}
</style>
