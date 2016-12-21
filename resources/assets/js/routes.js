module.exports = {

  configRouter: function (router) {

    router.map({
      '/profil': {
        component: require('./compiled/pages/profile.vue'),
        subRoutes: {
          '/meg': {
            component: require('./compiled/pages/profile/me.vue'),
            auth: true
          },
          '/sikkerhet': {
            component: require('./compiled/pages/profile/security.vue'),
            auth: true
          },
          '/personalia': {
            component: require('./compiled/pages/profile/personalia.vue'),
            auth: true
          },
          '/logout': {
            component: require('./compiled/pages/profile/logout.vue'),
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
            '/organisasjon': {
                component: require('./compiled/pages/om/organisasjon.vue')
            },
        }
      },
      '/betingelser': {
          component: require('./compiled/pages/betingelser.vue')
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
      '/nytt-passord/:token': {
        component: require('./compiled/pages/reset-password.vue')
      },
      '/manifest': {
        component: require('./compiled/pages/plattform.vue')
      },
      '/plattform': {
        component: require('./compiled/pages/plattform.vue')
      },
      '/terms': {
        component: require('./compiled/pages/terms.vue')
      },
      '/sporsmal': {
        component: require('./compiled/pages/sporsmal.vue')
      },
      '/erklaering': {
        component: require('./compiled/pages/erklaering.vue')
      },
      '/politikk': {
        component: require('./compiled/pages/politikk.vue')
      },
        '/nominasjon': {
            component: require('./compiled/pages/nominasjon.vue')
        },
      '/home': {
        component: require('./compiled/pages/home/home.vue')
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
          transition.redirect('/login')
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
