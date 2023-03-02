<template>
  <TheHeader />
  <div class="container-fluid">
    <div class="row">
      <TheNavigation />
      <main class="col-md-9 ms-sm-auto col-lg-10 px-md-4">
        <div v-if="route" class="p-5 my-4 bg-light rounded-3">
          <div class="container-fluid py-5">
            <h1 class="display-5 fw-bold">Admin panel</h1>
            <p class="col-md-8 fs-4">
              Welcome to admin panel of Republic of games site. This is the place where you can add
              your game, update some information about game that you can see on the main site or
              even if you want - delete one.
            </p>
            <button class="btn btn-primary btn-lg" type="button">New game</button>
          </div>
        </div>
        <div v-else class="p-5 col-xxl-6">
          <router-view></router-view>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import TheHeader from '../../components/admin/layout/TheHeader.vue'
import TheNavigation from '../../components/admin/layout/navigation/TheNavigation.vue'
export default {
  components: {
    TheHeader,
    TheNavigation
  },

  computed: {
    route() {
      return this.$route.name === 'admin' ? true : false
    }
  }
}
</script>
