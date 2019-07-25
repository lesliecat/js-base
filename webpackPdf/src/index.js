import Vue from 'vue'
import App from './pages/app.vue'






require('./css/1.css')
var picSrc = require('./img/2.png')
var tt = new Image();
tt.src = picSrc
document.body.appendChild(tt)
class tboy {
    constructor() {
        this.name = name
    }
    init() {
        console.log('aaa')
    }
}


const app = new Vue({
    el: '#app',
    render: h => h(App)
})