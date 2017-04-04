({
	getUserName : function(component,callback) {
		var action = component.get("c.getUserName");
            action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var userName =  response.getReturnValue()
                callback(userName);
             }
          });
       $A.enqueueAction(action);
    },
    
    getUserRecord : function(component,callback) {
		var action = component.get("c.getUserRecord");
            action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var user =  response.getReturnValue()
                callback(user);
             }
          });
       $A.enqueueAction(action);
    },
    
    getUserEmail : function(component,callback) {
		var action = component.get("c.getUserEmail");
            action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var email =  response.getReturnValue()
                callback(email);
             }
          });
       $A.enqueueAction(action);
    },
       
    preapreBTCAuthData: function(component,emailAddress,securityToken,baseUrl, callback) {
        
        var username = '';
        var url = baseUrl + '/api/sandbox/oauth/get-signature-email?email='+ emailAddress +'&username=x' + '&security_token=' + securityToken
        
        
        var action = component.get("c.preapreBTCAuthData");
        action.setParams({"url" : url });
            action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var result =  response.getReturnValue()
                
                callback(result);
             }
          });
       $A.enqueueAction(action);
    },
	
})