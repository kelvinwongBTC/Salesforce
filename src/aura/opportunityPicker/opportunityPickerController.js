({
	doInit: function(component, evt, helper) {
       helper.getOpportunities(component);
    },
    
    onSelectOpportunity : function(component, event, helper) {
        var selectedOption = component.find("opportunitySelectElement").get("v.value");

        helper.fireSelectOpportunity(selectedOption);
    }
})