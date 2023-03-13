<template>
  <PageTitle title="Release date" />
  <SelectGame @select-game="selectGame" />

  <div v-if="gameId !== 'none'">
    <tab-navigation>
      <TabNavigationItem title="Release date list" @set-component="setComponent" />
      <dropdown-menu title="Manage Release date">
        <DropdownMenuItem title="Add release date" @set-component="setComponent" />
        <DropdownMenuItem title="Delete release date" @set-component="setComponent" />
      </dropdown-menu>
    </tab-navigation>

    <LoadingSpinner v-if="loading" />
    <component
      v-else
      @update-component="updateComponent"
      :is="component"
      :game="game"
      :releaseDates="releaseDates"
      :key="componentKey"
    ></component>
  </div>
</template>

<script>
import { database } from '../../firebase'
import { ref, get, child } from 'firebase/database'

import PageTitle from '../../components/admin/UI/PageTitle.vue'
import SelectGame from '../../components/admin/UI/SelectGame.vue'
import TabNavigation from '../../components/admin/UI/tab-navigation/TabNavigation.vue'
import TabNavigationItem from '../../components/admin/UI/tab-navigation/TabNavigationItem.vue'
import DropdownMenu from '../../components/admin/UI/tab-navigation/DropdownMenu.vue'
import DropdownMenuItem from '../../components/admin/UI/tab-navigation/DropdownMenuItem.vue'
import LoadingSpinner from '../../components/reusable/LoadSpinner.vue'
//components
import ReleaseDateList from '../../components/admin/release-date/ReleaseDateList.vue'
import AddReleaseDate from '../../components/admin/release-date/AddReleaseDate.vue'
import DeleteReleaseDate from '../../components/admin/release-date/DeleteReleaseDate.vue'

export default {
  components: {
    PageTitle,
    SelectGame,
    TabNavigation,
    TabNavigationItem,
    DropdownMenu,
    DropdownMenuItem,
    LoadingSpinner,
    ReleaseDateList,
    AddReleaseDate,
    DeleteReleaseDate
  },

  data() {
    return {
      game: null,
      gameId: 'none',
      component: 'release-date-list',
      componentKey: 0,
      releaseDates: [],
      loading: false
    }
  },

  computed: {
    addOrEditCover() {
      if (this.cover) {
        return this.cover.hasGameCover ? 'Edit release date' : 'Add release date'
      }
    }
  },

  methods: {
    async selectGame(game) {
      this.game = game
      this.gameId = game.id
      this.loading = true
      await this.loadReleaseDates()
      this.loading = false
      this.component = 'release-date-list'
      this.componentKey++
    },

    setComponent(cmp) {
      this.component = cmp
    },

    async updateComponent() {
      this.component = 'release-date-list'
      this.loading = true
      await this.loadReleaseDates()
      this.loading = false
    },

    async loadReleaseDates() {
      this.releaseDates = []
      await get(child(ref(database), `games/${this.gameId}/releaseDates`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.releaseDates = snapshot.val()
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
