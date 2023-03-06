<template>
  <PageSubtitle :title="pageSubtitle" />
  <div class="d-flex flex-column">
    <div class="mb-3">
      <label for="cover" class="form-label">Game cover</label>
      <input @change="setImage" type="file" class="form-control" id="image" />
      <div v-if="incorrectImageType" class="invalid-feedback">
        Please upload an image that is a webp or jpeg of type.
      </div>
    </div>
    <load-image :value="progressBarValue"></load-image>
    <button class="btn btn-primary align-self-end" ref="addCoverButton" @click="openDataModal">
      {{ pageSubtitle }}
    </button>
  </div>

  <base-modal id="dataModal" title="Game cover">
    <template #body>
      {{ imageName }}
    </template>
    <template #footer>
      <div class="d-flex justify-content-between align-items-center w-100">
        <div>{{ dataModalAskMessage }}</div>
        <div class="d-flex">
          <button class="btn btn-primary me-2" @click="uploadImage">Yes</button>
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
import { ref, uploadBytesResumable, getDownloadURL, deleteObject } from 'firebase/storage'
import { database } from '../../../firebase/'
import { ref as dbRef, update } from 'firebase/database'

import PageSubtitle from '../UI/PageSubtitle.vue'
import LoadImage from '../UI/LoadImage.vue'
import BaseModal from '../UI/BaseModal.vue'

export default {
  components: {
    PageSubtitle,
    LoadImage,
    BaseModal
  },

  emits: ['update-component'],

  props: ['game', 'cover'],

  data() {
    return {
      image: null,
      incorrectImageType: false,
      dataModal: false,
      serverResponseModal: null,
      serverResponse: '',
      uploading: false,
      progressBarValue: 0
    }
  },

  computed: {
    pageSubtitle() {
      if (this.cover) {
        return this.cover.hasGameCover ? 'Edit cover' : 'Add cover'
      }
    },

    dataModalAskMessage() {
      if (this.cover) {
        return this.cover.hasGameCover
          ? 'Dou you want to edit this cover?'
          : 'Dou you want to add this cover?'
      }
    },

    gameId() {
      return this.game.id
    },

    gameTitle() {
      return this.game.title
    },

    imageName() {
      return this.image ? this.image.name : ''
    },

    hasGameCover() {
      if (this.cover) {
        return this.cover.hasGameCover ? true : false
      } else {
        return false
      }
    }
  },

  mounted() {
    this.$refs.addCoverButton.disabled = true
  },

  methods: {
    setImage(e) {
      const file = e.target.files[0]
      this.incorrectImageType = false
      if (file) {
        if (file.type === 'image/jpeg' || file.type === 'image/webp') {
          this.image = e.target.files[0]
          document.getElementById('image').classList.remove('is-invalid')
          document.getElementById('image').classList.add('is-valid')
          this.$refs.addCoverButton.disabled = false
        } else {
          this.$refs.addCoverButton.disabled = true
          this.incorrectImageType = true
          document.getElementById('image').classList.remove('is-valid')
          document.getElementById('image').classList.add('is-invalid')
          this.image = null
        }
      } else {
        this.$refs.addCoverButton.disabled = true
        document.getElementById('image').classList.remove('is-valid')
        document.getElementById('image').classList.add('is-invalid')
        this.image = null
      }
    },

    async deleteImage() {
      const coverRef = ref(storage, this.cover.storagePath)

      // Delete the file
      await deleteObject(coverRef)
        .then((data) => {
          // File deleted successfully
        })
        .catch((error) => {
          // Uh-oh, an error occurred!
        })
    },

    addImage() {
      const imagePath = `covers/${this.gameTitle.toLowerCase()}/${this.imageName}`

      // Upload file to the object 'images/mountains.jpg'
      const storageRef = ref(storage, imagePath)
      const uploadTask = uploadBytesResumable(storageRef, this.image)

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          this.progressBarValue = progress
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }
        },
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break
            case 'storage/canceled':
              // User canceled the upload
              break

            // ...
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break
          }
        },
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL)
            this.addImageSource(this.gameId, downloadURL)
          })
        }
      )
    },

    async addImageSource(gameId, source) {
      await update(dbRef(database, 'games/' + gameId), {
        coverSource: source
      })
        .then(() => {
          // Data saved successfully!
          this.hasGameCover
            ? (this.serverResponse = 'You have edited game cover successfully!')
            : (this.serverResponse = 'You have added game cover successfully!')
          this.openServerResponseModal()
        })
        .catch((error) => {
          // The write failed...
          this.openServerResponseModal()
        })
    },

    async uploadImage() {
      this.closeDataModal()
      if (this.cover.hasGameCover) {
        await this.deleteImage()
        this.addImage()
      } else {
        this.addImage()
      }
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
