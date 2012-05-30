/*
 * Pitri Life Sim
 * Main Script
 */
 var PITRI = {};
PITRI.init = function(config) 
{
	var defaults = {
		// Maximum number of agents in the sim.
		maxAgents: 1,
		// Frames per second.
		fps: 30,
		// Drawing context.
		ctx: null
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
		// Auto-create a convas 
		if(config.ctx == undefined || config.ctx == null) {
			config.ctx = $("<canvas></canvas>").appendTo($("locomotor"))
					.attr("id", "Pitri")
					.attr("width", "400")
					.attr("height", "400")
					[0].getContext("2d")		
		}
				
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
		// Clear the screen.
		ctx.clearRect(0,0,400,400);
		
		for(var i=0; i<me.state.agents.length; i++) {
			// Get agent instance
			var a = me.state.agents[i];
			// Get navigator instance.
			var navigator = a.state.navigator;
			// Get locomotor instance.
			var locomotor = a.state.locomotor;
			// Target
			var t = a.state.navigator.state.target;
			
			// Agent position.
			var pos = {
				x: locomotor.state.position.x,
				y: locomotor.state.position.y
			}
			
			// Draw target.
			ctx.strokeStyle="rgb(255,0,0)";
			ctx.beginPath();
			ctx.moveTo(t.x-5, t.y);
			ctx.lineTo(t.x+5, t.y);
			ctx.stroke();
			
			ctx.beginPath();
			ctx.moveTo(t.x, t.y-5);
			ctx.lineTo(t.x, t.y+5);
			ctx.stroke();
			
			// Draw agent.
			ctx.fillStyle = "rgb(0,200,0)";  
			ctx.beginPath();
			ctx.arc(pos.x, pos.y, 5, 5, Math.PI*2, true); 
			ctx.closePath();
			ctx.fill();
			
			// Draw agent approach distance.
			ctx.strokeStyle = "rgb(0,200,200)";
			ctx.beginPath();
			ctx.arc(pos.x, pos.y, navigator.state.targetDist, navigator.state.targetDist, Math.PI*2, true);
			ctx.closePath();
			ctx.stroke();
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
