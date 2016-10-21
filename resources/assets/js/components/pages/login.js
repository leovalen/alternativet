import { focusAuto } from 'vue-focus'

module.exports = {

  directives: {
    focusAuto: focusAuto
  },

  data: function () {
    return {
      user: {
        email: null,
        password: null
      },
      messages: []
    }
  },

  methods: {
    attempt: function (e) {
      e.preventDefault()
      var that = this
      client({ path: 'login', entity: this.user }).then(
        function (response) {
          that.$dispatch('userHasFetchedToken', response.token)
          that.getUserData()
        },
        function (response) {
          that.messages = []
          if (response.status && response.status.code === 401) {
            that.messages.push({type: 'danger', message: 'Beklager, brukernavn eller passord er feil.'})
          }
        }
      )
    },

    getUserData: function () {
      var that = this
      client({ path: '/users/me' }).then(
        function (response) {
          that.$dispatch('userHasLoggedIn', response.entity.user)
          that.$route.router.go('/profil/meg')
        },
        function (response) {
          console.log(response)
        }
      )
    }
  },

  route: {
    activate: function (transition) {
      this.$dispatch('userHasLoggedOut')
      transition.next()
    }
  }
}
