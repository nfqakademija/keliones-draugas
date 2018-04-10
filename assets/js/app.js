require('bootstrap');

let googleMapsLoader= require('google-maps');
googleMapsLoader.KEY='AIzaSyBD2c0P2K3jpSa98WUOkXIMXXEkwnx5CcY';

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
		{name: 'Rozeciu taskai'}
		);

	var map = new google.maps.Map(document.getElementById('googleMap'), {
		center: new google.maps.LatLng(0,0),
		zoom: 12,
		mapTypeControlOptions: {
			mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain',
			'styled_map']
		}
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
		});
	}


	map.mapTypes.set('styled_map', styledMapType);
	map.setMapTypeId('styled_map');

	var locations = [
	['DOMUS Pro-2, Bieliūnų g. Vilnius 12110', 54.739160, 25.226166, 21],
	['Pupa-2, Priegliaus g. 1, Vilnius 06269', 54.7098987,25.1851605, 20],
	['2BH IKI Seskine1, Šeškinės g. 32, Vilnius 07157', 54.7155273,25.2432311, 19],
	['4BH IKI Mada1, Viršuliškių g. 40, Vilnius 05112', 54.708046,25.2254403, 17],
	['NORFA Parodu-2, Parodų g. 1A, 04215 Vilnius', 54.6734191,25.2219382, 16],
	['Crown Plaza-1, KM. K. Čiurlionio 84, Vilnius 03100', 54.6818721,25.2484853, 15],
	['RIMI Savanoriai-4, Kedrų g. 4, Vilnius 03116', 54.675484,25.2546494, 14],
	['IKI Mindaugo-2, Mindaugo g. 25, Vilnius 03214', 54.6732299,25.2724761, 13],
	['Green Hall-2, Upės g. 21, 08128 Vilnius', 54.695601,25.2576826, 12],
	['K29-4, Konstitucijos pr. 29, Vilnius 08105', 54.6995679,25.2628141, 11],
	['Quadrum-2, Konstitucijos pr. 21, 08130 Vilnius', 54.6981808,25.2687508, 10],
	['Žalgirio 135-1, Žalgirio g. 135, 08217 Vilnius', 54.7048838,25.2694691, 9],
	['VC City-1, Žalgirio g. 90, 09303 Vilnius', 54.703708,25.2759581, 8],
	['RIMI Žirmūnai-1, Žirmūnų g. 64, Vilnius 09131', 54.7123504,25.2999408, 6],
	['RIMI Jeruzale-1, Jeruzalės g. 4, Vilnius 08420', 54.7401342,25.272418, 5],
	['1BH IKI Didlaukio1, Didlaukio g. 80A, Vilnius 08326', 54.7288717,25.2671024, 4],
	['Technopolis-1, Juozo Balčikonio g. 3, 08247 Vilnius', 54.7194348,25.2817066, 3],
	['IKI Antakalnis-2, Nemenčinės pl. 2, Vilnius 10103', 54.724224,25.3177139, 2],
	['3BH IKI Sauletekis, Saulėtekio al. 43, Vilnius 10227', 54.7221331,25.342193, 1]
	];

	var infowindow = new google.maps.InfoWindow();

	var marker, i;
	for (i = 0; i < locations.length; i++) {
		marker = new google.maps.Marker({
			position: new google.maps.LatLng(locations[i][1], locations[i][2]),
			map: map
		});

		google.maps.event.addListener(marker, 'click', (function(marker, i) {
			return function() {
				infowindow.setContent(locations[i][0]);
				infowindow.open(map, marker);
			}
		})(marker, i));
	}
});

