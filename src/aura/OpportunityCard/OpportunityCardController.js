({

    handleSelectOpportunity : function(component, event) {
		var oppId = event.getParam("id")
		
		var action = component.get("c.getOpportunity");
        action.setParams({id: oppId});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (component.isValid() && state === "SUCCESS") {
                component.set("v.opportunity", response.getReturnValue());
            }
            else {
                alert('fail');
            }
            
        });
        $A.enqueueAction(action);        
    }
})