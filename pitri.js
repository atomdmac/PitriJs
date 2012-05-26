/*
 * Pitri Life Sim
 * Main Script
 */
 var PITRI = {};
PITRI.init = function(config) 
{
	var defaults = {
		maxAgents: 1,
		fps: 30,
		ctx: $("<canvas></canvas>").appendTo($("body"))
				.attr("id", "Pitri")
				.attr("width", "400")
				.attr("height", "400")
				[0].getContext("2d")
	}
	
	// Internal reference to self.
	var me = this;
	
	// Merge defaults with config options.
	config = $.extend({}, defaults, config);
	
	// Internal state model.
	me.state = {
		agents: [],
		interval: null
	}
	
	// Public Interface.
	// -Empty for now.-
	
	// Do initialization here.
	me.init = function() 
	{
		// Auto-populate!
		for(var i=0; i<config.maxAgents; i++){
			me.createAgent();
		}
		
		// Start it up!
		me.start();
	};
	
	// Start the sim.
	me.start = function() 
	{
		if(this.state.interval != null) return;
		
		// Create main loop at given framerate.
		this.tick();
		this.state.interval = setInterval(
			this.tick, 
			1000/config.fps);
	}
	
	// Stop the sim.
	me.stop = function() 
	{
		clearInterval(this.state.interval);
		me.state.interval = null;
	}
	
	// Run next iteration of the simulation.
	me.tick = function() 
	{
		// DEBUG
		console.log("TICK");
		
		// Loop through all agents and tick 'em!
		for(agent in me.state.agents) {
			me.state.agents[agent].tick();
		}
		
		// Refresh the display!
		me.draw();
	}
	
	// Draw that simulation!
	me.draw = function() 
	{
		var ctx = config.ctx;

		// Get agent instance
		var a = me.state.agents[0];
		// Get brain instance.
		var brain = a.state.brain;
		// Get body instance.
		var body = a.state.body;
		// Target
		var t = a.state.brain.state.target;
		
		// Draw target.
		ctx.fillStyle = "rgb(200,0,0)";  
        ctx.fillRect (t.x, t.y, 10, 10); 
		
		// Draw agent.
		ctx.fillStyle = "rgb(0,200,0)";  
		ctx.beginPath();
		ctx.arc(body.state.position.x, body.state.position.y, 5, 5, Math.PI*2, true); 
		ctx.closePath();
		ctx.fill();
	}
	
	// Add an agent to the agent list.
	me.createAgent = function(config) 
	{
	 	me.state.agents.push(new PITRI.Agent(config));
	}
	
	// Initialize!
	me.init();
}
