<template>
  <PageTitle title="Screens" />
  <SelectGame @select-game="selectGame" />
  <div v-if="gameId !== 'none'">
    <LoadSpinner v-if="loading" />
    <div v-else>
      <tab-navigation>
        <TabNavigationItem title="Screens" @click="updateScreens" @set-component="setComponent" />
        <TabNavigationItem title="Add screen" @set-component="setComponent" />
      </tab-navigation>

      <component
        @update-screens="updateScreens"
        :is="component"
        :game="game"
        :screens="screens"
      ></component>
    </div>
  </div>
</template>

<script>
//database
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
import ScreenList from '../../components/admin/screens/ScreenList.vue'
import AddScreen from '../../components/admin/screens/AddScreen.vue'

export default {
  components: {
    SelectGame,
    PageTitle,
    TabNavigation,
    TabNavigationItem,
    DropdownMenu,
    DropdownMenuItem,
    ScreenList,
    AddScreen,
    LoadSpinner
  },

  data() {
    return {
      game: null,
      component: 'screen-list',
      screens: [],
      loading: false
    }
  },

  computed: {
    gameId() {
      return this.game ? this.game.id : 'none'
    }
  },

  watch: {
    async gameId(id) {
      if (id !== 'none ') {
        this.loading = true
        await this.loadScreens()
        this.loading = false
      }
    }
  },

  methods: {
    selectGame(game) {
      this.game = game
    },

    setComponent(cmp) {
      this.component = cmp
    },

    async updateScreens() {
      console.log('xd')
      this.loading = true
      await this.loadScreens()
      this.loading = false
    },

    async loadScreens() {
      this.screens = []
      await get(child(ref(database), `screens`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            for (const id in snapshot.val()) {
              if (snapshot.val()[id].gameId === this.gameId) {
                this.screens.push({
                  id: id,
                  file: snapshot.val()[id].file,
                  url: snapshot.val()[id].url
                })
              }
            }
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
