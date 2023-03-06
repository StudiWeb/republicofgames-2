<template>
  <div class="my-3 p-3 bg-light">
    <div class="mb-3">
      <div class="mb-3">
        <label class="form-label"> Date </label>
        <input v-model="date" type="date" class="form-control" />
      </div>

      <div>
        <!-- pc -->
        <div class="d-flex my-2">
          <i class="bi bi-pc-display"></i>
          <div class="d-flex flex-wrap ms-3">
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="pc"
                id="pc"
              />
              <label class="form-check-label me-2" for="pc"> PC </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="www"
                id="www"
              />
              <label class="form-check-label me-2" for="www"> WWW </label>
            </div>
          </div>
        </div>

        <!-- playstation -->
        <div class="d-flex my-2">
          <i class="bi bi-playstation"></i>
          <div class="d-flex flex-wrap ms-3">
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="ps5"
                id="ps5"
              />
              <label class="form-check-label me-2" for="ps5"> PS5 </label>
            </div>

            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="ps4"
                id="ps4"
              />
              <label class="form-check-label me-2" for="ps4"> PS4 </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="ps3"
                id="ps3"
              />
              <label class="form-check-label me-2" for="ps3"> PS3 </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="ps2"
                id="ps2"
              />
              <label class="form-check-label me-2" for="ps2"> PS2 </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="ps1"
                id="ps1"
              />
              <label class="form-check-label me-2" for="ps1"> PS1 </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="psp"
                id="psp"
              />
              <label class="form-check-label me-2" for="psp"> PSP </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="psvita"
                id="psvita"
              />
              <label class="form-check-label me-2" for="psvita"> PS Vita </label>
            </div>
          </div>
        </div>

        <!-- xbox -->
        <div class="d-flex my-2">
          <i class="bi bi-xbox"></i>
          <div class="d-flex flex-wrap ms-3">
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="xsx"
                id="xsx"
              />
              <label class="form-check-label me-2" for="xsx"> XSX </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="xone"
                id="xone"
              />
              <label class="form-check-label me-2" for="xone"> Xbox One </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="x360"
                id="x360"
              />
              <label class="form-check-label me-2" for="x360"> Xbox 360 </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="xbox"
                id="xbox"
              />
              <label class="form-check-label me-2" for="xbox"> Xbox </label>
            </div>
          </div>
        </div>

        <!-- nintendo -->
        <div class="d-flex my-2">
          <i class="bi bi-nintendo-switch"></i>
          <div class="d-flex flex-wrap ms-3">
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="switch"
                id="switch"
              />
              <label class="form-check-label me-2" for="switch"> SWITCH </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="wii"
                id="wii"
              />
              <label class="form-check-label me-2" for="wii"> Wii </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="nds"
                id="nds"
              />
              <label class="form-check-label me-2" for="nds"> NDS </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="wiiu"
                id="wiiu"
              />
              <label class="form-check-label me-2" for="wiiu"> Wii U </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="3ds"
                id="3ds"
              />
              <label class="form-check-label me-2" for="3ds"> 3DS </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="gameboy"
                id="gameboy"
              />
              <label class="form-check-label me-2" for="gameboy"> GAME BOY </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="gamecube"
                id="gamecube"
              />
              <label class="form-check-label me-2" for="gamecube"> GAME CUBE </label>
            </div>
          </div>
        </div>

        <!-- mobile -->
        <div class="d-flex my-2">
          <i class="bi bi-phone"></i>
          <div class="d-flex flex-wrap ms-3">
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="android"
                id="android"
              />
              <label class="form-check-label me-2" for="android"> Android </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="ios"
                id="ios"
              />
              <label class="form-check-label me-2" for="ios"> iOS </label>
            </div>
            <div class="form-check">
              <input
                v-model="platforms"
                class="form-check-input"
                type="checkbox"
                value="windowsphone"
                id="windowsphone"
              />
              <label class="form-check-label me-2" for="windowsphone"> Windows phone </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  emits: ['release-date'],

  data() {
    return {
      date: '',
      platforms: []
    }
  },

  updated() {
    this.$emit('release-date', { date: this.date, platforms: this.platforms })
  }
}
</script>

<style scoped>
.form-check-label:hover {
  cursor: pointer;
}
</style>
