<template>
  <PageSubtitle title="Add description" />
  <component
    v-for="(cmp, index) in components"
    :key="index"
    :is="cmp"
    @remove-heading="decreaseComponents"
    @remove-paragraph="decreaseComponents"
    :index="index"
  ></component>
  <div class="d-flex justify-content-between mt-5">
    <div class="d-flex">
      <button @click="toggleAddPanel" class="btn btn-secondary border-0 rounded-0">
        <i class="fs-2 bi bi-plus"></i>
      </button>
      <div v-if="showAddPanel">
        <button @click="addHeading" class="btn btn-light border-0 rounded-0">
          <i class="fs-2 bi bi-card-heading"></i>
        </button>
        <button @click="addDescription" class="btn btn-light border-0 rounded-0">
          <i class="fs-2 bi bi-card-text"></i>
        </button>
      </div>
    </div>
    <button class="btn btn-primary align-self-center">Add description</button>
  </div>
</template>
<script>
import PageSubtitle from '../../UI/PageSubtitle.vue'
import TheHeading from './panel/TheHeading.vue'
import TheDescription from './panel/TheDescription.vue'

export default {
  components: {
    PageSubtitle,
    TheHeading,
    TheDescription
  },

  data() {
    return {
      showAddPanel: false,
      components: []
    }
  },

  methods: {
    toggleAddPanel() {
      this.showAddPanel = !this.showAddPanel
    },

    addHeading() {
      this.components.push('the-heading')
    },

    addDescription() {
      this.components.push('the-description')
    },

    decreaseComponents(index) {
      delete this.components[index]
    }
  }
}
</script>
