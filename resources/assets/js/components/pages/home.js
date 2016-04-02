import { focusAuto } from 'vue-focus';

module.exports = {

    directives: {
        focusAuto: focusAuto
    },


    data: function () {
        return {
            user: {
                name: null,
                email: null,
                mobile: null
            },
            messages: [],
            config: window.config
        }
    },

    methods: {
        registerUser: function (e) {
            e.preventDefault()
            var that = this

            client({ path: '/register', entity: this.user }).then(
                function (response) {
                    that.getUserData()
                },
                function (response, status) {
                    that.messages = []
                    if (response.status && response.status.code === 422) {
                        that.messages = []
                        for (var key in response.entity) {
                            that.messages.push({type: 'danger', message: response.entity[key]})
                        }
                    }
                }
            )

        },

        getUserData: function () {
            var that = this
            client({ path: '/users/me' }).then(
                function (response) {
                    that.$dispatch('userHasLoggedIn', response.entity.user)
                    that.$route.router.go('/auth/profile')
                }
            )
        }
    }
}
