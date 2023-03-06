<template>
  <load-spinner v-if="loading"></load-spinner>
  <div v-else>
    <alert-info v-if="!hasGameCover" :info="alertInfo"></alert-info>
    <TheFigure v-else :title="gameTitle" :src="coverSource" />
  </div>
</template>

<script>
import { storage } from '../../../firebase'
import { ref, listAll } from 'firebase/storage'
import { database } from '../../../firebase/index.js'
import { ref as dbRef, get, child } from 'firebase/database'

import TheFigure from '../UI/TheFigure.vue'
import LoadSpinner from '../../reusable/LoadSpinner.vue'
import AlertInfo from '../UI/AlertInfo.vue'

export default {
  components: {
    TheFigure,
    LoadSpinner,
    AlertInfo
  },

  emits: ['cover-info'],

  props: ['game'],

  data() {
    return {
      coverSource: '',
      coverStoragePath: '',
      hasGameCover: false,
      loading: false
    }
  },

  computed: {
    gameId() {
      return this.game.id
    },

    gameTitle() {
      return this.game.title
    },

    alertInfo() {
      return 'This game does not have a cover'
    }
  },

  async created() {
    this.loading = true
    await this.checkIfGameHasCover()
    if (this.hasGameCover) {
      await this.loadGameCoverSource()
    }
    this.loading = false
  },

  methods: {
    async checkIfGameHasCover() {
      // Create a reference under which you want to list
      const listRef = ref(storage, `covers/${this.gameTitle.toLowerCase()}`)
      // Find all the prefixes and items.
      await listAll(listRef)
        .then((res) => {
          res.items.length > 0 ? (this.hasGameCover = true) : (this.hasGameCover = false)
          res.items.length > 0
            ? (this.coverStoragePath = res.items[0]._location.path_)
            : (this.coverStoragePath = '')
          this.$emit('cover-info', {
            hasGameCover: this.hasGameCover,
            storagePath: this.coverStoragePath
          })
        })
        .catch((error) => {
          // Uh-oh, an error occurred!'
          console.log(error)
        })
    },

    async loadGameCoverSource() {
      await get(child(dbRef(database), `games/${this.gameId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.coverSource = snapshot.val().coverSource
          } else {
            console.log('No data available')
          }
        })
        .catch((error) => {
          console.error(error)
        })

      this.$emit('cover-info', {
        hasGameCover: this.hasGameCover,
        storagePath: this.coverStoragePath,
        source: this.coverSource
      })
    }
  }
}
</script>
