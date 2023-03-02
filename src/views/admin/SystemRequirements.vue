<template>
  <div>
    <div class="d-flex align-items-center my-4">
      <h4 class="me-2">System requirements</h4>
      <popover-info :title="popoverTitle" :content="popoverContent"></popover-info>
    </div>

    <div class="mb-3">
      <label class="form-label">Minimum requirements </label>
      <textarea
        v-model="minimum"
        id="minimum"
        class="form-control"
        rows="3"
        placeholder="minimum requirements ..."
      ></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Recommended requirements</label>
      <textarea
        v-model="recommended"
        class="form-control"
        rows="3"
        placeholder="recommended requirements ..."
      ></textarea>
    </div>
    <div class="mb-3">
      <label class="form-label">Ultra requirements</label>
      <textarea
        v-model="ultra"
        class="form-control"
        rows="3"
        placeholder="ultra requirements ..."
      ></textarea>
    </div>
  </div>
</template>

<script></script>
