require('bootstrap');
require('js-marker-clusterer/src/markerclusterer.js');
import './comments.js';

let googleMapsLoader= require('google-maps');
googleMapsLoader.KEY='AIzaSyBD2c0P2K3jpSa98WUOkXIMXXEkwnx5CcY';
googleMapsLoader.LIBRARIES = ['places'];

var markers = [];
var map;
googleMapsLoader.load(function(google){
    var styledMapType = new google.maps.StyledMapType(
        [
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#165c64"
                    },
                    {
                        "saturation": 34
                    },
                    {
                        "lightness": -69
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#b7caaa"
                    },
                    {
                        "saturation": -14
                    },
                    {
                        "lightness": -18
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "landscape.man_made",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#cbdac1"
                    },
                    {
                        "saturation": -6
                    },
                    {
                        "lightness": -9
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#8d9b83"
                    },
                    {
                        "saturation": 89
                    },
                    {
                        "lightness": 22
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#d4dad0"
                    },
                    {
                        "saturation": -88
                    },
                    {
                        "lightness": 54
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#bdc5b6"
                    },
                    {
                        "saturation": -89
                    },
                    {
                        "lightness": -3
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#bdc5b6"
                    },
                    {
                        "saturation": -89
                    },
                    {
                        "lightness": -26
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#c17118"
                    },
                    {
                        "saturation": 61
                    },
                    {
                        "lightness": -45
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#8ba975"
                    },
                    {
                        "saturation": -46
                    },
                    {
                        "lightness": -28
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#a43218"
                    },
                    {
                        "saturation": 74
                    },
                    {
                        "lightness": -51
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.province",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "administrative.neighborhood",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": 0
                    },
                    {
                        "lightness": 100
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#3a3935"
                    },
                    {
                        "saturation": 5
                    },
                    {
                        "lightness": -57
                    },
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi.medical",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#cba923"
                    },
                    {
                        "saturation": 50
                    },
                    {
                        "lightness": -46
                    },
                    {
                        "visibility": "on"
                    }
                ]
            }
        ],
        {name: 'Retro'}
    );

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: new google.maps.LatLng(0,0),
        zoom: 12,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map'],
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_LEFT
        }
    });
    directionsDisplay.setMap(map);
    $(document).on('click', '#submit', function () {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    });

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    // map.controls[google.maps.ControlPosition.TOP_CENTER].push(input);

    // Bias the SearchBox results towards current map's viewport.
    map.addListener('bounds_changed', function () {
        searchBox.setBounds(map.getBounds());
    });

    var search_makers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener('places_changed', function () {
        var places = searchBox.getPlaces();

        if (places.length == 0) {
            return;
        }

        // Clear out the old search_makers.
        search_makers.forEach(function (marker) {
            marker.setMap(null);
        });
        search_makers = [];

        // For each place, get the icon, name and location.
        var bounds = new google.maps.LatLngBounds();
        places.forEach(function (place) {
            if (!place.geometry) {
                console.log("Returned place contains no geometry");
                return;
            }
            var icon = {
                url: place.icon,
                size: new google.maps.Size(71, 71),
                origin: new google.maps.Point(0, 0),
                anchor: new google.maps.Point(17, 34),
                scaledSize: new google.maps.Size(25, 25)
            };

            // Create a marker for each place.
            search_makers.push(new google.maps.Marker({
                map: map,
                icon: icon,
                title: place.name,
                position: place.geometry.location
            }));

            if (place.geometry.viewport) {
                // Only geocodes have viewport.
                bounds.union(place.geometry.viewport);
            } else {
                bounds.extend(place.geometry.location);
            }
        });
        map.fitBounds(bounds);
    });

    var timer;
    map.addListener('bounds_changed', function() {

        if(timer) {
            window.clearTimeout(timer);
        }

        timer = window.setTimeout(function () {
            getCoordinates(google, map);
        }, 500);
    });

    $.getJSON('https://geoip-db.com/json/')
        .done (function(location) {
            var pos = {
                lat: location.latitude,
                lng: location.longitude,
            };
            map.setCenter(pos);
        });

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

    // var panorama = new google.maps.StreetViewPanorama(
    //     document.getElementById('pano'), {
    //         position: fenway,
    //         pov: {
    //             heading: 34,
    //             pitch: 10
    //         }
    //     });
    // map.setStreetView(panorama);
});

