define(['jquery', 'fileupload'], function ($) {
    'use strict';
    window.common = {
        turn: function (e) {
            var obj = e.currentTarget;
            if ($(obj).hasClass("ad-turn-on")) {
                $(obj).removeClass("ad-turn-on").data("value", "0").addClass("ad-turn-off");
            } else {
                $(obj).removeClass("ad-turn-off").data("value", "1").addClass("ad-turn-on");
            }
        },
        fileUpload: function (e) {
            var obj = e.currentTarget;
            $.ajaxFileUpload({
                url: "/file/upload",
                secureuri: false,
                fileElementId: obj.id,
                dataType: "json",
                type: "POST",
                success: function (data, status) {
                    if (data.code === 1) {
                        $(obj).parent().css("background-image", "url(" + data.url + ")");
                        $(obj).next("img").remove();
                    } else { alert(data.msg); }
                },
                error: function (data, status, e) {
                    alert("网络错误！");
                }
            });
        },
        bindHover: function (e) {
            var obj = e.currentTarget;
            var hoverSelectors = [".share-panel .container>div", ".share-panel .cancle", ".back a", ".right.save", ".right.share"];
            $(hoverSelectors.join(",")).bind("touchstart", function () { $(obj).attr("style", "background-color:#e9e8ed"); })
                .bind("touchend", function () { $(obj).removeAttr("style"); });
        },
        loadCss: function (url) {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = url;
            document.getElementsByTagName("head")[0].appendChild(link);
        }
    };
    return common;
});