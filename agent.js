PITRI.Agent = function(config) 
{
	var defaults = {
		name: "Agent" + Math.random(),
		brain: new PITRI.Wanderer({agent:this}),
		body: new PITRI.PointMassModel({agent:this}),
		skin: new PITRI.GenericAgentSkin()
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
		maxSpeed: 5,
		maxAccel: 5,
		position: new Vector(0,0),
		velocity: new Vector(0,0),
		accel: new Vector(0,0),
		inertia: new Vector(0,0),
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
		var steer = config.agent.state.brain.state.steer;
		
		// Calculate overall force.
		/*
		me.state.inertia.x = (me.state.mass * me.state.velocity.x);
		me.state.inertia.y = (me.state.mass * me.state.velocity.y);
		me.state.inertia.normalize();
		steer.add(me.state.inertia);
		*/
		
		// Calculate acceleration and truncate to maxAccel.
		me.state.accel.x = (steer.x / me.state.mass, steer.x / me.state.mass);
		me.state.accel.y = (steer.y / me.state.mass, steer.y / me.state.mass);
		me.state.accel.trunc(me.state.maxAccel);
		
		// Calculate and truncate speed.
		me.state.velocity = me.state.velocity.add(me.state.accel);
		me.state.velocity.trunc(me.state.maxSpeed);
		
		// Move me!
		me.state.position = me.state.position.add(me.state.velocity);
	}
	
	// Initialize.
	me.init();
}

PITRI.Wanderer = function(config) 
{
	// Defaults
	var defaults = {
		steer: new Vector(0,0),
		targetDist: 40,
		maxDist: 80
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
		// Local refs.
		var body = config.agent.state.body;
		
		// Do I need to choose a new target yet?
		var distance = me.state.target.sub(body.state.position);
		distance = distance.len();
		if(distance < me.state.targetDist) {
			me.state.target = me.getNewTarget();
		}
	
		var pos = config.agent.state.body.state.position;
		me.state.steer = me.state.target.sub(pos);
		me.state.steer.normalize();
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
		var distance = 80;
		try{
			var body = config.agent.state.body;
		} catch(err){
			minx = 0;
			maxx = 400;
			miny = 0;
			maxy = 400;
			var x = Math.randInt(minx, maxx);
			var y = Math.randInt(miny, maxy);
			
			return new Vector(x,y);
		}
		
		minx = body.state.position.x - distance;
		maxx = body.state.position.x + distance;
		if(minx < 0) minx = 0;
		if(maxx > 400) maxx = 400;
		
		miny = body.state.position.y - distance;
		maxy = body.state.position.y + distance;
		if(miny < 0) miny = 0;
		if(maxy > 400) maxy = 400;
		// End amazingly hack-ish code.
		
		var x = Math.randInt(minx, maxx);
		var y = Math.randInt(miny, maxy);
		
		return new Vector(x,y);
	}
	
	// Initialize.
	me.init();
}

PITRI.GenericAgentSkin = function(config) {
	// Defaults
	var defaults = {
		color: "rgb(0, 255, 0)",
		size: 10
	}
}