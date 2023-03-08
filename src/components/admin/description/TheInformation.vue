<template>
  <PageSubtitle title="Information" />
  <div class="mb-3">
    <div v-if="hasIntroduction" class="card">
      <h5 class="card-header">Introduction</h5>
      <div class="card-body" v-html="introduction"></div>
    </div>
    <AlertInfo v-else info="This game does not have an introduction" />
  </div>
  <div>
    <div v-if="hasDescription" class="card">
      <h5 class="card-header">Description</h5>
      <div class="card-body">
        <div v-for="(text, index) in description" :key="index" v-html="text"></div>
      </div>
    </div>
    <AlertInfo v-else info="This game does not have a description" />
  </div>
</template>
<script>
import PageSubtitle from '../UI/PageSubtitle.vue'
import AlertInfo from '../UI/AlertInfo.vue'
export default {
  components: {
    PageSubtitle,
    AlertInfo
  },

  props: ['gameId', 'introduction', 'description'],

  computed: {
    hasIntroduction() {
      return this.introduction !== '' ? true : false
    },

    hasDescription() {
      return this.description !== '' ? true : false
    }
  }
}
</script>
