({
	afterScriptsLoaded : function(component, event, helper) {
		
	},

	setCRMRecommendation: function(component, evt, helper) {
       var result = evt.getParam("json");       
       var stories = result.stories;
        

 	  var validStories = [];

      $( stories ).each(function( i ) {
          var story = stories[i];
          
          if (story.title != undefined) {
              validStories.push(story);
          }
      });
        
     component.set("v.validStories", validStories);
    },
})