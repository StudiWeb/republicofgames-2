<template>
  <teleport to="body">
    <div class="spinner d-flex justify-content-center align-items-center">
      <div class="d-flex flex-column">
        <div
          class="spinner-border text-primary mb-2"
          style="height: 100px; width: 100px; font-size: 50px"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </div>
  </teleport>
</template>

<style scoped>
.spinner {
  z-index: 9999;
  position: fixed;
  background-color: rgba(0, 0, 0, 0.3);
  height: 100vh;
  width: 100%;
  top: 50%;
  left: 50%;
  margin-right: -50%;
  transform: translate(-50%, -50%);
}
</style>
