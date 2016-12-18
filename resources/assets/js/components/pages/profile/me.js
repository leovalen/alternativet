module.exports = {

    data: function () {
        return {
            membership: {},
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

        activateMembership: function (e) {
            client({ path: '/users/me/membership', entity: this.membership, method: 'POST'}).then(
                function (response) {
                    swal({
                        title: "Velkommen",
                        text: "Du er nå medlem med fulle rettigheter i Alternativet.",
                        type: "success",
                    }, function(){
                        location.reload()
                    })
                },
                function (response) {
                    swal({
                        title: "Oops",
                        text: "Beklager, det oppsto en feil. Venligst prøv på nytt seinere eller ta kontakt med oss.",
                        type: "error",
                    });
                }
            )
        },

        deactivateMembership: function (e) {
            client({ path: '/users/me/membership', entity: this.membership, method: 'DELETE'}).then(
                function (response) {
                    swal({
                        title: "OK",
                        text: "Du er nå utmeldt av Alternativet..",
                        type: "success",
                    }, function(){
                        location.reload()
                    })
                },
                function (response) {
                    swal({
                        title: "Oops",
                        text: "Beklager, det oppsto en feil. Venligst prøv på nytt seinere eller ta kontakt med oss.",
                        type: "error",
                    });
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
