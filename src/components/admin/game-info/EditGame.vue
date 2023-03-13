<template>
  <PageSubtitle title="Edit game" />
  <div class="d-flex flex-column">
    <div class="mb-3">
      <label class="form-label">Title <span class="text-danger">*</span></label>
      <input v-model.trim="title" type="text" id="title" class="form-control" />
      <div class="invalid-feedback" v-if="!gameExists">This field cannot be empty.</div>
      <div class="invalid-feedback" v-if="gameExists">This game is already added to the app.</div>
    </div>
    <div class="mb-3">
      <label class="form-label">Developer <span class="text-danger">*</span></label>
      <input v-model.trim="developer" type="text" id="developer" class="form-control" />
      <div class="invalid-feedback">This field cannot be empty.</div>
    </div>
    <div class="mb-3">
      <label class="form-label">Publisher <span class="text-danger">*</span></label>
      <input v-model.trim="publisher" type="text" id="publisher" class="form-control" />
      <div class="invalid-feedback">This field cannot be empty.</div>
    </div>

    <div class="mb-5">
      <label class="form-label">Genre <span class="text-danger">*</span></label>
      <select v-model.trim="genre" id="genre" class="form-select">
        <option value="none">none</option>
        <option value="action">Action</option>
        <option value="fighting">Fighting</option>
        <option value="puzzle">Puzzle</option>
        <option value="adventure">Adventure</option>
        <option value="rpg">RPG</option>
        <option value="sports">Sports</option>
        <option value="strategy">Strategy</option>
        <option value="simulation">Simulation</option>
        <option value="party">Party</option>
        <option value="racing">Racing</option>
        <option value="arcade">Arcade</option>
      </select>
      <div class="invalid-feedback">This field cannot be set to none.</div>
    </div>

    <button @click="validateData" class="btn btn-primary align-self-end">Edit data</button>
  </div>

  <UploadSpinner v-if="uploading" />

  <base-modal id="dataModal" title="New Game">
    <template #body>
      <div class="row mb-3">
        <div class="col-6">
          <div class="fw-bold">Title</div>
          <div>{{ title }}</div>
        </div>
        <div class="col-6">
          <div class="fw-bold">Developer</div>
          <div>{{ developer }}</div>
        </div>
      </div>
      <div class="row">
        <div class="col-6">
          <div class="fw-bold">Publisher</div>
          <div>{{ publisher }}</div>
        </div>
        <div class="col-6">
          <div class="fw-bold">Genre</div>
          <div>{{ genre }}</div>
        </div>
      </div>
    </template>
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <div>Do you want to edit this data?</div>
        <div class="d-flex">
          <button class="btn btn-primary me-2" @click="editData">Yes</button>
          <button class="btn btn-primary" @click="closeDataModal">No</button>
        </div>
      </div>
    </template>
  </base-modal>

  <base-modal id="validationModal" title="Validation">
    <template #body> Please fill the form correctly. </template>
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

  props: ['gameId', 'game'],

  data() {
    return {
      title: '',
      developer: '',
      publisher: '',
      genre: 'none',
      gameExists: false,
      dataModal: false,
      validationModal: false,
      serverResponseModal: null,
      serverResponse: '',
      uploading: false
    }
  },

  computed: {
    gameTitles() {
      return this.$store.getters['games/gameTitles'].filter((title) => title !== this.game.title)
    }
  },

  watch: {
    title(title) {
      if (title !== '') {
        this.gameExists = false
        document.getElementById('title').classList.remove('is-invalid')

        if (this.gameTitles.find((title) => title === this.title)) {
          this.gameExists = true
          document.getElementById('title').classList.add('is-invalid')
        }
      } else {
        document.getElementById('title').classList.add('is-invalid')
      }
    },

    developer(developer) {
      if (developer !== '') {
        document.getElementById('developer').classList.remove('is-invalid')
      } else {
        document.getElementById('developer').classList.add('is-invalid')
      }
    },

    publisher(publisher) {
      if (publisher !== '') {
        document.getElementById('publisher').classList.remove('is-invalid')
      } else {
        document.getElementById('publisher').classList.add('is-invalid')
      }
    },

    genre(genre) {
      if (genre !== 'none') {
        document.getElementById('genre').classList.remove('is-invalid')
      } else {
        document.getElementById('genre').classList.add('is-invalid')
      }
    }
  },

  mounted() {
    this.title = this.game.title
    this.developer = this.game.developer
    this.publisher = this.game.publisher
    this.genre = this.game.genre
  },

  methods: {
    validateData() {
      let validation = true

      if (this.title === '') validation = false

      if (this.developer === '') validation = false

      if (this.publisher === '') validation = false

      if (this.genre === 'none') validation = false

      if (this.gameTitles.find((title) => title === this.title)) validation = false

      if (validation) this.openDataModal()
      else this.openValidationModal()
    },

    editData() {
      this.closeDataModal()

      const data = {
        id: this.gameId,
        title: this.title,
        developer: this.developer,
        publisher: this.publisher,
        genre: this.genre
      }

      this.uploading = true
      update(ref(database, `games/${this.gameId}`), {
        title: this.title,
        developer: this.developer,
        publisher: this.publisher,
        genre: this.genre
      })
        .then(() => {
          // Data saved successfully!
          this.uploading = false
          this.$store.dispatch('games/updateGameData', data)
          this.serverResponse = `You edited the data successfully!`
          this.openServerResponseModal()
        })
        .catch((error) => {
          // The write failed...
          this.uploading = false
          this.serverResponse = 'Something went wrong... You did not edit the data.'
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
