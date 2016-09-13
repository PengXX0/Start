define(['backbone'],
    function (Backbone) {
        'use strict';
        var parseQueryString = function (url) {
            var obj = {}, reg = /([^\?\=\&]+)\=([^\?\=\&]*)/g;
            while (reg.exec(url)) { obj[RegExp.$1] = RegExp.$2; }
            return obj;
        }
        App.Start = function () {
            App.route = new App.Router();
            App.view = new App.Views.Init();
            Backbone.history.start({ pushState: true, hashChange: true });
            return App.route;
        }
        App.Router = Backbone.Router.extend({
            execute: function (callback, args, name) {
                // if (!loggedIn) { goToLogin(); return false; }
                App.route.currentName = name;
                args.push(parseQueryString(args.pop()));
                if (callback) callback.apply(this, args);
            },
            routes: {
                "": "home",
                "/": "home",
                "home": "home",
                "topad": "topad",
                "preview": "preview"
            },
            home: function (args) {
                document.title = "首页";
                require(['app/views/home'], function (view) {
                    App.view.run(new view(args), args);
                });
            },
            topad: function (args) {
                document.title = "顶部广告";
                require(['app/views/topad'], function (view) {
                    App.view.run(new view(args), args);
                });
            },
            preview: function (args) {
                document.title = "广告预览";
                require(["App/views/preview"], function (view) {
                    App.view.run(new view(args), args);
                });
            }
        });
        return App;
    });