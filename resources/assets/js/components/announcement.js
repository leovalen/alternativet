module.exports = {

    data: function () {
        return {
            announcement: Object
        }
    },

    ready: function() {

        var that = this;

        client({ path: '/announcements/latest' }).then(function(response) {
            that.$set('announcement', response.entity.data);
        });
    }
}
