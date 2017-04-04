({
	doInit : function(component, event, helper){
		component.find("authorize").set("v.disabled", true);
		if(localStorage.getItem("expiresIn") - (new Date()).getTime() > 0){
			//hide authorize button
			console.log("Render story tiles");
			return;
		}

		var action = component.get("c.getSettings");
		action.setCallback(this, function(response){
			var state = response.getState();
			if(component.isValid() && state === "SUCCESS"){
				component.set("v.settings", response.getReturnValue());
			} else {
				console.log("Failed:"+state);

			}
		});
		$A.enqueueAction(action);

		var action = component.get("c.requestSignature");
		action.setCallback(this, function(response){
			var state = response.getState();
			if(component.isValid() && state === "SUCCESS"){
				component.set("v.signature", response.getReturnValue());
				component.find("authorize").set("v.disabled", false);
			} else {
				console.log("Failed:"+state);
			}
		});
		$A.enqueueAction(action);
	},
	authorizeUser : function(component, event, helper){
		console.log("Authorize User!");
		
        var Helper  = {};
        Helper.getDomain = function(url) {
            var matches = url.match(/(^https?\:\/\/[^\/?#]+)(?:[\/?#]|$)/i);
            return matches[1];
        };

		var authWindow = null;
		var timer = null;
		
		

		var action = component.get("c.fetchOAuthWindowURL");
		action.setParams({'signature':component.get('v.signature')});
		action.setCallback(this, function(response){
			console.log("Callback:", authWindow);
			var state = response.getState();
			if(component.isValid() && state === "SUCCESS"){
				console.log("AuthorizedUser:" + response.getReturnValue());
				var windowUrl = response.getReturnValue();
				windowUrl += '&target_url=' + encodeURI(Helper.getDomain(window.location.href))
				
				//component.set("v.authenticationURL", windowUrl);
				authWindow = window.open(windowUrl, "sf", "width=" + 700 + ", height=" + 500);
				
				timer = setInterval(function(event) {
					authWindow.postMessage('token?', component.get('v.settings.BTCMOBILE__API_URL__c'));
				}, 300);
			} else {
				console.log("Failed:"+state);
			}
		});
		$A.enqueueAction(action);

		window.addEventListener('message', function(event) {
			console.log(event);
			var data = event.data;
			if (data != '') {
					var tokens = data.split('||');
					var accessToken = tokens[0];
                    var refreshToken = tokens[1];
                    var expiresIn = tokens[2];
                    
                    localStorage.setItem("accessToken", accessToken);
					localStorage.setItem("refreshToken", refreshToken);
					localStorage.setItem("expiresIn", (new Date()).getTime() + 3600000);
			}
			authWindow.close();
			timer = null;	
		});
	},
})