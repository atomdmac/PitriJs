function Agent(config) {
	var defaults = {
		name: "Agent" + Math.random(),
		brain: new Wanderer(),
		body: new PointMassModel()
	}
	
	// Internal reference to self.
	var me = this;
	
	// Merge defaults with given config.
	me.state = $.extend({}, defaults, config);
	
	// Do initialization here.
	me.init = function() {
		// TODO
	}
	
	// Run the next iteration of the simulation.
	me.tick = function() {
		// TODO
	}
	
	// Initialize.
	me.init();
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
	
	// Internal reference to self.
	var me = this;
	
	// Merge defaults with given.
	me.state = $.extend({}, defaults, config);
	
	// Do initialization here.
	me.init = function() {
		// TODO
	}
	
	// Modify the point mass's properties according to the given steering 
		// force.
	me.move = function(steer) {
		// TODO
	}
	
	// Initialize.
	me.init();
}

function Wanderer(config) {
	// Defaults
	var defaults = {
		// Blank for now!
	}
	
	// Internal reference to self.
	var me = this;
	
	// Merge defaults with config to form state.
	me.state = $.extend({}, defaults, config);
	
	// Do initialization here.
	me.init = function() {
		// TODO
	}
	
	// Decides where to move to next based on the current target position and other environmental factors.
	me.tick = function(steer) {
		// TODO
	}
	
	// Return a random target to move toward.
	me.getTarget = function() {
		// TODO
	}
	
	// Initialize.
	me.init();
}