var markerCluster;
function getCoordinates( google, map ) {
    var typeArr = [];
    $('.form-check-input:checkbox:checked').each(function () {
        typeArr.push($(this).val());

    });
    var bounds = map.getBounds();
    $.get(
        "/mapcoordinate",
        {
            'bottom_left_lat': bounds.f.b,
            'top_right_lat': bounds.f.f,
            'bottom_left_lng': bounds.b.b,
            'top_right_lng': bounds.b.f,
            'type_ids': typeArr,
        },
        function( data ) {
            deleteCoordinates();

            var infowindow = new google.maps.InfoWindow();

            var marker, i;
            var infoWindowContent = [];
            for (i = 0; i < data.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
                });
                markers.push(marker);
            }
            for (i = 0; i < data.length; i++) {
                var url = "/coordinate/" + data[i].id;
                var waypoint = data[i].latitude + '_' + data[i].longitude;

                infoWindowContent[i] = "<h5>" + data[i].name + "</h5>" +
                    "<div><a href="+url+">Details</a></div>"+
                    "<div><button id=\"point\" value="+waypoint+">Add to route</button></div>";

                var currentMarker = markers[i];
                google.maps.event.addListener(currentMarker, 'click', (function(currentMarker, i) {
                    return function() {
                        infowindow.setContent(infoWindowContent[i]);
                        infowindow.open(map, currentMarker);
                    }
                })(currentMarker, i));
            }
        }
    )
    // clusters
        .done(function( data ) {
            if (typeof markers !== 'undefined' && markers.length > 0) {
                if (markerCluster) {
                    markerCluster.clearMarkers();
                }
                markerCluster = new MarkerClusterer(map, markers, {imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m', maxZoom: "15"});
            }
        });
}
function deleteCoordinates() {
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}

function GetTypes(data){
    var types = '';
    $.ajax({
        type: "POST",
        url: "get-types",
        async: false,
        success: function(data) {
            $.each(data, function(k, v) {
                types += "<div class=\"form-check\"><label class=\"form-check-label dropdown-item\"><input type=\"checkbox\"  value=\""+v['id']+"\" class=\"form-check-input type-checkbox\">"+v['type']+"</label></div>";
            });
        }
    });
    return types;
}

function loadMarkersByType(google, map) {
    $(document).on('click', '.type-checkbox', function () {
        getCoordinates(google, map);
    });
}

function generateDropdownForAllTypes() {
    var dropdownInnerHTML = '';
    dropdownInnerHTML += '<div class="dropdown">\
        <button class="nav-link btn btn-outline-success dropdown-toggle" type="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
        Select type\
        </button>\
        <div class="dropdown-menu" aria-labelledby="navbarDropdown">';
    //Foreach goes here:
    dropdownInnerHTML += GetTypes();
    dropdownInnerHTML += '</div></div>';
    return dropdownInnerHTML;
}
$('#testdrop').html(generateDropdownForAllTypes());
$( ".dropdown-menu" ).change(function() {
    loadMarkersByType(google, map);
});

//directions

$(document).on('click', '#planTrip', function () {
    $("#directions").toggle();
});

$(document).on('click', '#point', function () {
    var pointCoordinates = $(this).val().replace('_', ',');
    var destinationLength = $(".end").length;
    $(".end").each(function(index){
        if((index+1) != destinationLength) {
            if ($(this).val().length === 0) {
                $(this).val(pointCoordinates);
            }
        }else{
            $(this).val(pointCoordinates);
        }
    });
});

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var waypts = [];
    var destinationLength = $(".end").length;
    $(".end").each(function(index){
        if((index+1) != destinationLength) {
            if ($(this).val().length !== 0) {
                waypts.push({
                    location: $(this).val(),
                    stopover: true
                });
            }
        }
    });

    var destination = $('.end').last().val();

    directionsService.route({
        origin: document.getElementById('start').value,
        destination: destination,
        waypoints: waypts,
        optimizeWaypoints: true,
        travelMode: 'DRIVING'

        // function(response, status) {
    //     if (status === 'OK') {
    //         directionsDisplay.setDirections(response);
    //         var route = response.routes[0];
    //         var summaryPanel = document.getElementById('directions-panel');
    //         summaryPanel.innerHTML = '';
    //         // For each route, display summary information.
    //         for (var i = 0; i < route.legs.length; i++) {
    //             var routeSegment = i + 1;
    //             summaryPanel.innerHTML += '<b>Route Segment: ' + routeSegment +
    //                 '</b><br>';
    //             summaryPanel.innerHTML += route.legs[i].start_address + ' to ';
    //             summaryPanel.innerHTML += route.legs[i].end_address + '<br>';
    //             summaryPanel.innerHTML += route.legs[i].distance.text + '<br><br>';
    //         }
    //     } else {
    //         window.alert('Directions request failed due to ' + status);
    //     }
    });
}

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

