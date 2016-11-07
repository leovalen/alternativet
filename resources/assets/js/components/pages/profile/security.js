module.exports = {

    data: function () {
        return {
            password: {
                'password': '',
                'confirm_password': ''
            },
            messages: []
        }
    },

    methods: {
        /*
        // Let's fetch the dog
        fetch: function (id, successHandler) {
            var that = this
            client({ path: '/dogs/' + id }).then(
                function (response) {
                    that.$set('dog', response.entity.data)
                    successHandler(response.entity.data)
                },
                function (response, status, request) {
                    // Go tell your parents that you've messed up somehow
                    if (status === 401) {
                        self.$dispatch('userHasLoggedOut')
                    } else {
                        console.log(response)
                    }
                }
            )
        },
        */

        updatePassword: function (e) {
            e.preventDefault()
            var self = this
            client({ path: '/users/me/password', entity: this.password, method: 'PUT'}).then(
                function (response) {
                    self.messages = []
                    self.messages.push({type: 'success', message: 'Nytt passord er satt!'})
                },
                function (response) {
                    self.messages = []
                    for (var key in response.entity) {
                        self.messages.push({type: 'danger', message: response.entity[key]})
                    }
                }
            )
        }

    },

    route: {
        /*
        data: function (transition) {
            this.fetch(this.$route.params.id, function (data) {
                transition.next({dog: data})
            })
        }
        */
    }
}
