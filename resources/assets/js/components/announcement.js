module.exports = {

    data: function () {
        return {
            announcement: {
                message: ''
            }
        }
    },

    ready: function() {

        var that = this;

        client({ path: '/announcements/latest' }).then(function(response) {
            if (typeof response.entity == Object)
            {
                that.$set('announcement', response.entity.data);
            }
        });
    }
}
