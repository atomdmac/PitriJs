PITRI.Agent = function(_config) 
{
	// Internal reference to self.
	var me = this;
	
	var defaultConfig = {
		name: "Agent" + Math.random(),
		navigator:  PITRI.RandomNav,
		locomotor:  PITRI.PointMassLoco,
		skin:  PITRI.GenericAgentSkin
	}
	
	var defaultState = {
		navigator: null,
		locomotor: null,
		skin: null,
	}
	
	// Merge default config with given config.
	me.config = $.extend(true, {}, defaultConfig, _config);
	
	// Merge default state with given state.
	me.state = $.extend(true, {}, defaultState);
	
	// Do initialization here.
	me.init = function() 
	{
		// Initialize state.
		me.state = {
			navigator: new me.config.navigator({agent:this}),
			locomotor: new me.config.locomotor({agent:this}),
			skin: new me.config.skin({agent:this})
		}
	}
	
	// Run the next iteration of the simulation.
	me.tick = function() 
	{
		// TODO: How will the navigator and the locomotor share state information?
		me.state.navigator.think();
		me.state.locomotor.move();
	}
	
	// Initialize.
	me.init();
}

PITRI.PointMassLoco = function(_config) 
{
	// Internal reference to self.
	var me = this;
	
	// If not specified in _config, use these defaults.
	var defaultConfig = {
		// Reference to the parent agent.  (Should be set when instantiated).
		agent: null,
		// Max speed that the point mass can move at.
		maxSpeed: 5,
		// Max force that the point mass can impose on itself.
		maxForce: 10,
		// Contains initialization information.
		init: {
			position: {x:0, y:0},
			velocity: {x:0, y:0},
			accel: {x:0, y:0},
			mass: 10
		}
	}
	
	// Copy these properties to me.state before initialization.
	var defaultState = {
		position: null,
		velocity: null,
		accel: null,
		inertia: null,
		mass: null
	}
	
	// Merge default config with given config.
	me.config = $.extend({}, defaultConfig, _config);
	
	// Merge default state with given state.
	me.state = $.extend({}, defaultState);
	
	// Do initialization here.
	me.init = function() 
	{
		console.log(me.config.init.position.x);
		
		// Initialize state.
		me.state.position = new Vector(me.config.init.position.x,
									   me.config.init.position.y)
		me.state.velocity = new Vector(me.config.init.velocity.x,
									   me.config.init.velocity.y)
		me.state.accel = new Vector(me.config.init.accel.x,
									me.config.init.accel.y)
		me.state.mass = me.config.init.mass;
		
		console.log(me.state);
	}
	
	// Modify the point mass's properties according to the given steering 
	// force.
	me.move = function() 
	{
		var steer = me.config.agent.state.navigator.state.steer;
		
		// Calculate acceleration and truncate to maxAccel.
		me.state.accel.x = (steer.x / me.state.mass);
		me.state.accel.y = (steer.y / me.state.mass);
		
		// Calculate and truncate speed.
		me.state.velocity = me.state.velocity.add(me.state.accel);
		me.state.velocity.trunc(me.state.maxSpeed);
		
		// Move me!
		me.state.position = me.state.position.add(me.state.velocity);
	}
	
	// Initialize.
	me.init();
}

PITRI.RandomNav = function(_config) 
{
	// Internal reference to self.
	var me = this;
	
	// Defaults
	var defaultConfig = {
		steer: new Vector(0,0),
		targetDist: 40,
		maxDist: 80
	}
	
	// If not specified in _config, use these defaults.
	var defaultConfig = {
		// Reference to the parent agent.  (Should be set when instantiated).
		agent: null,
		// Distance from agent that is considered "arrival".
		targetDistance: 5,
		// Max distance from the agent that the target can be.
		maxDistance: 10,
		// Contains initialization information.
		init: {
			target: {x:0, y:0}
		}
	}
	
	// Copy these properties to me.state before initialization.
	var defaultState = {
		steer: null,
		target: null
	}
	
	// Merge default config with given config.
	me.config = $.extend({}, defaultConfig, _config);
	
	// Merge default state with given state.
	me.state = $.extend({}, defaultState);
	
	// Do initialization here.
	me.init = function() 
	{
		// Acquire a random target.
		me.state.target = me.getNewTarget();
		me.state.steer = new Vector(0,0);
	}
	
	// Decides where to move to next based on the current target position and other environmental factors.
	me.think = function() 
	{
		var locomotor = me.config.agent.state.locomotor;
		
		// Do I need to choose a new target yet?
		var distance = me.state.target.sub(locomotor.state.position);
		distance = distance.len();
		if(distance < me.state.targetDist) {
			me.state.target = me.getNewTarget();
		}
	
		var position = me.config.agent.state.locomotor.state.position;
		var target = me.state.target;
		
		var desired = position.sub(target);
		desired = desired.mult(locomotor.state.maxSpeed);
		
		me.state.steer = locomotor.state.velocity.sub(desired);
		me.state.steer.trunc(locomotor.state.maxForce);
	}
	
	// Return a random target to move toward.
	me.getNewTarget = function() 
	{	 
		/*
		 * OK... This is an incredibly bad implementation for limiting the
		 * distance that the generated target will be from the Agent but I'm
		 * really stoned and I just wanted to see what it looks like.  I'll fix
		 * this later, I swear.
		 */
		 /*
		var distance = 80;
		try{
			var locomotor = config.agent.state.locomotor;
		} catch(err){
			minx = 0;
			maxx = 400;
			miny = 0;
			maxy = 400;
			var x = Math.randInt(minx, maxx);
			var y = Math.randInt(miny, maxy);
			
			return new Vector(x,y);
		}
		
		minx = locomotor.state.position.x - distance;
		maxx = locomotor.state.position.x + distance;
		if(minx < 0) minx = 0;
		if(maxx > 400) maxx = 400;
		
		miny = locomotor.state.position.y - distance;
		maxy = locomotor.state.position.y + distance;
		if(miny < 0) miny = 0;
		if(maxy > 400) maxy = 400;
		// End amazingly hack-ish code.
		
		var x = Math.randInt(minx, maxx);
		var y = Math.randInt(miny, maxy);
		*/
		var x = Math.randInt(0, 400);
		var y = Math.randInt(0, 400);
		
		return new Vector(x,y);
	}
	
	// Initialize.
	me.init();
}

PITRI.GenericAgentSkin = function(_config) {
	// Internal reference to self.
	var me = this;
	
	// Defaults
	var defaults = {
		color: "rgb(0, 255, 0)",
		size: 10
	}
}