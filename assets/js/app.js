require('bootstrap');
import './comments.js';

let googleMapsLoader= require('google-maps');
googleMapsLoader.KEY='AIzaSyBD2c0P2K3jpSa98WUOkXIMXXEkwnx5CcY';
googleMapsLoader.LIBRARIES = ['places'];

var markers = [];

googleMapsLoader.load(function(google){
    var styledMapType = new google.maps.StyledMapType(
        [
            {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
            {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
            {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
            {
                featureType: 'administrative',
                elementType: 'geometry.stroke',
                stylers: [{color: '#c9b2a6'}]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'geometry.stroke',
                stylers: [{color: '#dcd2be'}]
            },
            {
                featureType: 'administrative.land_parcel',
                elementType: 'labels.text.fill',
                stylers: [{color: '#ae9e90'}]
            },
            {
                featureType: 'landscape.natural',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'poi',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'poi',
                elementType: 'labels.text.fill',
                stylers: [{color: '#93817c'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'geometry.fill',
                stylers: [{color: '#a5b076'}]
            },
            {
                featureType: 'poi.park',
                elementType: 'labels.text.fill',
                stylers: [{color: '#447530'}]
            },
            {
                featureType: 'road',
                elementType: 'geometry',
                stylers: [{color: '#f5f1e6'}]
            },
            {
                featureType: 'road.arterial',
                elementType: 'geometry',
                stylers: [{color: '#fdfcf8'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry',
                stylers: [{color: '#f8c967'}]
            },
            {
                featureType: 'road.highway',
                elementType: 'geometry.stroke',
                stylers: [{color: '#e9bc62'}]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry',
                stylers: [{color: '#e98d58'}]
            },
            {
                featureType: 'road.highway.controlled_access',
                elementType: 'geometry.stroke',
                stylers: [{color: '#db8555'}]
            },
            {
                featureType: 'road.local',
                elementType: 'labels.text.fill',
                stylers: [{color: '#806b63'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.fill',
                stylers: [{color: '#8f7d77'}]
            },
            {
                featureType: 'transit.line',
                elementType: 'labels.text.stroke',
                stylers: [{color: '#ebe3cd'}]
            },
            {
                featureType: 'transit.station',
                elementType: 'geometry',
                stylers: [{color: '#dfd2ae'}]
            },
            {
                featureType: 'water',
                elementType: 'geometry.fill',
                stylers: [{color: '#b9d3c2'}]
            },
            {
                featureType: 'water',
                elementType: 'labels.text.fill',
                stylers: [{color: '#92998d'}]
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

    // Create the search box and link it to the UI element.
    var input = document.getElementById('pac-input');
    var searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

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

    function CenterControl(controlDiv, map) {
        // Set CSS for the control border.
        var controlUI = document.createElement('div');
        controlUI.style.backgroundColor = '#fff';
        controlUI.style.border = '2px solid #fff';
        controlUI.style.borderRadius = '3px';
        controlUI.style.boxShadow = '0 2px 6px rgba(0,0,0,.3)';
        controlUI.style.cursor = 'pointer';
        controlUI.style.marginBottom = '22px';
        controlUI.style.textAlign = 'center';
        controlUI.title = 'Click to recenter the map';
        controlDiv.appendChild(controlUI);

        // Set CSS for the control interior.
        var controlText = document.createElement('div');
        controlText.style.color = 'rgb(25,25,25)';
        controlText.style.fontFamily = 'Roboto,Arial,sans-serif';
        controlText.style.fontSize = '16px';
        controlText.style.lineHeight = '38px';
        controlText.style.paddingLeft = '5px';
        controlText.style.paddingRight = '5px';
        controlText.innerHTML = generateDropdownForAllTypes();
        controlUI.appendChild(controlText);
        loadMarkersByType(google, map);
    }

    var centerControlDiv = document.createElement('div');
    var centerControl = new CenterControl(centerControlDiv, map);

    centerControlDiv.index = 1;
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(centerControlDiv);
});

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
        <button class="btn btn-danger dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\
        Dropdown button\
        </button>\
        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">';
    //Foreach goes here:
    dropdownInnerHTML += GetTypes();
    dropdownInnerHTML += '</div></div>';
    return dropdownInnerHTML;
}

