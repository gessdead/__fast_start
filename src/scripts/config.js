require.config({
    baseUrl: '/scripts/lib',

    urlArgs: 'v1',

    paths: {
        app: '../app',

        jquery: 'jquery/dist/jquery.min',
        slick: 'slick-carousel/slick/slick.min'
    },
    deps: ['app']
});
