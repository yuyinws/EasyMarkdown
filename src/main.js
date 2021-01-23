import Vue from 'vue'
import App from './App'
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/ocean.css";

Vue.prototype.marked = marked
Vue.prototype.hljs = hljs

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
