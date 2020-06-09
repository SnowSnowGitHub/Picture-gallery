import Vue from 'vue'
import App from './App'
import request from './utils/request'
import api from './api/api'
Vue.prototype.request = request
Vue.prototype.api = api
Vue.config.productionTip = false
import "./styles/iconfont/iconfont.css" 
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
