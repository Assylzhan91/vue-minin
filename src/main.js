import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@/assets/scss/main.scss'

createApp(App).use(store).use(router).mount('#app')


function isPalindrome(str) {
  return str === str.split('').reverse().join('')
}
