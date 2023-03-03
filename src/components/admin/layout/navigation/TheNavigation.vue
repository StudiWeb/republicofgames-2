<template>
  <nav id="sidebarMenu" class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse">
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <NavigationHeader title="New game" />
        <navigation-item title="Add new game" :link="newGameLink">
          <i class="bi bi-plus-circle"></i>
        </navigation-item>
        <NavigationHeader title="Fill up / update game information" />
        <navigation-item title="System requirements" :link="systemRequirementsLink">
          <i class="bi bi-card-text"></i>
        </navigation-item>
        <navigation-item title="Cover" :link="gameCoverLink">
          <i class="bi bi-file-image"></i>
        </navigation-item>
        <!-- <navigation-item title="Release date">
          <i class="bi bi-calendar3"></i>
        </navigation-item>
        <navigation-item title="Description">
          <i class="bi bi-card-text"></i>
        </navigation-item>
        <navigation-item title="PEGI">
          <i class="bi bi-info-square"></i>
        </navigation-item>
        <navigation-item title="Screens">
          <i class="bi bi-images"></i>
        </navigation-item>
        <navigation-item title="Trailer">
          <i class="bi bi-film"></i>
        </navigation-item> -->
      </ul>
      <!-- <NavigationHeader title="Manage games" />
      <ul class="nav flex-column mb-2">
        <navigation-item title="Game list">
          <i class="bi bi-table"></i>
        </navigation-item>
        <navigation-item title="All about game">
          <i class="bi bi-card-text"></i>
        </navigation-item>
      </ul> -->
    </div>
  </nav>
</template>

<script>
import NavigationHeader from './NavigationHeader.vue'
import NavigationItem from './NavigationItem.vue'

export default {
  components: {
    NavigationHeader,
    NavigationItem
  },
  computed: {
    newGameLink() {
      return { name: 'new-game' }
    },

    systemRequirementsLink() {
      return { name: 'system-requirements' }
    },

    gameCoverLink() {
      return { name: 'game-cover' }
    }
  }
}
</script>

<style scoped>
/*
 * Sidebar
 */

.sidebar {
  position: fixed;
  top: 0;
  /* rtl:raw:
  right: 0;
  */
  bottom: 0;
  /* rtl:remove */
  left: 0;
  z-index: 100; /* Behind the navbar */
  padding: 48px 0 0; /* Height of navbar */
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
  overflow-y: scroll;
}

@media (max-width: 767.98px) {
  .sidebar {
    top: 5rem;
  }
}
.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}
</style>
