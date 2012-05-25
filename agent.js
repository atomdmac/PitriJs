function Agent(config) {
	var defaults = {
		name: "Agent" + Math.random(),
		brain: new Wanderer(),
		body: new PointMassModel()
	}
	
	// Merge defaults with given config.
	this.state = $.extend({}, defaults, config);
	
	// Public Interface
	this.tick = tick;
	
	// Do initialization here.
	function init() {
		// TODO
	}
	
	// Run the next iteration of the simulation.
	function tick() {
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
	this.state = $.extend({}, defaults, config);
	
	// Public Interface.
	this.move = move;
	
	// Do initialization here.
	function init() {
		// TODO
	}
	
	// Modify the point mass's properties according to the given steering 
		// force.
	function move(steer) {
		// TODO
	}
	
	// Returns a copy of the state object.
	function getState() {
		return $.extend({}, state);
	}
}

function Wanderer(config) {
	// Defaults
	var defaults = {
		target: getTarget()
	}
	
	// Merge defaults with config to form state.
	this.state = $.extend({}, defaults, config);
	
	// Public Interface.
	this.tick = tick;
	
	// Decides where to move to next based on the current target position and other environmental factors.
	function tick(steer) {
		// TODO
	}
	
	// Return a random target to move toward.
	function getTarget() {
		// TODO
	}
}
