<template>
  <PageTitle title="New game" />
  <div class="d-flex flex-column">
    <div class="mb-3">
      <label class="form-label">Title <span class="text-danger">*</span></label>
      <input v-model.trim="title" type="text" ref="title" class="form-control" />
      <div class="invalid-feedback" v-if="!gameExists">This field cannot be empty.</div>
      <div class="invalid-feedback" v-if="gameExists">This game is already added to the app.</div>
    </div>
    <div class="mb-3">
      <label class="form-label">Developer <span class="text-danger">*</span></label>
      <input v-model.trim="developer" type="text" ref="developer" class="form-control" />
      <div class="invalid-feedback">This field cannot be empty.</div>
    </div>
    <div class="mb-3">
      <label class="form-label">Publisher <span class="text-danger">*</span></label>
      <input v-model.trim="publisher" type="text" ref="publisher" class="form-control" />
      <div class="invalid-feedback">This field cannot be empty.</div>
    </div>

    <div class="mb-5">
      <label class="form-label">Genre <span class="text-danger">*</span></label>
      <select v-model.trim="genre" ref="genre" class="form-select">
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

    <button @click="validateForm" class="btn btn-primary align-self-end">Add game</button>
  </div>

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
        <div>Do you want to add this game?</div>
        <div class="d-flex">
          <button class="btn btn-primary me-2" @click="addGame">Yes</button>
          <button class="btn btn-primary" @click="closeDataModal">No</button>
        </div>
      </div>
    </template>
  </base-modal>

  <base-modal id="validationModal" title="Validation">
    <template #body> Please fill the form up correctly. </template>
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
import { ref, push } from 'firebase/database'

import PageTitle from '../../components/admin/UI/PageTitle.vue'
import BaseModal from '../../components/admin/UI/BaseModal.vue'
import UploadSpinner from '../../components/reusable/UploadSpinner.vue'

export default {
  components: {
    PageTitle,
    BaseModal,
    UploadSpinner
  },

  data() {
    return {
      title: '',
      developer: '',
      publisher: '',
      genre: 'none',
      gameExists: false,
      dataModal: false,
      validationModal: null,
      serverResponseModal: null,
      serverResponse: '',
      uploading: false
    }
  },

  watch: {
    title(title) {
      if (title !== '') {
        this.$refs.title.classList.remove('is-invalid')
      }
    },

    developer(developer) {
      if (developer !== '') {
        this.$refs.developer.classList.remove('is-invalid')
      }
    },

    publisher(publisher) {
      if (publisher !== '') {
        this.$refs.publisher.classList.remove('is-invalid')
      }
    },

    genre(genre) {
      if (genre !== 'none') {
        this.$refs.genre.classList.remove('is-invalid')
      }
    }
  },

  methods: {
    resetForm() {
      this.title = ''
      this.developer = ''
      this.publisher = ''
      this.genre = ''
    },

    validateForm() {
      let validation = true
      const usedTitles = this.$store.getters['games/gameTitles']

      if (this.title === '') {
        validation = false
        this.$refs.title.classList.add('is-invalid')
      }

      if (usedTitles.find((t) => t === this.title)) {
        validation = false
        this.gameExists = true
        this.$refs.title.classList.add('is-invalid')
      } else {
        this.gameExists = false
      }

      if (this.developer === '') {
        validation = false
        this.$refs.developer.classList.add('is-invalid')
      }

      if (this.publisher === '') {
        validation = false
        this.$refs.publisher.classList.add('is-invalid')
      }

      if (this.genre === 'none') {
        validation = false
        this.$refs.genre.classList.add('is-invalid')
      }

      validation ? this.openDataModal() : this.openValidationModal()
    },

    async addGame() {
      this.closeDataModal()
      this.uploading = true

      let game = {
        createdBy: 'admin',
        title: this.title,
        developer: this.developer,
        publisher: this.publisher,
        genre: this.genre
      }

      push(ref(database, 'games'), game)
        .then((data) => {
          // Data saved successfully!
          const storeData = { id: data._path.pieces_[1], title: this.title }
          this.$store.dispatch('games/addNewGame', storeData)
          this.serverResponse = `You have just saved ${this.title} successfully!`
          this.openServerResponseModal()
          this.resetForm()
          this.uploading = false
        })
        .catch((error) => {
          // The write failed...
          throw new Error('The write data failed')
          this.serverResponse = `Something went wrong... ${this.title} has not been saved.`
          this.openServerResponseModal()
          this.resetForm()
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
