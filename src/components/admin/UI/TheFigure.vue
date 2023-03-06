<template>
  <figure class="figure">
    <img :src="src" class="figure-img img-fluid rounded" :alt="title" />
    <figcaption class="figure-caption">{{ title }}</figcaption>
  </figure>
</template>

<script>
export default {
  props: ['title', 'src']
}
</script>
