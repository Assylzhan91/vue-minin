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
//
// let res1 = isPalindrome('test');
// let res2 = isPalindrome('шалаш');
// console.log(res1)
// console.log(res2)
