
$(document).ready( function() {

	document.ontouchmove = function(e){ e.preventDefault(); }

	// Setup - Get canvas, set context to 2d (one day in the future, 3d canvases!! but not yet.)
	var c = document.getElementById("myCanvas");
	var ctx = c.getContext("2d");

	ctx.ontouchstart = function(event){ 
		console.lot("TEST");
		event.preventDefault();
		ctx.beginPath();
		ctx.arc(95,50,40,0,2*Math.PI);
		ctx.stroke();
	}

})