module.exports = {
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/style/_variables.scss";
                    @import "@/style/mixins.scss";
                `
            },
        },
    },
}