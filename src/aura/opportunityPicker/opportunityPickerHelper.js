({
    getOpportunities: function(component) {
        var action = component.get("c.getOpportunities");
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                var opps = response.getReturnValue();

                component.set("v.opportunities", opps);
                
                var firstOpp = opps[0];
                this.fireSelectOpportunity(firstOpp.Id);
            }
        });
        $A.enqueueAction(action);
  	},
    
	fireSelectOpportunity : function(id) {
      	var selectOpportunityEvent = $A.get("e.c:selectOpportunityEvent");
        selectOpportunityEvent.setParams({id: id});
        selectOpportunityEvent.fire(); 		
    }
})