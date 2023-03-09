<template>
  <div class="card">
    <h5 class="card-header">Description</h5>
    <div class="card-body">
      <div v-for="(data, index) in description" :key="index">
        <div
          :class="{
            'game-heading': data.type === 'heading',
            'game-paragraph': data.type === 'paragraph'
          }"
        >
          {{ data.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['description']
}
</script>
