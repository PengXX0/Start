define(['jquery', 'backbone', 'templates', 'slick'],
    function ($, Backbone, tpl) {
        'use strict';
        App.Views.Preview = App.Extensions.view.extend({
            events: {
                "touchend .operation .edit": "navigate"
            },
            template: tpl.preview,
            render: function (options) {
                this.$el.html(this.template);
                return App.Extensions.view.prototype.render.apply(this, arguments);
            },
            onshow: function () {
                $(".main .top-ad.slider").slick({
                    dots: true,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
                $(".bottom-box.slider").slick({
                    dots: true,
                    arrows: false,
                    autoplay: true,
                    autoplaySpeed: 2000,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
            },
            navigate: function (e) {
                var obj = $(e.currentTarget);
                if (obj.hasClass("edit")) {
                    App.route.navigate("/", { trigger: true });
                }
            }
        });
        return App.Views.Preview;
    });