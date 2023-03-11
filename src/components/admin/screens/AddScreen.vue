<template>
  <PageSubtitle title="Add screen" />
  <div class="d-flex flex-column mb-4">
    <div>
      <label for="formFile" class="form-label">Choose screen</label>
      <input @change="setScreens" class="form-control" type="file" id="formFile" multiple />
    </div>
  </div>
  <component
    class="mb-3"
    v-for="(data, index) in files"
    :key="index"
    :screen="data.screen"
    :validation="data.validation"
    :gameId="gameId"
    :gameTitle="gameTitle"
    :index="index"
    @remove-panel="removeScreen"
    :is="data.component"
  ></component>
</template>
<script>
import PageSubtitle from '../UI/PageSubtitle.vue'
import UploadScreenPanel from './UploadScreenPanel.vue'

export default {
  components: {
    PageSubtitle,
    UploadScreenPanel
  },

  props: ['game', 'screens'],

  data() {
    return {
      files: []
    }
  },

  computed: {
    gameId() {
      return this.game.id
    },

    gameTitle() {
      return this.game.title
    },

    screenNames() {
      let names = []
      this.screens.forEach((s) => {
        names.push(s.file.name)
      })
      return names
    }
  },

  methods: {
    setScreens(event) {
      this.files = []
      const files = event.target.files

      for (let i = 0; i < files.length; i++) {
        this.files.push({
          component: 'upload-screen-panel',
          screen: files[i],
          validation: this.validateFile(files[i])
        })
      }
    },

    validateFile(file) {
      let validation = {}
      if (file.type !== 'image/jpeg' && file.type !== 'image/webp') {
        validation['type'] = 'invalid'
      } else {
        validation['type'] = 'valid'
      }

      if (file.size > '10485760') {
        validation['size'] = 'invalid'
      } else {
        validation['size'] = 'valid'
      }

      if (this.screenNames.find((name) => name === file.name)) {
        validation['name'] = 'invalid'
      } else {
        validation['name'] = 'valid'
      }

      return validation
    },

    removeScreen(index) {
      this.files.splice(index, 1, '')
    }
  }
}
</script>
