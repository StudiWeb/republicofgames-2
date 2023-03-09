<template>
  <PageTitle title="Description" />
  <SelectGame @select-game="selectGame" />
  <div v-if="gameId !== 'none'">
    <tab-navigation>
      <TabNavigationItem title="Information" @set-component="setComponent" />
      <dropdown-menu title="Introduction">
        <DropdownMenuItem title="Add introduction" @set-component="setComponent" />
        <DropdownMenuItem title="Edit introduction" @set-component="setComponent" />
        <DropdownMenuItem title="Delete introduction" @set-component="setComponent" />
      </dropdown-menu>
      <dropdown-menu title="Description">
        <DropdownMenuItem title="Add description" @set-component="setComponent" />
        <DropdownMenuItem title="Edit description" @set-component="setComponent" />
        <DropdownMenuItem title="Delete description" @set-component="setComponent" />
      </dropdown-menu>
    </tab-navigation>

    <LoadSpinner v-if="loading" />
    <component
      v-else
      @update-component="updateComponent"
      :is="component"
      :gameId="gameId"
      :introduction="introduction"
      :description="description"
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
import LoadSpinner from '../../components/reusable/LoadSpinner.vue'
//components
import TheInformation from '../../components/admin/description/TheInformation.vue'
import AddIntroduction from '../../components/admin/description/introduction/AddIntroduction.vue'
import EditIntroduction from '../../components/admin/description/introduction/EditIntroduction.vue'
import DeleteIntroduction from '../../components/admin/description/introduction/DeleteIntroduction.vue'
import AddDescription from '../../components/admin/description/description/AddDescription.vue'
import EditDescription from '../../components/admin/description/description/EditDescription.vue'
import DeleteDescription from '../../components/admin/description/description/DeleteDescription.vue'

export default {
  components: {
    PageTitle,
    SelectGame,
    TabNavigation,
    TabNavigationItem,
    DropdownMenu,
    DropdownMenuItem,
    LoadSpinner,
    TheInformation,
    AddIntroduction,
    EditIntroduction,
    DeleteIntroduction,
    AddDescription,
    EditDescription,
    DeleteDescription
  },

  data() {
    return {
      game: null,
      gameId: 'none',
      introduction: '',
      description: [],
      component: 'the-information',
      loading: false
    }
  },

  watch: {
    async gameId(id) {
      if (id !== 'none') {
        this.loading = true
        await this.loadIntroduction()
        await this.loadDescription()
        this.loading = false
      }
    }
  },

  methods: {
    selectGame(game) {
      this.game = game
      this.gameId = game.id
      this.component = 'the-information'
    },

    setComponent(cmp) {
      this.component = cmp
    },

    async updateComponent() {
      this.loading = true
      await this.loadIntroduction()
      await this.loadDescription()
      this.loading = false
      this.component = 'the-information'
    },

    async loadIntroduction() {
      await get(child(ref(database), `games/${this.gameId}`))
        .then((snapshot) => {
          if (snapshot.exists(snapshot.val().introduction)) {
            console.log()
            this.introduction = snapshot.val().introduction ? snapshot.val().introduction : ''
          } else {
            console.log('No data available')
          }
        })
        .catch((error) => {
          console.error(error)
        })
    },

    async loadDescription() {
      await get(child(ref(database), `games/${this.gameId}`))
        .then((snapshot) => {
          if (snapshot.exists()) {
            this.description = snapshot.val().description ? snapshot.val().description : []
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
