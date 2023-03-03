<template>
  <li class="nav-item d-flex align-items-center">
    <router-link class="nav-link d-flex align-items-center" :to="link">
      <span class="fs-4 me-2">
        <slot></slot>
      </span>
      <span>
        {{ title }}
      </span>
    </router-link>
  </li>
</template>

<script scoped>
export default {
  props: ['title', 'link']
}
</script>

<style scoped>
.nav-link {
  font-weight: 500;
  color: #333;
}
.nav-link:hover {
  color: #2470dc;
}

.nav-link.active {
  color: #2470dc;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}
</style>
