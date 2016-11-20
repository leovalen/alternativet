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

    resetPassword: function (e) {
      e.preventDefault()
      var that = this
      client({ path: 'send-reset-password-token', entity: this.user }).then(
          function (response) {
            that.messages = []
            swal({
              title: "Sjekk e-posten din",
              text: "Du vil straks motta en e-post med lenke til å sette nytt passord.",
              type: "success",
            });
          },
          function (response) {
            that.messages = []
            if (response.status && response.status.code === 422) {
              that.messages.push({type: 'warning', message: 'Du må skrive e-postadressen din.'})
            }
          }
      )
    },

    getUserData: function () {
      var that = this
      client({ path: '/users/me' }).then(
        function (response) {
          that.$dispatch('userHasLoggedIn', response.entity.data)
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
