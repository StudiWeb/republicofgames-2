<template>
  <div class="d-flex flex-wrap">
    <img class="me-2" v-for="(icon, index) in platformIcons" :key="index" :src="icon" />
  </div>
</template>
<script>
export default {
  props: ['platforms'],

  computed: {
    platformIcons() {
      let icons = []
      this.platforms.forEach((p) => {
        switch (p) {
          /**
           * PC
           */
          case 'pc':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fpc%2Fpc.svg?alt=media&token=662fc995-9b91-41b4-b6f1-02119a006cbf'
            )
            break
          case 'www':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fpc%2Fwww.svg?alt=media&token=1ba96813-45f6-4420-9cc7-5d4e746d03cd'
            )
            break
          /**
           * PLAYSTATION
           */
          case 'ps5':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fplaystation%2Fps5.svg?alt=media&token=957fe465-56f8-4e03-bf9c-94cfbddf99e3'
            )
            break
          case 'ps4':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fplaystation%2Fps4.svg?alt=media&token=37e2ff15-ea2f-4646-9e8f-45189023e636'
            )
            break
          case 'ps3':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fplaystation%2Fps3.svg?alt=media&token=40e93ef1-3c84-4c53-8eb1-eaa7ee1501f3'
            )
            break
          case 'ps2':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fplaystation%2Fps2.svg?alt=media&token=bf5b13fd-1bf5-43fd-aee9-6c785c365b50'
            )
            break
          case 'ps1':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fplaystation%2Fps1.svg?alt=media&token=7a202090-5abc-4206-b11c-3959f9198da3'
            )
            break
          case 'psvita':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fplaystation%2Fpsvita.svg?alt=media&token=3b2051b7-59cc-4ddb-8802-1c5391b5b403'
            )
            break
          case 'psp':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fplaystation%2Fpsp.svg?alt=media&token=73f78dc1-7977-4bb0-9928-b12487e13405'
            )
            break
          /**
           * XBOX
           */
          case 'xsx':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fxbox%2Fxboxsx.svg?alt=media&token=50d7a8f5-9443-4182-8d0a-8be18896f482'
            )
            break
          case 'xone':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fxbox%2Fxboxone.svg?alt=media&token=48323aa6-695a-40cd-970a-b8c93c8718cd'
            )
            break
          case 'x360':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fxbox%2Fxbox360.svg?alt=media&token=39811fca-a74a-4b93-9835-06019f61cb9f'
            )
            break
          case 'xbox':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fxbox%2Fxbox.svg?alt=media&token=8bedc325-ab00-4431-b26c-d2866f8c1ee7'
            )
            break
          /**
           * NINTENDO
           */
          case 'switch':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fnintendo%2Fswitch.svg?alt=media&token=6ad1fdf7-6e41-4904-a509-10da404aad8d'
            )
            break
          case 'wii':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fnintendo%2Fwii.svg?alt=media&token=a487bf7c-425b-41e3-971b-9d41d6f41800'
            )
            break
          case 'wiiu':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fnintendo%2Fwiiu.svg?alt=media&token=5977f79c-98a9-45b2-a338-2eff9a979fb4'
            )
            break
          case '3ds':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fnintendo%2F3ds.svg?alt=media&token=689a2155-43e0-4a5b-8b89-b4ca2c4885a7'
            )
            break
          case 'nds':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fnintendo%2Fnds.svg?alt=media&token=424fae68-4aa1-4474-abd8-f17d692745d8'
            )
            break
          case 'gameboy':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fnintendo%2Fgba.svg?alt=media&token=cb29a0a3-6867-4668-9515-1f0702d9b379'
            )
            break
          case 'gamecube':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fnintendo%2Fgcn.svg?alt=media&token=60f0796c-9b86-4faa-9ee2-a3a8c15a2a4d'
            )
            break
          /**
           * MOBILE
           */
          case 'android':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fmobile%2Fandroid.svg?alt=media&token=3b1a2665-e087-4695-baf6-bb3d784be82e'
            )
            break
          case 'ios':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fmobile%2Fios.svg?alt=media&token=498616ca-8e04-40c6-91f0-0273bd6b75e2'
            )
            break
          case 'windowsphone':
            icons.push(
              'https://firebasestorage.googleapis.com/v0/b/vue-rog-3618c.appspot.com/o/platforms%2Fmobile%2Fwp.svg?alt=media&token=72488ed8-0ca6-44fe-b026-05d7d57132fb'
            )
            break
        }
      })

      return icons
    }
  }
}
</script>
