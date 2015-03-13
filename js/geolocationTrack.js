	// Global variables.
	var messageAreaElem;
	var watchId;

	var mapArray = [];
	
	// Handles the "Watch Position" button click.
	function doWatch() {
	
		// Test if the browser supports geolocation.
        if (navigator.geolocation) {
				
			// Request for repeated location updates.
            watchId = navigator.geolocation.watchPosition(positionCallback, 
			                                              positionErrorCallback,
			                                              { 
														    enableHighAccuracy: true,	// Default is false.
														    timeout: 5000, 				// Default is infinity.
															maximumAge: 60000			// Default is 0ms.
														  });

			// Tell the "watch position" operation has started.
            messageAreaElem.innerHTML = "Watch " + watchId + " started";
			
        } else {

			// Tell the user the browser does not support geolocation.
            messageAreaElem.innerHTML = "Your browser does not support HTML5 geolocation.";
		}
	}
	
	// Geolocation callback, receives position information.
    function positionCallback(position) {

		var latitude  = position.coords.latitude;		// 0 is the Equator, +ve is north, -ve is south.
        var longitude = position.coords.longitude;		// 0 is the Greenwich Meridian, +ve is east, -ve is west.
		
		var timestamp = new Date();
		timestamp.setTime(position.timestamp);
		
        if (!latitude || !longitude) {
            messageAreaElem.innerHTML = "HTML5 Geolocation is supported in your browser, but location is currently not available.";
			
		} else {

			document.getElementById("latitude").value  = latitude;
			document.getElementById("longitude").value = longitude;
			document.getElementById("timestamp").value = timestamp;
		}

		mapArray.push(position.coords.latitude, position.coords.longitude);

		// alert(mapArray);

    }

	// Geolocation callback, handles position errors.
    function positionErrorCallback(error) {
		messageAreaElem.innerHTML = "Error " + error.code + ", " + error.message;
    }

	// Performs page initialization.
	function onLoad() {
		document.getElementById("watchButton").addEventListener("click", doWatch, true);
		messageAreaElem = document.getElementById("messageArea");
	}
	
	window.addEventListener("load", onLoad, true);
