({
	render : function(cmp, helper) {
        var ret = this.superRender();
        // do custom rendering here
        //alert("render");
        
        return ret;
    },
    
    rerender : function(cmp, helper){
        this.superRerender();
        // do custom rerendering here
        //alert("RErender");
    },
    
    afterRender: function (component, helper) {
        this.superAfterRender();
        // interact with the DOM here
        //alert("afterRender");
    },
    
    unrender: function () {
        this.superUnrender();
        // do custom unrendering here
        //alert("unrender");
    }
})