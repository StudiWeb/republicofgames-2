<template>
  <alert-info v-if="!hasGameCover" :info="alertInfo"></alert-info>
  <div v-else class="d-flex flex-column">
    <TheFigure :title="gameTitle" :src="coverSource" />
    <button class="btn btn-primary align-self-start" @click="openDataModal">Delete cover</button>
  </div>

  <base-modal id="dataModal" title="Game cover">
    <template #body>
      <div class="d-flex justify-content-center">
        <TheFigure :title="gameTitle" :src="coverSource" />
      </div>
    </template>
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <div>Do you want to delete this cover?</div>
        <div class="d-flex">
          <button class="btn btn-primary me-2" @click="deleteImage">Yes</button>
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
import { storage } from '../../../firebase/'
import { ref, deleteObject } from 'firebase/storage'
import { database } from '../../../firebase/'
import { ref as dbRef, update } from 'firebase/database'

import AlertInfo from '../UI/AlertInfo.vue'
import TheFigure from '../UI/TheFigure.vue'
import BaseModal from '../UI/BaseModal.vue'

export default {
  components: {
    AlertInfo,
    TheFigure,
    BaseModal
  },

  emits: ['update-component'],

  data() {
    return {
      dataModal: false,
      serverResponseModal: null,
      serverResponse: ''
    }
  },

  props: ['game', 'cover'],

  computed: {
    gameId() {
      return this.game.id
    },

    gameTitle() {
      return this.game.title
    },

    hasGameCover() {
      return this.cover.hasGameCover
    },

    coverSource() {
      return this.cover.source
    },

    alertInfo() {
      return 'This game does not have a cover'
    }
  },

  methods: {
    async deleteImage() {
      this.closeDataModal()
      const coverRef = ref(storage, this.cover.storagePath)

      // Delete the file
      await deleteObject(coverRef)
        .then((data) => {
          // File deleted successfully
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        })

      await update(dbRef(database, 'games/' + this.gameId), {
        coverSource: ''
      })
        .then(() => {
          // Data saved successfully!
          this.serverResponse = 'You have deleted the game cover successfully.'
          this.openServerResponseModal()
        })
        .catch((error) => {
          // The write failed...
          this.serverResponse = 'Ups... something went wrong. You have not deleted the game cover.'
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
