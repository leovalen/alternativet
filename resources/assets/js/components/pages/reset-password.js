module.exports = {

    data: function () {
        return {
            token: {
                token: null
            },
            messages: []
        }
    },

    methods: {
        getUserData: function () {
            var that = this
            client({ path: '/users/me' }).then(
                function (response) {
                    that.$dispatch('userHasLoggedIn', response.entity.data)
                    that.$route.router.go('/profil/sikkerhet')
                },
                function (response) {
                    console.log(response)
                }
            )
        }
    },

    route: {
        activate: function (transition) {

            var that = this
            this.token.token = this.$route.params.token

            client({ path: 'login-with-token', entity: this.token }).then(
                function (response) {
                    that.$dispatch('userHasFetchedToken', response.token)
                    that.getUserData()
                },
                function (response) {
                    that.messages = []
                    if (response.status && response.status.code === 401) {
                        that.messages.push({type: 'danger', message: 'Engangskoden for å nullstille passordet er utløpt.'})
                    }
                }
            )

            transition.next()
        }
    }
}
