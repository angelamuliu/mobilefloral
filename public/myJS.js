


$(document).ready( function() {

	// Setup - Get canvas, set context to 2d mode
	// One day context might support 3d drawing!
	var canvas = $("#myCanvas")[0];
	var context = canvas.getContext("2d");
	var width = canvas.width;
	var height = canvas.height;
	var ongoingTouches = []; // Used to store touches

	var flowerObj1 = new Image();
	flowerObj1.src = 'images/flower1.png';
	var flowerObj2 = new Image();
	flowerObj2.src = 'images/flower2.png';
	var flowerObj3 = new Image();
	flowerObj3.src = 'images/flower3.png';
	var flowerArray = [flowerObj1, flowerObj2, flowerObj3];

	// Canvas recieves listeners
	// Context recieves drawing information

	function drawFlower(event){ 
		event.preventDefault();
		// Choose one of three flower images, and offset it from touch area
		var flower = flowerArray[Math.ceil(Math.random() * 3)-1];
		var x_offset = Math.ceil((Math.random()-0.5) * 100); // Random gives number from 0 - 1, subtract 0.5 to get neg
		var y_offset = Math.ceil((Math.random()-0.5) * 100);

		// Draw image at center of touch event (ish)
		if (event.targetTouches != null) { // TOUCH EVENT
			context.drawImage(flower, 
			event.targetTouches[0].pageX - flower.width/2 + x_offset, 
			event.targetTouches[0].pageY - flower.height/2 + y_offset);
			ongoingTouches.push(event);
		} else { // MOUSE EVENT
			context.drawImage(flower, 
			event.pageX - flower.width/2 + x_offset, 
			event.pageY - flower.height/2 + y_offset);
			ongoingTouches.push(event);
		}
	}

	function addWater(event) {
		event.preventDefault();
		var last_event = ongoingTouches.pop();
		var num_drops = Math.ceil(Math.random() * 20)+3;
		if (last_event.targetTouches != null) { // TOUCH EVENT
			var splash_x = last_event.targetTouches[0].pageX;
			var splash_y = last_event.targetTouches[0].pageY;
		} else { // MOUSE EVENT
		var splash_x = last_event.pageX;
			var splash_y = last_event.pageY;
		}

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

	// Event listener takes event, function to call, and whether or not function 'captures/consumes event'
	// If function consumes, then it doesn't bubble up and effect parent nodes
	canvas.addEventListener('touchstart', drawFlower, false);
	canvas.addEventListener('touchmove', drawFlower, false);
	canvas.addEventListener('touchend', addWater, false);

	// For those on the web
	canvas.addEventListener('mousedown', drawFlower, false);
	canvas.addEventListener('mousemove', drawFlower, false);
	canvas.addEventListener('mouseup', addWater, false);


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