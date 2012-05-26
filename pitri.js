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
	}
	
	// Internal reference to self.
	var me = this;
	
	// Merge defaults with config options.
	me.config = $.extend({}, defaults, config);
	
	// Internal state model.
	me.state = {
		ctx: me.config.ctx,
		agents: [],
		interval: null
	}
	
	// Public Interface.
	// -Empty for now.-
	
	// Do initialization here.
	me.init = function() 
	{
		// Auto-populate!
		for(var i=0; i<me.config.maxAgents; i++){
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
		this.state.interval = setInterval(
			this.tick, 
			1000/this.config.fps);
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
	}
	
	// Add an agent to the agent list.
	me.createAgent = function(config) 
	{
	 	me.state.agents.push(new PITRI.Agent(config));
	}
	
	// Initialize!
	me.init();
}
