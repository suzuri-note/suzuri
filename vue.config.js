module.exports = {
    publicPath: process.env.NODE_ENV === 'production' ? '/suzuri/' : '/',
    css: {
        loaderOptions: {
            sass: {
                data: `
                    @import "@/style/_variables.scss";
                    @import "@/style/_mixins.scss";
                `
            },
        },
    },
    transpileDependencies: ['vuex-module-decorators']
}