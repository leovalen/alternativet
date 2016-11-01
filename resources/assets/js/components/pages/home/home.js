import { focusAuto } from 'vue-focus'

module.exports = {

    directives: {
        focusAuto: focusAuto
    },

    data: function () {
        return {
            user: {
                name: null,
                email: null,
                phone: null
            },
            messages: [],
            map_src: config.api.base_url + '/graphics/members-map-norway.svg',
            config: window.config,
            statistics: Object,
            submitting_registration: false
        }
    },

    ready: function() {

        var that = this;

        client({ path: '/statistics/users' }).then(function(response) {
            that.$set('statistics', response.entity);
        });
    },

    methods: {
        registerUser: function (e) {
            e.preventDefault()
            var that = this

            that.submitting_registration = true;

            client({ path: '/register', entity: this.user }).then(
                function (response) {
                    that.submitting_registration = false;

                    swal({
                        title: "Yay!",
                        text: "Velkommen til Alternativet. Du er best!",
                        type: "success",
                    });

                    that.getUserData()
                },
                function (response, status) {
                    that.messages = []
                    if (response.status && response.status.code === 422) {

                        that.submitting_registration = false;

                        // swal({ title: "Oops", text: "Du må fylle ut navn, epost og mobilnr", type: "error" });

                        that.messages = []
                        for (var key in response.entity.errors) {
                            that.messages.push({type: 'info', message: response.entity.errors[key]})
                        }
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
                }
            )
        }
    }
}
