<template>
  <PageTitle title="Trailer" />
  <SelectGame @select-game="selectGame" />
  <div v-if="gameId !== 'none'">
    <LoadSpinner v-if="loading" />
    <div v-else>
      <tab-navigation>
        <TabNavigationItem title="Trailer" @set-component="setComponent" />
        <dropdown-menu title="Manage trailer">
          <DropdownMenuItem
            v-if="!hasGameTrailer"
            title="Add trailer"
            @set-component="setComponent"
          />
          <DropdownMenuItem v-else title="Edit trailer" @set-component="setComponent" />
          <DropdownMenuItem title="Delete trailer" @set-component="setComponent" />
        </dropdown-menu>
      </tab-navigation>
      <component
        @update-component="updateComponent"
        :is="component"
        :gameId="gameId"
        :trailer="trailer"
      ></component>
    </div>
  </div>
</template>
<script>
//database
import { database } from '../../firebase'
import { ref, get, child } from 'firebase/database'
//components used in template
import PageTitle from '../../components/admin/UI/PageTitle.vue'
import SelectGame from '../../components/admin/UI/SelectGame.vue'
import TabNavigation from '../../components/admin/UI/tab-navigation/TabNavigation.vue'
import TabNavigationItem from '../../components/admin/UI/tab-navigation/TabNavigationItem.vue'
import DropdownMenu from '../../components/admin/UI/tab-navigation/DropdownMenu.vue'
import DropdownMenuItem from '../../components/admin/UI/tab-navigation/DropdownMenuItem.vue'
import LoadSpinner from '../../components/reusable/LoadSpinner.vue'
//dynamic components
import TheTrailer from '../../components/admin/trailer/TheTrailer.vue'
import AddTrailer from '../../components/admin/trailer/AddTrailer.vue'
import EditTrailer from '../../components/admin/trailer/EditTrailer.vue'
import DeleteTrailer from '../../components/admin/trailer/DeleteTrailer.vue'

export default {
  components: {
    PageTitle,
    SelectGame,
    LoadSpinner,
    TabNavigation,
    TabNavigationItem,
    DropdownMenu,
    DropdownMenuItem,
    TheTrailer,
    AddTrailer,
    EditTrailer,
    DeleteTrailer
  },

  data() {
    return {
      game: null,
      gameId: 'none',
      component: 'the-trailer',
      trailer: '',
      loading: false
    }
  },

  computed: {
    hasGameTrailer() {
      return this.trailer !== '' ? true : false
    }
  },

  methods: {
    async selectGame(game) {
      this.game = game
      this.gameId = game.id
      this.component = 'the-trailer'
      await this.loadTrailer()
    },

    setComponent(cmp) {
      this.component = cmp
    },

    async updateComponent() {
      this.component = 'the-trailer'
      await this.loadTrailer()
    },

    async loadTrailer() {
      this.loading = true
      await get(child(ref(database), `games/${this.gameId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.trailer = snapshot.val().trailer ? snapshot.val().trailer : ''
            this.loading = false
          } else {
            this.loading = false
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
