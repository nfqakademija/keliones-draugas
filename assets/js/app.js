require('bootstrap');

let googleMapsLoader= require('google-maps');
googleMapsLoader.KEY='AIzaSyBD2c0P2K3jpSa98WUOkXIMXXEkwnx5CcY';

var markers = [];

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
        {name: 'Paslaugų tiekėjai'}
    );

    var map = new google.maps.Map(document.getElementById('googleMap'), {
        center: new google.maps.LatLng(0,0),
        zoom: 12,
        mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
                'styled_map']
        }
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


    infoWindow = new google.maps.InfoWindow;


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
        }, function() {
            $.getJSON('https://geoip-db.com/json/')
                .done (function(location) {
                    var pos = {
                        lat: location.latitude,
                        lng: location.longitude,
                    };
                    infoWindow.open(map);
                    map.setCenter(pos);
                });

        });
    }

    map.mapTypes.set('styled_map', styledMapType);
    map.setMapTypeId('styled_map');

});




function getCoordinates( google, map ) {

    var bounds = map.getBounds();
    $.get(
        "/mapcoordinate",
        {
            'bottom_left_lat': bounds.f.b,
            'top_right_lat': bounds.f.f,
            'bottom_left_lng': bounds.b.b,
            'top_right_lng': bounds.b.f
        },
        function( data ) {
            deleteCoordinates();
            var infowindow = new google.maps.InfoWindow();


            var marker, i;
            var infoWindowContent = [];
            for (i = 0; i < data.length; i++) {
                marker = new google.maps.Marker({
                    position: new google.maps.LatLng(data[i].latitude, data[i].longitude),
                    map: map
                });
                markers.push(marker);
            }
            for (i = 0; i < data.length; i++) {
                var url = "/coordinate/" + data[i].id;
                infoWindowContent[i] = "<h5>" + data[i].name + "</h5>" +
                    "<div><a href="+url+">Plačiau</a></div>";

                var currentMarker = markers[i];
                google.maps.event.addListener(currentMarker, 'click', (function(currentMarker, i) {
                    return function() {
                        infowindow.setContent(infoWindowContent[i]);
                        infowindow.open(map, currentMarker);
                    }
                })(currentMarker, i));
            }
        }
    );


}

function deleteCoordinates() {
    //Loop through all the markers and remove
    for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}


