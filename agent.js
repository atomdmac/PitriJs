this.Agent = function(config) {
	var defaults = {
		name: "Agent" + Math.random(),
	}
	
	// Merge defaults with given config.
	var state = $.extend({}, defaults, config);
	
	function init() {
		// TODO
	}
}

function PointMassModel(config) {
	var defaults = {
		maxSpeed: 10,
		maxForce: 1,
		position: new Vector(0,0),
		velocity: new Vector(0,0),
		accel: new Vector(0,0),
		mass: 1
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
	
	// Decides where to move to next based on the current target position and other environmental factors.
	function think(steer) {
		// TODO
	}
	
	// Return a random target to move toward.
	function getTarget() {
		// TODO
	}
}
