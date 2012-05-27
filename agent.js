PITRI.Agent = function(config) 
{
	var defaults = {
		name: "Agent" + Math.random(),
		brain: new PITRI.Wanderer({agent:this}),
		body: new PITRI.PointMassModel({agent:this})
	}
	
	// Internal reference to self.
	var me = this;
	
	// Merge defaults with given config.
	me.state = $.extend({}, defaults, config);
	
	// Do initialization here.
	me.init = function() 
	{
		// TODO
	}
	
	// Run the next iteration of the simulation.
	me.tick = function() 
	{
		// TODO: How will the brain and the body share state information?
		me.state.brain.think();
		me.state.body.move();
	}
	
	// Initialize.
	me.init();
}

PITRI.PointMassModel = function(config) 
{
	var defaults = {
		maxSpeed: 10,
		maxForce: 1,
		steer: new Vector(0,0),
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
	me.init = function() 
	{
		// TODO
	}
	
	// Modify the point mass's properties according to the given steering 
		// force.
	me.move = function() 
	{
		var steer = config.agent.state.body.state.steer;
		me.state.accel.x = (steer.x / me.state.mass, steer.x / me.state.mass);
		me.state.accel.y = (steer.y / me.state.mass, steer.y / me.state.mass);
		me.state.velocity.add(me.state.accel);
		me.state.position.add(me.state.velocity);
	}
	
	// Initialize.
	me.init();
}

PITRI.Wanderer = function(config) 
{
	// Defaults
	var defaults = {
		// Blank for now!
	}
	
	// Internal reference to self.
	var me = this;
	
	// Merge defaults with config to form state.
	me.state = $.extend({}, defaults, config);
	
	// Do initialization here.
	me.init = function() 
	{
		// Acquire a random target.
		me.state.target = me.getNewTarget();
	}
	
	// Decides where to move to next based on the current target position and other environmental factors.
	me.think = function() 
	{
		var pos = config.agent.state.body.state.position;
		config.agent.state.steer = pos.sub(me.state.target);
		config.agent.state.steer.normalize();
	}
	
	// Return a random target to move toward.
	me.getNewTarget = function() 
	{	
		var x = Math.randInt(0, 400);
		var y = Math.randInt(0, 400);
		
		return new Vector(x,y);
	}
	
	// Initialize.
	me.init();
}