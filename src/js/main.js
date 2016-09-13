'use strict';
require.config({
    baseUrl: "/js/",
   // urlArgs:"v=213132",
    paths: {
        jquery: 'lib/jquery.min',
        underscore: 'lib/underscore.min',
        backbone: 'lib/backbone.min',
        marionette: 'lib/backbone.marionette.min',
        iscroll: 'lib/iscroll.min',
        swiper: 'lib/swiper.min',
        slick: 'lib/slick.min',
        fileupload: 'lib/ajaxfileupload',
        router: 'app/router',
        models: 'app/models/models',
        baseview: 'app/views/baseview',
        templates: 'app/templates/templates',
        common: 'app/common'
    },
    map: {
        '*': { 'css': '../styles/' }
    },
    shim: {
        'jquery': { exports: '$' },
        'underscore': { exports: '_' },
        'backbone': {
            deps: ['underscore', 'jquery'],
            exports: 'Backbone'
        },
        'fileupload': { deps: ["jquery"] },
        'slick': { deps: ["jquery"] },
        'baseview': { deps: ["common", "templates"] },
        'router': { deps: ["backbone", "baseview"] }
    }
});
window.App = { Views: {}, Router: {}, Extensions: {}, Collections: {}, Models: {} };
console.log("hello world");
require(['router'],
    function (router) { router.Start(); },
    function (err) {
        //err; 错误详情
        //err.requireType; 错误类型
        //err.requireModules; 错误模块名称，数组类型
        if (confirm("模块" + err.requireModules.join(",") + "加载失败，是否重新加载？")) {
            window.location.reload();
        }
    }
);
