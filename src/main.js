import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import strore from './store'

const app = createApp(App)

app.use(router)
app.use(strore)

app.mount('#app')
