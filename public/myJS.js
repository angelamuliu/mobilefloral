
$(document).ready( function() {

	// Setup - Get canvas, set context to 2d mode
	// One day context might support 3d drawing!
	var canvas = $("#myCanvas")[0];
	var context = canvas.getContext("2d");

	// Canvas recieves listeners
	// Context recieves drawing information

	function start(event){ 
		console.log("TEST");
		event.preventDefault();
		context.beginPath();
		context.arc(95,50,40,0,2*Math.PI);
		context.stroke();
	}

	// Event listener takes event, function to call, and whether or not function 'captures/consumes event'
	// If function consumes, then it doesn't bubble up and effect parent nodes
	canvas.addEventListener('touchstart', start, false);


})

