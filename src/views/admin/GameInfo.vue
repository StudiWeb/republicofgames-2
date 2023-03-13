<template>
  <PageTitle title="All about game" />
  <SelectGame @select-game="selectGame" />
  <div v-if="gameId !== 'none'">
    <LoadSpinner v-if="loading" />
    <div v-else>
      <tab-navigation>
        <TabNavigationItem title="Game" @set-component="setComponent" />
        <dropdown-menu title="Manage game">
          <DropdownMenuItem title="Edit game" @set-component="setComponent" />
          <DropdownMenuItem title="Delete game" @set-component="setComponent" />
        </dropdown-menu>
      </tab-navigation>
      <component
        @update-component="updateComponent"
        :is="component"
        :gameId="gameId"
        :game="game"
      ></component>
    </div>
  </div>
</template>
<script>
import { database } from '../../firebase'
import { ref, get, child } from 'firebase/database'
//components used in template
import SelectGame from '../../components/admin/UI/SelectGame.vue'
import PageTitle from '../../components/admin/UI/PageTitle.vue'
import TabNavigation from '../../components/admin/UI/tab-navigation/TabNavigation.vue'
import TabNavigationItem from '../../components/admin/UI/tab-navigation/TabNavigationItem.vue'
import DropdownMenu from '../../components/admin/UI/tab-navigation/DropdownMenu.vue'
import DropdownMenuItem from '../../components/admin/UI/tab-navigation/DropdownMenuItem.vue'
import LoadSpinner from '../../components/reusable/LoadSpinner.vue'
//dynamic components
import TheGame from '../../components/admin/game-info/TheGame.vue'
import EditGame from '../../components/admin/game-info/EditGame.vue'
import DeleteGame from '../../components/admin/game-info/DeleteGame.vue'

export default {
  components: {
    SelectGame,
    PageTitle,
    LoadSpinner,
    TabNavigation,
    TabNavigationItem,
    DropdownMenu,
    DropdownMenuItem,
    TheGame,
    EditGame,
    DeleteGame
  },

  data() {
    return {
      game: null,
      gameId: 'none',
      loading: false,
      component: 'the-game'
    }
  },

  methods: {
    async selectGame(game) {
      this.gameId = game.id
      await this.loadGameData()
      this.component = 'the-game'
    },

    setComponent(cmp) {
      this.component = cmp
    },

    async updateComponent() {
      await this.loadGameData()
      this.component = 'the-game'
    },

    async loadGameData() {
      this.loading = true
      await get(child(ref(database), `games/${this.gameId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.game = {
              title: snapshot.val().title,
              developer: snapshot.val().developer,
              publisher: snapshot.val().publisher,
              genre: snapshot.val().genre,
              cover: snapshot.val().coverSource,
              introduction: snapshot.val().introduction
            }
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
