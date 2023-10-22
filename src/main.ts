import { createApp } from 'vue'
import { createPinia } from 'pinia'
import '@/assets/style.css'
import App from '@/App'
import router from '@/router/index'

const app = createApp(App)
const pinia = createPinia()
app.use(pinia)
app.use(router)
app.mount('#app')
