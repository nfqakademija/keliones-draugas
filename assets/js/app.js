require('bootstrap');
require('js-marker-clusterer/src/markerclusterer.js');
import './comments.js';
import './jquery-3.3.1'
import './jquery-ui'
import './directions';

let googleMapsLoader= require('google-maps');
googleMapsLoader.KEY='AIzaSyBD2c0P2K3jpSa98WUOkXIMXXEkwnx5CcY';
googleMapsLoader.LIBRARIES = ['places'];

var markers = [];
var map;
googleMapsLoader.load(function(google){
    var styledMapType = new google.maps.StyledMapType(
        [
            {
                "featureType": "administrative.locality",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#2c2e33"
                    },
                    {
                        "saturation": 7
                    },
                    {
                        "lightness": 19
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "saturation": "-3"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#f39247"
                    }
                ]
            },
            {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": -100
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
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#ffffff"
                    },
                    {
                        "saturation": -100
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
                "featureType": "poi.school",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#f39247"
                    },
                    {
                        "saturation": "0"
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
                        "hue": "#ff6f00"
                    },
                    {
                        "saturation": "100"
                    },
                    {
                        "lightness": 31
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "color": "#f39247"
                    },
                    {
                        "saturation": "0"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#008eff"
                    },
                    {
                        "saturation": -93
                    },
                    {
                        "lightness": 31
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry.stroke",
                "stylers": [
                    {
                        "visibility": "on"
                    },
                    {
                        "color": "#f3dbc8"
                    },
                    {
                        "saturation": "0"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels",
                "stylers": [
                    {
                        "hue": "#bbc0c4"
                    },
                    {
                        "saturation": -93
                    },
                    {
                        "lightness": -2
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "geometry",
                "stylers": [
                    {
                        "hue": "#e9ebed"
                    },
                    {
                        "saturation": -90
                    },
                    {
                        "lightness": -8
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#e9ebed"
                    },
                    {
                        "saturation": 10
                    },
                    {
                        "lightness": 69
                    },
                    {
                        "visibility": "on"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                    {
                        "hue": "#e9ebed"
                    },
                    {
                        "saturation": -78
                    },
                    {
                        "lightness": 67
                    },
                    {
                        "visibility": "simplified"
                    }
                ]
            }
        ],
        {name: 'Orange'}
    );

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    map = new google.maps.Map(document.getElementById('googleMap'), {
        center: new google.maps.LatLng(0,0),
        zoom: 12,
        streetViewControl: false,
        zoomControl: true,
        zoomControlOptions: {
            position: google.maps.ControlPosition.RIGHT_TOP
        },
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
                if (data[i].imageName) {
                        infoWindowContent[i] = infoWindowContent[i] +
                            "<img src='" + data[i].imageName + "' height=\"80\" width=\"80\"/>";
                    }

                var currentMarker = markers[i];
                google.maps.event.addListener(currentMarker, 'click', (function(currentMarker, i) {
                    return function() {
                        infowindow.setContent("<div class='info-window'>"+infoWindowContent[i]+"</div>");
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
        type: "GET",
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
        <button class="nav-link btn dropdown-toggle" style="background-color:#FF9F1C;" type="button" id="navbarDropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
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
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}


