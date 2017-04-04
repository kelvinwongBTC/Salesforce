({
    
    afterScriptsLoaded : function(component, event, helper) {
        
        var userName = null;
        var email = null;
        var signature = null;
        var baseUrl = '';
        var clientId = '';
        var securityToken = '';
        var targetUrl = null;
        var webappUrl = '';
		var clientSecret = '';
        
        var action = component.get("c.getSettings");
            action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                var settings =  response.getReturnValue()
                baseUrl = settings.BTCMOBILE__API_URL__c;
                clientId = 	settings.BTCMOBILE__Client_Id__c
                securityToken = settings.BTCMOBILE__Security_Token__c 
                clientSecret = settings.BTCMOBILE__Client_Secret__c 
                webappUrl = settings.BTCMOBILE__WEBAPP_URL__c 
             }
          });
        $A.enqueueAction(action);
        
        
        var Helper  = {};
        Helper.getDomain = function(url) {
            var matches = url.match(/(^https?\:\/\/[^\/?#]+)(?:[\/?#]|$)/i);
            return matches[1];
        };
        
        function prepare() {

          	helper.preapreBTCAuthData(component, email, securityToken, baseUrl, function(result) {
                var jsonObj = JSON.parse(result);
                
               userName = encodeURIComponent(jsonObj.username);
               signature = jsonObj.signature;
                
                var url = baseUrl + '/api/sandbox/oauth/oauth-index?username='+ userName
                +'&email='+ email
                +'&device_id=BTCSFPlugin&signature='+ signature 
                + '&target_url=' + encodeURI(Helper.getDomain(window.location.href))
                + '&oauth_service_url=' + encodeURI(baseUrl)
                + '&oauth_client=' + clientId;
    
                targetUrl = url;
            });  
        } 
        
        helper.getUserRecord(component, function(user) {
                      $('#test').html("Welcome  \n" + 
                                      "name: " + user.Name +
                                      "email: " + user.Email
                                     );  
            email = encodeURIComponent(user.Email);
            prepare();
        });
        
        
 
        // var authWindow = null;
        // var timer = null;
        // $('#hub-sign-in').click(function() {
        //      //alert(targetUrl);
        //     authWindow = window.open(targetUrl, "sf", "width=" + 700 + ", height=" + 500);

        //     timer = setInterval(function(event) {
        //         authWindow.postMessage('token?', baseUrl);
        //     }, 300);
        
        // });
        
        var accessToken = ""
        var refreshToken = ""
        var expiresIn = null;
        
        // window.addEventListener('message', function(event) {
            
        //         var data = event.data;
        //         if (data != '') {
                    
        //             var tokens = data.split('||');
        //             accessToken = tokens[0];
        //             refreshToken = tokens[1];
        //             expiresIn = tokens[2];
                    
        //             localStorage.setItem("TOKENS", JSON.stringify(data));
        //         	localStorage.setItem("EmailAddress", email);
        //         }
            
        //         authWindow.close();
        //         timer = null;
                
        // }, false);
        var accessToken = "";
        var refreshToken = "";
        var expiresIn = "";

        $('#hub-recommend').click(function() {
            accessToken = localStorage.getItem("accessToken");
            refreshToken = localStorage.getItem("refreshToken");
            expiresIn = localStorage.getItem("expiresIn");
            markRecommendRequest()
        });
        
        var crmRecommendationType   = "both";
     	var srchType                = "system";
        
        var accessToken = localStorage.getItem("accessToken");
        var refreshToken = localStorage.getItem("refreshToken");
        var expiresIn = localStorage.getItem("expiresIn");
        
        // var authTokens = JSON.parse(localStorage.getItem("TOKENS"));
        // if (authTokens != undefined ) {
        //     var tokens = authTokens.split('||');
        //     accessToken = tokens[0];
        //     refreshToken = tokens[1];
        //     expiresIn = tokens[2];
        // }
        
    

        function markRecommendRequest() { 
            
            if (accessToken == "") {
                alert("accessToken is nil");
                return;
            }
            
            var opp = component.get("v.opportunity");
            var apiUrl = baseUrl+"/webapi/";

            var params ="access_token="+accessToken+
                     "&crmUsername="+userName+
                     "&crmUserEmail="+email+
                     "&opportunityId="+opp.Id+
                     "&opportunityStage="+opp.StageName+
                     "&recommendationType="+crmRecommendationType+
                     "&searchType="+srchType+
                     "&searchKeywords="+opp.Name;
            
            $.ajax({
                url:apiUrl+"crmRecommendation/all",
                method:"POST",
                data:params,
                statusCode: {
                    401: function(){
                        // refresh token required
                        alert("401");
                    }
                }
            }).done(function(data){
                var event = component.getEvent("componentSetEvent");

                event.setParams({"json": data});
                event.fire();
            });
        }
	},
    
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
    },

    doInit: function(component, evt, helper) {
       
    },

    setCRMRecommendation: function(component, evt, helper) {
        var data = evt.getParam("json");
        var finishEvent = $A.get("e.c:SetCRMRecommendationResultEvent");
        finishEvent.setParams({"json": data});
        finishEvent.fire();
    }, 

})