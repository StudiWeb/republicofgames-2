<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      data-bs-toggle="dropdown"
      href="#"
      role="button"
      aria-expanded="false"
      >{{ title }}</a
    >
    <ul class="dropdown-menu">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
export default {
  props: ['title']
}
</script>
