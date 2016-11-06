// Import requirements using browserify
window.Vue = require('vue')
window.VueRouter = require('vue-router')

var swal = require('sweetalert')

var moment = require('moment')
require('moment/locale/en-gb'); // locales all in lower-case

exports.install = function (Vue, options) {
    Vue.prototype.moment = function (date, format) {
        return moment(date).format('DD.MM.YYYY');
    };
}

Vue.use(exports);

// Import the actual routes, aliases, ...
import { configRouter } from './routes'

// Create our router object and set options on it
const router = new VueRouter({
    history: true,
    root: '/'
})

// Inject the routes into the VueRouter object
configRouter(router)

// Configure the application
window.config = require('./config')
Vue.config.debug = true

// Configure our HTTP client
var rest = require('rest')
var pathPrefix = require('rest/interceptor/pathPrefix')
var mime = require('rest/interceptor/mime')
var defaultRequest = require('rest/interceptor/defaultRequest')
var errorCode = require('rest/interceptor/errorCode')
var interceptor = require('rest/interceptor')
var jwtAuth = require('./interceptors/jwtAuth')

window.client = rest.wrap(pathPrefix, { prefix: config.api.base_url })
                    .wrap(mime)
                    .wrap(defaultRequest, config.api.defaultRequest)
                    .wrap(errorCode, { code: 400 })
                    .wrap(jwtAuth);

// Bootstrap the app
Vue.component('nav-component', require('./compiled/nav.vue'))
Vue.component('footer-component', require('./compiled/footer.vue'))
Vue.component('footer-full-component', require('./compiled/footer-full.vue'))
Vue.component('announcement', require('./compiled/announcement.vue'))


const App = Vue.extend(require('./compiled/app.vue'))
router.start(App, '#app')
window.router = router
