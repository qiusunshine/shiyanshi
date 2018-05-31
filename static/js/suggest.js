function getData(e) {
    var a = e.s;
    var c = $(".suggesst-words");
    var b = "";
    if (a.length == 0) {
        c.hide()
    } else {
        if (a.length > 5) {
            for (var d = 0; d < 5; d++) {
                b += "<li style='list-style: none'>" + a[d] + "</li>"
            }
            c.show();
            c.find("ul").html(b)
        } else {
            for (var d = 0; d < a.length; d++) {
                b += "<li style='list-style: none'>" + a[d] + "</li>"
            }
            c.show();
            c.find("ul").html(b)
        }
    }
}

var searchResultNum = -1;
(function () {
    function b(e) {
        console.log(e)
    }

    function d(f) {
        var e = {
            wd: f,
            p: "3",
            cb: "getData",
            t: new Date().getMilliseconds().toString()
        };
        $.ajax({
            async: false,
            url: "http://suggestion.baidu.com/su",
            type: "GET",
            dataType: "jsonp",
            jsonp: "jsoncallback",
            data: e,
            timeout: 500,
            success: function () {
            },
            error: function () {
            }
        })
    }

    function c() {
        var f = $("#search_text");
        var g = $(".suggesst-words");
        f.on("keyup", function (h) {
            var i = h.keyCode;
            var j = f.val();
            var k = g.find("li");
            if (j != "") {
                if (i >= 65 && i <= 90 || i >= 48 && i <= 57 || i >= 96 && i <= 111 || i >= 186 && i <= 222 || i == 8 || i == 46 || i == 32) {
                    d(j);
                    searchResultNum = -1
                } else {
                    if (i == 40) {
                        searchResultNum = searchResultNum + 1;
                        if (searchResultNum > k.length - 1) {
                            searchResultNum = 0
                        }
                        if (k.length > 0) {
                            e(searchResultNum)
                        }
                        enterFlag = "false"
                    } else {
                        if (i == 38) {
                            searchResultNum = searchResultNum - 1;
                            if (searchResultNum <= -1) {
                                searchResultNum = k.length - 1
                            }
                            if (k.length > 0) {
                                e(searchResultNum)
                            }
                            enterFlag = "false"
                        } else {
                            if (i == 13) {
                                g.hide();
                                enterFlag = "true";
                                h.stopPropagation()
                            }
                        }
                    }
                }
            } else {
                g.hide()
            }
        });
        g.on("click", "li", function (h) {
            var i = h.target;
            f.val(i.innerHTML).focus();
            g.hide();
            h.stopPropagation()
        });
        $(document).on("click", function () {
            g.hide()
        });

        function e(i) {
            var h = $(".suggesst-words").find("li").eq(i);
            h.addClass("active").siblings("li").removeClass("active");
            f.val(h.html())
        }
    }
    c();
})();