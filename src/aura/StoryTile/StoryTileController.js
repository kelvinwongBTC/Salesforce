({

    doInit: function(component, evt, helper) {
       console.log("init");
    },
    
    didSelectViewStory : function(component, event, helper) {
            event.preventDefault();
            
            var id = component.get("v.story.id");
            var url = "https://appnext.bigtincan.com/story/"+id
            
            window.open(url, "sf", "width=" + 700 + ", height=" + 500);
	},

    didSelectShareStory : function(component, event, helper) {
            event.preventDefault();
            
            var id = component.get("v.story.id");
            var url = "https://appnext.bigtincan.com/#share/"+id
            
            window.open(url, "sf", "width=" + 700 + ", height=" + 500);
	}
})