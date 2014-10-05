
// Canvas recieves listeners
// Context recieves drawing information

$(document).ready( function() {

	// ---------------------------------------------
	// SETUP
	// ---------------------------------------------

	// Setup - Get canvas, set context to 2d mode
	// One day context might support 3d drawing!
	var canvas = $("#myCanvas")[0];
	var context = canvas.getContext("2d");

	// Load assets
	var flowerObj1 = new Image();
	flowerObj1.src = 'images/flower1.png';
	var flowerObj2 = new Image();
	flowerObj2.src = 'images/flower2.png';
	var flowerObj3 = new Image();
	flowerObj3.src = 'images/flower3.png';
	var flowerArray = [flowerObj1, flowerObj2, flowerObj3];

	var ongoingTouches = []; // Used to store touches. Default to empty
	loadDataFromLocalStorage(); // Load touch array from local storage

	flowerObj3.onload = function() {
		// Render a starting flower cluster based on previous (saved) touch events
		// But first make sure the flower images have floaded!
        renderFlower();
      };

	// ---------------------------------------------
	// EVENT LISTENERS
	// ---------------------------------------------

	// Event listener takes event, function to call, and whether or not function 'captures/consumes event'
	// If function consumes, then it doesn't bubble up and effect parent nodes
	canvas.addEventListener('touchstart', drawFlower, false);
	canvas.addEventListener('touchmove', drawFlower, false);
	canvas.addEventListener('touchend', addWater, false);

	// For those on the web
	canvas.addEventListener('mousedown', drawFlower, false);
	canvas.addEventListener('mousemove', drawFlower, false);
	canvas.addEventListener('mouseup', addWater, false);

	// Clearing canvas, both locally cached touch array and canvas image
	$("#clear").click( function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		ongoingTouches = [];
		localStorage.setItem("ongoingTouches", JSON.stringify(ongoingTouches));
		console.log("Reset stored touches to empty array");
	})

	// ---------------------------------------------
	// FUNCTIONS AND BUTTONS
	// ---------------------------------------------

	function drawFlower(event){ 
		event.preventDefault();
		// Choose one of three flower images, and offset it from touch area
		var flower = flowerArray[Math.ceil(Math.random() * 3)-1];
		var x_offset = Math.ceil((Math.random()-0.5) * 100); // Random gives number from 0 - 1, subtract 0.5 to get neg
		var y_offset = Math.ceil((Math.random()-0.5) * 100);

		// Draw image at center of touch event (ish)
		if (event.targetTouches != null) { // TOUCH EVENT
			var coords = [ event.targetTouches[0].pageX + x_offset, event.targetTouches[0].pageY + y_offset ];
			context.drawImage(flower, 
			coords[0] - flower.width/2, 
			coords[1] - flower.height/2);
			ongoingTouches.push(coords); // Need to push array because pushing object results in circular array error
			saveDataToLocalStorage();
		} else { // MOUSE EVENT
			var coords = [ event.pageX + x_offset, event.pageY + y_offset];
			context.drawImage(flower, 
			coords[0] - flower.width/2, 
			coords[1] - flower.height/2);
			ongoingTouches.push(coords);
		}
	}

	function addWater(event) {
		event.preventDefault();
		var last_event = ongoingTouches.pop();
		var num_drops = Math.ceil(Math.random() * 20)+3;
		var splash_x = last_event[0]
		var splash_y = last_event[1];

		for (var i=0; i < num_drops; i++) {
			var x_offset = Math.ceil((Math.random()-0.5) * 200);
			var y_offset = Math.ceil((Math.random()-0.5) * 200);
			var radius = Math.ceil(Math.random() * 5)+1;
			context.beginPath(); // If you don't indicate start/end of path, they'll connect
			context.arc(splash_x - x_offset, splash_y - y_offset/2, radius, 0, 2*Math.PI, true);
			context.closePath();
			var fill = Math.random() + 0.1;
			context.fillStyle = "rgba(255, 255, 255," + fill + ")"; // white 50%
			context.fill();
		}
	}

	// Resets touch array to empty for local storage
	function clearData(ongoingTouches) {
		// ongoingTouches = [];
		// localStorage.setItem("ongoingTouches", JSON.stringify(ongoingTouches));
		console.log("Reset canvas stored touches to empty array");
	}

	function saveDataToLocalStorage() {
		// Convert entire ongoingTouches array, and store it to localStorage
		// JSON.stringify -> Converts param into JSON savable state
		// Since json is key/pair, we need to set one key to point to array
		localStorage.setItem("ongoingTouches", JSON.stringify(ongoingTouches));
	}

	// Loads a local ongoingTouches array from local storage to use
	function loadDataFromLocalStorage() {
		// If prev touch array has been stored to localStorage
		if (localStorage.ongoingTouches && JSON.parse(localStorage.ongoingTouches)) {
			// retrieve and parse the JSON
			var retrievedData = localStorage.getItem("ongoingTouches");
			ongoingTouches = JSON.parse(retrievedData);
		}
	}

	// Called once: Renders a flower(s) based on the local stored touch array
	function renderFlower() {
		for (var i=0; i < ongoingTouches.length; i++) {
			var flower = flowerArray[Math.ceil(Math.random() * 3)-1];
			var x = ongoingTouches[i][0];
			var y = ongoingTouches[i][1];
			context.drawImage(flower, 
				x - flower.width/2,
				y - flower.height/2);
		}
	}

	// ---------------------------------------------
	// OTHER
	// ---------------------------------------------

	// If a new version of the app is available, the update the cached version
	window.applicationCache.addEventListener('updateready',function(){
		window.applicationCache.swapCache();
		location.reload();
	});

})

// JS References

// Event basics and good example: 
// http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/

// Event params documentation
// https://developer.mozilla.org/en-US/docs/Web/API/EventTarget.addEventListener

// Loading images in Canvas
// http://www.html5canvastutorials.com/tutorials/html5-canvas-images/

// Get canvas width / height
// http://stackoverflow.com/questions/4032179/how-do-i-get-the-width-and-height-of-a-html5-canvas

// Touch events
// https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Touch_events

// HTML: Web CLips (favicons) for mobile devices
//https://developer.apple.com/library/ios/documentation/AppleApplications/Reference/SafariWebContent/ConfiguringWebApplications/ConfiguringWebApplications.html

// Storing arrays in localstorage
// http://www.kirupa.com/html5/storing_and_retrieving_an_array_from_local_storage.htm






