define(['jquery', 'backbone', 'templates', 'slick'],
    function ($, Backbone, tpl) {
        'use strict';
        App.Extensions.view = Backbone.View.extend({
            initialize: function (args) {
                this.listenTo(this.model, "change", this.render);
            },
            render: function (options) {
                this.args = options.args;
                options = options || {};
                if (options.page === true) { this.$el.addClass(App.route.currentName); }
                return this;
            }
        });
        App.Views.Init = App.Extensions.view.extend({
            el: $("body"),
            template: tpl.header,
            initialize: function (options) { this.$el.find("section.main").html(''); },
            events: {
                "touchend .ad-bottom,.ad-top": "swichAdtype",
                "touchend .right.share,.share-panel .cancle": "share",
                "touchend .save,.back": "navigate"
            },
            run: function (view, args) {
                if (["home", "topad"].indexOf(App.route.currentName) != -1) {
                    this.$el.find("header").html(this.template.editAd);
                    this.initAdtype();
                } else {
                    this.$el.find("header").html(this.template.common);
                    this.$el.find("header .title").html(document.title);
                }
                var _ = App.view;
                _.previous = _.current || null; _.next = view;
                if (_.previous) { _.previous.remove(); }
                _.next.render({ page: true, args: args });
                this.$el.find(".main").append(_.next.$el);
                if (view.onshow) { view.onshow.apply(this, args); }
                _.current = _.next;
                this.bindHover();
            },
            swichAdtype: function (e) {
                if ($(e.currentTarget).hasClass("active")) { return; }
                $('.ad-bottom,.ad-top').removeClass("active ");
                if ($(e.currentTarget).hasClass("ad-bottom")) {
                    App.route.navigate("/", { trigger: true });
                } else {
                    App.route.navigate("topad", { trigger: true });
                }
            },
            initAdtype: function () {
                switch (App.route.currentName) {
                    case "home":
                        this.$el.find(".ad-bottom").addClass("active");
                        break;
                    case "topad":
                        this.$el.find(".ad-top").addClass("active");
                        break;
                }
            },
            share: function () {
                $(".share-panel").slideToggle(200);
            },
            navigate: function (e) {
                var obj = $(e.currentTarget);
                if (obj.hasClass("save")) {
                    App.route.navigate("preview", { trigger: true });
                } else if (obj.hasClass("back") && App.view.previous) {
                    window.history.go(-1);
                }
            },
            bindHover: function () {//绑定hover效果
                var hoverSelectors = [".share-panel .container>div", ".share-panel .cancle", ".back a", ".right.save", ".right.share"];
                $(hoverSelectors.join(",")).bind("touchstart", function () { $(this).attr("style", "background-color:#e9e8ed"); })
                    .bind("touchend", function () { $(this).removeAttr("style"); });
            }
        });
        return App.Views;
    });