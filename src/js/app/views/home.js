define(['jquery', 'backbone', 'templates', 'slick'],
    function ($, Backbone, tpl) {
        'use strict';
        //**********************首页**********************
        App.Views.Home = App.Extensions.view.extend({
            initialize: function (args) {
                //this.listenTo(this.model, "change", this.render);
            },
            template: tpl.home,
            obj: {
                slideIndex: 0,
                adslider: function () { return $(".view-container"); }
            },
            events: {
                "reInit .view-container": "slickNext",
                "touchend .type .slick-slide": "addSlide",
                "touchmove .type .slick-slide": "preventTouchend",
                "touchend .ad-type-close": "removeSlide",
                "touchend .turn-icon": "turn",
                "change input[type='file']": "fileUpload"
            },
            render: function (options) {
                this.$el.html(this.template.main);
                return App.Extensions.view.prototype.render.apply(this, arguments);
            },
            onshow: function () {//初始化slick
                $(".main .type").slick({
                    variableWidth: true,
                    slidesToShow: 3,
                    slidesToScroll: 2
                });
                this.obj.adslider().slick({
                    dots: true,
                    arrows: false,
                    slidesToShow: 1,
                    slidesToScroll: 1
                });
            },
            addSlide: function (e) {//添加轮播元素
                if ($(e.currentTarget).data("moved") == true) {
                    $(e.currentTarget).data("moved", false); return;
                } this.obj.slideIndex++;
                this.obj.adslider().slick("slickAdd", this.getTemplate(e.currentTarget));
            },
            removeSlide: function (e) {//删除添加轮播元素
                this.obj.adslider().slick('slickRemove', this.obj.adslider().slick("slickCurrentSlide"));
                if (this.obj.slideIndex !== 0) { this.obj.slideIndex--; }
            },
            turn: common.turn,
            fileUpload: common.fileUpload,
            getTemplate: function (obj) {//获取模板
                switch ($(obj).data("item")) {
                    case 0:
                        return this.template.common;
                    case 1:
                        return this.template.article;
                    case 2:
                        return this.template.card;
                    case 3:
                        return this.template.qrcode;
                    case 4:
                        return this.template.qq;
                }
            },
            slickNext: function (e) {
                this.obj.adslider().slick("slickNext");
            },
            preventTouchend: function (e) {//防止touchmove事件与touchend事件冲突
                $(e.currentTarget).data("moved", true);
            },
            loadData: function () {
                var thisDom = this;
                var thisEl = this.$el;
            }
        });

        return App.Views.Home;
    });