<template>
  <PageTitle title="Cover" />
  <SelectGame @select-game="selectGame" />
  <div v-if="gameId !== 'none'">
    <tab-navigation>
      <TabNavigationItem title="Cover" @set-component="setComponent" />
      <dropdown-menu title="Manage cover">
        <DropdownMenuItem :title="addOrEditCover" @set-component="setComponent" />
        <DropdownMenuItem title="Delete cover" @set-component="setComponent" />
      </dropdown-menu>
    </tab-navigation>

    <component
      @cover-info="setCover"
      @update-component="updateComponent"
      :is="component"
      :game="game"
      :cover="cover"
      :key="componentKey"
    ></component>
  </div>
</template>

<script>
import PageTitle from '../../components/admin/UI/PageTitle.vue'
import SelectGame from '../../components/admin/UI/SelectGame.vue'
import TabNavigation from '../../components/admin/UI/tab-navigation/TabNavigation.vue'
import TabNavigationItem from '../../components/admin/UI/tab-navigation/TabNavigationItem.vue'
import DropdownMenu from '../../components/admin/UI/tab-navigation/DropdownMenu.vue'
import DropdownMenuItem from '../../components/admin/UI/tab-navigation/DropdownMenuItem.vue'
import GameCover from '../../components/admin/cover/GameCover.vue'
import AddCover from '../../components/admin/cover/AddCover.vue'
import DeleteCover from '../../components/admin/cover/DeleteCover.vue'

export default {
  components: {
    PageTitle,
    SelectGame,
    TabNavigation,
    TabNavigationItem,
    DropdownMenu,
    DropdownMenuItem,
    GameCover,
    AddCover,
    DeleteCover
  },

  data() {
    return {
      game: null,
      gameId: 'none',
      cover: null,
      component: 'game-cover',
      componentKey: 0
    }
  },

  computed: {
    addOrEditCover() {
      if (this.cover) {
        return this.cover.hasGameCover ? 'Edit cover' : 'Add cover'
      }
    }
  },

  methods: {
    selectGame(game) {
      this.game = game
      this.gameId = game.id
      this.component = 'game-cover'
      this.componentKey++
    },

    setComponent(cmp) {
      this.component = cmp
    },

    updateComponent() {
      this.component = 'game-cover'
    },

    setCover(obj) {
      this.cover = obj
    }
  }
}
</script>
