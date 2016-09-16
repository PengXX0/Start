define(['jquery', 'backbone', 'templates', 'slick'],
    function ($, Backbone, tpl) {
        'use strict';
        //**********************顶部广告**********************
        App.Views.Topad = App.Extensions.view.extend({
            initialize: function (args) { },
            template: tpl.topad,
            obj: {
                slideIndex: 0,
                adslider: function () { return $(".view-container"); }
            },
            events: {
                "reInit .view-container": "slickNext",
                "touchend .ad-topad": "addSlide",
                "touchend .ad-type-close": "removeSlide",
                "touchend .turn-icon": "turn",
                "change input[type='file']": "fileUpload"
            },
            render: function (options) {
                this.$el.html(this.template.main);
                return App.Extensions.view.prototype.render.apply(this, arguments);
            },
            onshow: function () {
                this.obj.adslider().slick({
                    dots: true,
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
            },
            addSlide: function (e) {
                this.obj.slideIndex++;
                this.obj.adslider().slick("slickAdd", this.template.item);
            },
            removeSlide: function (e) {
                var slideIndex = $(e.currentTarget).parent(".slick-slide").data("item");
                this.obj.adslider().slick('slickRemove', this.obj.adslider().slick("slickCurrentSlide"));
                if (this.obj.slideIndex !== 0) { this.obj.slideIndex--; }
            },
            slickNext: function (e) {
                this.obj.adslider().slick("slickNext");
            },
            turn: common.turn,
            fileUpload: common.fileUpload
        });        
        return App.Views.Topad;
    });