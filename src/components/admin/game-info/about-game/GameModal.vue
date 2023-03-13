<template>
  <teleport to="body">
    <div id="gameModal" class="modal fade" tabindex="-1" aria-hidden="true">
      <div class="modal-dialog modal-fullscreen">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">{{ title }}</h1>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="container">
              <div class="row mb-3">
                <BasicInfo
                  class="px-0"
                  :cover="cover"
                  :title="title"
                  :developer="developer"
                  :publisher="publisher"
                  :genre="genre"
                  :introduction="introduction"
                  :releaseDates="releaseDates"
                />
              </div>

              <div class="row mb-3">
                <TheDescription v-for="(text, index) in description" :key="index" :text="text" />
              </div>

              <div class="row">
                <SystemRequirements
                  class="px-0"
                  :minimum="minimum"
                  :recommended="recommended"
                  :ultra="ultra"
                  :releaseDates="releaseDates"
                />
              </div>
            </div>
          </div>

          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
<script>
import { database } from '../../../../firebase'
import { ref, get, child } from 'firebase/database'

import BasicInfo from './components/BasicInfo.vue'
import ReleaseDates from './components/ReleaseDates.vue'
import TheTrailer from './components/TheTrailer.vue'
import TheDescription from './components/TheDescription.vue'
import SystemRequirements from './components/SystemRequirements.vue'

export default {
  components: {
    BasicInfo,
    ReleaseDates,
    TheDescription,
    SystemRequirements,
    TheTrailer
  },

  props: ['id'],

  data() {
    return {
      game: null
    }
  },

  computed: {
    cover() {
      if (this.game) {
        return this.game.coverSource ? this.game.coverSource : ''
      } else {
        return ''
      }
    },

    title() {
      if (this.game) {
        return this.game.title ? this.game.title : ''
      } else {
        return ''
      }
    },

    developer() {
      if (this.game) {
        return this.game.developer ? this.game.developer : ''
      } else {
        return ''
      }
    },

    publisher() {
      if (this.game) {
        return this.game.publisher ? this.game.publisher : ''
      } else {
        return ''
      }
    },

    genre() {
      if (this.game) {
        return this.game.genre ? this.game.genre : ''
      } else {
        return ''
      }
    },

    introduction() {
      if (this.game) {
        return this.game.introduction ? this.game.introduction : ''
      } else {
        return ''
      }
    },

    releaseDates() {
      if (this.game) {
        return this.game.releaseDates ? this.game.releaseDates : []
      } else {
        return []
      }
    },

    description() {
      if (this.game) {
        return this.game.description ? this.game.description : []
      } else {
        return []
      }
    },

    minimum() {
      if (this.game) {
        return this.game.minimum ? this.game.minimum : ''
      } else {
        return []
      }
    },

    recommended() {
      if (this.game) {
        return this.game.recommended ? this.game.recommended : ''
      } else {
        return []
      }
    },

    ultra() {
      if (this.game) {
        return this.game.ultra ? this.game.ultra : ''
      } else {
        return []
      }
    },

    trailer() {
      if (this.game) {
        return this.game.trailer ? this.game.trailer : ''
      } else {
        return []
      }
    }
  },

  async created() {
    await this.loadGame(this.id)
  },

  methods: {
    async loadGame(id) {
      await get(child(ref(database), `games/${id}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.game = snapshot.val()
          } else {
            console.log('No data available')
          }
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }
}
</script>
