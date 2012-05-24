this.Agent = function(config) {
	var defaults = {
		
	}
}

function PointMassModel(config) {
	var defaults = {
		maxSpeed: 10,
		maxForce: 1,
		position: new Vector(0,0),
		velocity: new Vector(0,0),
		accel: new Vector(0,0)
	}
	
	// Merge defaults with given.
	var state = $.extend({}, defaults, config);
	
	function init() {
		// Do initialization here.
	}
	
	function move(steer) {
		// Modify the point mass's properties according to the given steering 
		// force.
	}
}

function Wanderer(config) {
	// Implement functionality for wanderer behavior.
}
