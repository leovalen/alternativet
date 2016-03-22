module.exports = {

  configRouter: function (router) {

    router.map({
      '/auth': {
        component: require('./compiled/pages/auth.vue'),
        subRoutes: {
          '/profile': {
            component: require('./compiled/pages/auth/profile.vue'),
            auth: true
          },
          '/logout': {
            component: require('./compiled/pages/auth/logout.vue'),
            auth: true
          }
        }
      },
      '/om': {
        component: require('./compiled/pages/om.vue'),
        subRoutes: {
          '/': {
            component: require('./compiled/pages/om/om.vue')
          },
            '/om': {
                component: require('./compiled/pages/om/om.vue')
            },
          '/kontakt': {
            component: require('./compiled/pages/om/kontakt.vue')
          },
          '/folk': {
            component: require('./compiled/pages/om/folk.vue')
          },
            '/organisasjon': {
                component: require('./compiled/pages/om/organisasjon.vue')
            },
        }
      },
      '/dogs': {
        component: require('./compiled/pages/dogs.vue'),
        auth: true,
        subRoutes: {
          '/': {
            component: require('./compiled/pages/dogs/index.vue')
          },
          '/:id': {
            component: require('./compiled/pages/dogs/show.vue')
          },
          '/create': {
            component: require('./compiled/pages/dogs/create.vue')
          }
        }
      },
      '/login': {
        component: require('./compiled/pages/login.vue'),
        guest: true
      },
        '/register': {
            component: require('./compiled/pages/register.vue'),
            guest: true
        },
      '/manifest': {
        component: require('./compiled/pages/manifest.vue')
      },
      '/terms': {
        component: require('./compiled/pages/terms.vue')
      },
      '/placeholder': {
        component: require('./compiled/pages/placeholder.vue')
      },
      '/home': {
        component: require('./compiled/pages/home.vue')
      },
      '*': {
        component: require('./compiled/pages/404.vue')
      }
    })

    router.alias({
      '': '/home',
      '/auth': '/login'
    })

    router.beforeEach(function (transition) {

      var token = localStorage.getItem('jwt-token')
      if (transition.to.auth) {
        if (!token || token === null) {
          transition.redirect('/auth/login')
        }
      }
      if (transition.to.guest) {
        if (token) {
          transition.redirect('/')
        }
      }
      transition.next()
    })
  }
}
