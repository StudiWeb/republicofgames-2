<template>
  <PageSubtitle title="Delete game" />
  <div class="d-flex flex-column">
    <GamePanel
      :title="title"
      :developer="developer"
      :publisher="publisher"
      :genre="genre"
      :cover="cover"
      :introduction="introduction"
    />
    <button @click="openDataModal" class="btn btn-primary align-self-end">Delete game</button>
  </div>

  <UploadSpinner v-if="uploading" />

  <base-modal id="dataModal" title="New Game">
    <template #body>
      <div>Do you want to delete this game?</div>
    </template>
    <template #footer>
      <button class="btn btn-primary me-2" @click="deleteGame">Yes</button>
      <button class="btn btn-primary" @click="closeDataModal">No</button>
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
import { ref, set } from 'firebase/database'

import PageSubtitle from '../UI/PageSubtitle.vue'
import GamePanel from './GamePanel.vue'
import BaseModal from '../UI/BaseModal.vue'
import UploadSpinner from '../../reusable/UploadSpinner.vue'

export default {
  components: {
    PageSubtitle,
    GamePanel,
    BaseModal,
    UploadSpinner
  },

  props: ['gameId', 'game'],

  data() {
    return {
      releaseDateIds: [],
      screenIds: [],
      dataModal: false,
      serverResponseModal: null,
      serverResponse: '',
      uploading: false
    }
  },

  computed: {
    title() {
      return this.game.title
    },

    developer() {
      return this.game.developer
    },

    publisher() {
      return this.game.publisher
    },

    genre() {
      return this.game.genre
    },

    cover() {
      return this.game.cover
    },

    introduction() {
      return this.game.introduction
    }
  },

  methods: {
    deleteGame() {
      this.closeDataModal()
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
