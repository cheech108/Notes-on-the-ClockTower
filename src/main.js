import { createApp } from 'vue'
import VueCookies from 'vue-cookies'
import './style.css'
import App from './App.vue'

const app = createApp(App)

// Register the plugin and set default expiration (e.g., 7 days)
app.use(VueCookies, { expires: '7d' })
app.mount('#app')