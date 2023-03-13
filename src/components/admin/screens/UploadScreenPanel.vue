<template>
  <div class="d-flex flex-column bg-light p-3 rounded-3">
    <div class="d-flex justify-content-between align-items-center mb-3">
      <div class="d-flex mb-2">
        <div class="me-3"><span class="fw-bold"> name:</span> {{ screenName }}</div>
        <div class="me-3"><span class="fw-bold"> type:</span> {{ screenType }}</div>
        <div class="me-3"><span class="fw-bold"> size:</span> {{ screenSize }}</div>
      </div>
      <button @click="removePanel" class="btn btn-danger">
        <i class="bi bi-x"></i>
      </button>
    </div>
    <div class="progress mb-3">
      <div
        :id="progressId"
        class="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-label="Animated striped example"
        :aria-valuenow="progress"
        aria-valuemin="0"
        aria-valuemax="100"
        :style="progressWidth"
      >
        {{ progress }}%
      </div>
    </div>
    <div class="d-flex justify-content-between">
      <div>
        <div v-if="!validationType" class="validateFeedback">
          File must be of jpeg or webp type.
        </div>
        <div v-if="!validationName" class="validateFeedback">
          There is already a screen with this name.
        </div>
        <div v-if="!validationSize" class="validateFeedback">
          This file is too big. The size of the file cannot be grather than 10 MB (10485760 in
          bytes).
        </div>
      </div>
      <button @click="uploadScreen" class="btn btn-primary" ref="addScreenButton">
        Add screen
      </button>
    </div>
  </div>
</template>

<script>
//firebase storage
import { storage } from '../../../firebase'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
//firebase database
import { database } from '../../../firebase'
import { ref as dbRef, update } from 'firebase/database'

export default {
  emits: ['remove-panel'],

  props: ['screen', 'screens', 'gameId', 'gameTitle', 'index', 'validation'],

  data() {
    return {
      progress: 0
    }
  },

  computed: {
    screenName() {
      return this.screen.name
    },

    screenType() {
      return this.screen.type
    },

    screenSize() {
      return this.screen.size
    },

    progressWidth() {
      return 'width:' + this.progress + '%'
    },

    validationType() {
      return this.validation.type === 'valid' ? true : false
    },

    validationSize() {
      return this.validation.size === 'valid' ? true : false
    },

    validationName() {
      return this.validation.name === 'valid' ? true : false
    }
  },

  mounted() {
    if (!this.validationType) this.$refs.addScreenButton.disabled = true
    if (!this.validationSize) this.$refs.addScreenButton.disabled = true
    if (!this.validationName) this.$refs.addScreenButton.disabled = true
  },

  methods: {
    removePanel() {
      this.$emit('remove-panel', this.index)
    },

    uploadScreen() {
      // Upload file and metadata to the object 'screens/gameTitle/filename'
      const storagePath = `screens/${this.gameTitle}/${this.screenName}`
      const storageRef = ref(storage, storagePath)
      const uploadTask = uploadBytesResumable(storageRef, this.screen)

      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          this.progress = progress
          console.log('Upload is ' + progress + '% done')
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused')
              break
            case 'running':
              console.log('Upload is running')
              break
          }

          if (progress == 100) {
            this.$refs.addScreenButton.disabled = true
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
            this.screens.push({
              gameId: this.gameId,
              file: { name: this.screenName, type: this.screenType, size: this.screenSize },
              url: downloadURL
            })

            update(dbRef(database, `games/${this.gameId}`), {
              screens: this.screens
            })
              .then(() => {
                // Data saved successfully!
              })
              .catch((error) => {
                // The write failed...
              })
          })
        }
      )
    }
  }
}
</script>

<style scoped>
.validateFeedback {
  color: red;
}
</style>
