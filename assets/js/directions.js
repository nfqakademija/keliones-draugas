function gmapsAutocomplete() {
    for(var a=document.getElementsByClassName("autocomplete"), b=0;
        b<a.length;
        b++)new google.maps.places.Autocomplete(a[b], {
            types: ["geocode"]
        }
    )
}
if(!function(a) {
    function b(a, b) {
        if(!(a.originalEvent.touches.length>1)) {
            a.preventDefault();
            var c=a.originalEvent.changedTouches[0], d=document.createEvent("MouseEvents");
            d.initMouseEvent(b, !0, !0, window, 1, c.screenX, c.screenY, c.clientX, c.clientY, !1, !1, !1, !1, 0, null), a.target.dispatchEvent(d)
        }
    }
    if(a.support.touch="ontouchend"in document,
        a.support.touch) {
        var c, d=a.ui.mouse.prototype, e=d._mouseInit, f=d._mouseDestroy;
        d._touchStart=function(a) {
            var d=this;
            !c&&d._mouseCapture(a.originalEvent.changedTouches[0])&&(c=!0, d._touchMoved=!1, b(a, "mouseover"), b(a, "mousemove"), b(a, "mousedown"))
        }
            ,
            d._touchMove=function(a) {
                c&&(this._touchMoved=!0, b(a, "mousemove"))
            }
            ,
            d._touchEnd=function(a) {
                c&&(b(a, "mouseup"), b(a, "mouseout"), this._touchMoved||b(a, "click"), c=!1)
            }
            ,
            d._mouseInit=function() {
                var b=this;
                b.element.bind( {
                        touchstart: a.proxy(b, "_touchStart"), touchmove: a.proxy(b, "_touchMove"), touchend: a.proxy(b, "_touchEnd")
                    }
                ),
                    e.call(b)
            }
            ,
            d._mouseDestroy=function() {
                var b=this;
                b.element.unbind( {
                        touchstart: a.proxy(b, "_touchStart"), touchmove: a.proxy(b, "_touchMove"), touchend: a.proxy(b, "_touchEnd")
                    }
                ),
                    f.call(b)
            }
    }
}
(jQuery),
"undefined"==typeof MauticSDKLoaded) {
    var MauticSDKLoaded=!0, head=document.getElementsByTagName("head")[0], script=document.createElement("script");
    script.type="text/javascript", script.src="https://inbound.controlledoverflow.com/mapped.me/media/js/mautic-form.js", script.onload=function() {
        MauticSDK.onLoad()
    }
        ,
        head.appendChild(script);
    var MauticDomain="https://inbound.controlledoverflow.com",
        MauticLang= {
            submittingMessage: "Email sent!"
        }
}
$(window).bind("load",
    function() {
        gmapsAutocomplete(), $(".waypoints").sortable( {
                items: "li:not(:last)", handle: ".move", cancel: "input", axis: "y", containment: "parent"
            }
        ),
            $(".waypoints").on("click",
                ".entry .add",
                function() {
                    $(this).parent().find("input").val()&&($(this).parent().clone().appendTo(".waypoints").find("input").val("").attr("placeholder", "Insert a destination"), $(this).hide(), $(this).parent().find(".remove, .move").show(), $(".submit").addClass("visible"), $("body").css("padding-bottom", $(".submit").outerHeight()+30), $("html, body").animate( {
                            scrollTop: $(document).height()
                        }
                        ,
                        1e3),
                        $("footer").removeClass("visible"),
                        gmapsAutocomplete())
                }
            ),
            $(".waypoints").on("click",
                ".entry .remove",
                function() {
                    $(this).parent().remove(), gmapsAutocomplete(), $(".waypoints li").length<2&&($(".submit").removeClass("visible"), $("body").css("padding-bottom", 0), $("footer").addClass("visible"), $(".waypoints li").find("input").attr("placeholder", "Starting address or city"))
                }
            ),
            $(".submit a").on("click",
                function(a) {
                    var b="https://www.google.com/maps/dir", c="";
                    $(".waypoints li").each(function() {
                            c=c+"/"+$(this).find("input").val()
                        }
                    ),
                        c=c.split(" ").join("+"),
                        $(this).attr("href",
                            b+c),
                        setTimeout(function() {
                                $(".email").css("display", "flex")
                            }
                            ,
                            2e3);
                    var d=c.split("/").join("!");
                    $("#mauticform_input_directions_link").val(d)
                }
            ),
            $(".dialog-close").on("click",
                function() {
                    $(this).closest(".dim").fadeOut(200), $(".submit a").attr("href", "directions")
                }
            )
    }
);