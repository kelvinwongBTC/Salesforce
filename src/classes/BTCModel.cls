public with sharing class BTCModel {
	@AuraEnabled
      public static String getUserName() {
        return userinfo.getUserName();
      }
    
    
	@AuraEnabled
      public static String getUserEmail() {
        return userinfo.getUserEmail();
      }
    
    @AuraEnabled
      public static User getUserRecord() {
          Id userId = userinfo.getUserId();
        return [
 			SELECT Id, Name, Email
            FROM User
            WHERE Id = :userId
         ];
      }
    
    @AuraEnabled 
    public static String preapreBTCAuthData(String url) {
        Http h = new Http();
        // Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');
        // Send the request, and return a response
        HttpResponse res = h.send(req);
        Id userId = userinfo.getUserId();
        User user = [
 			SELECT Id, Name
            FROM User
            WHERE Id = :userId
         ];
           
        
        Map<String, String> newData = (Map<String, String>)JSON.deserialize(res.getBody(), Map<String, String>.class);
        String signature = newData.get('signature');
        String email = newData.get('email');
        
        /*JSONParser parser = JSON.createParser(res.getBody());
        while (parser.nextToken() != null) {
            if ((parser.getCurrentToken() == JSONToken.FIELD_NAME)) {
                if (parser.getText() == 'signature') {
                    parser.nextToken();
                	signature = parser.getText();
                }
                else if (parser.getText() == 'email') {
                    parser.nextToken();
                    email = parser.getText();
                }
            }
        }*/
        
        Map<String, String> data = new Map<String, String>();
        data.put('email', email);
        data.put('signature', signature); 
        data.put('username', user.Name);
        
        String jsonString = JSON.serialize(data);
        
        return jsonString;
        
        //String result = '{ "signature" : "' + signature + '", "username" : "' + user.Name + '", "email" : "' + email +'" }';
        //return result;
    }
    
    @AuraEnabled
    public static Opportunity getOpportunity(Id id) {
        Opportunity opportunity = [
 			SELECT Id, Account.Name, Name, CloseDate, Owner.Name, Amount, Description, StageName
            FROM Opportunity
            WHERE Id = :id
         ];
        
        return opportunity;
    }
    
    @AuraEnabled
    public static BTCMOBILE__BTCSettings__c  getSettings() {
        return BTCMOBILE__BTCSettings__c.getOrgDefaults();
    }

    @AuraEnabled
    public static String requestSignature() {
        BTCMOBILE__BTCSettings__c settings = getSettings();
        String email = EncodingUtil.urlEncode(UserInfo.getUserEmail(), 'UTF-8');
        String username = EncodingUtil.urlEncode(UserInfo.getUserName(), 'UTF-8');
        String url = settings.BTCMOBILE__API_URL__c + '/api/sandbox/oauth/get-signature?email='+ email +'&username='+username+'&security_token=' + settings.BTCMOBILE__Security_Token__c;
        

        Http h = new Http();
        // // Instantiate a new HTTP request, specify the method (GET) as well as the endpoint
        HttpRequest req = new HttpRequest();
        req.setEndpoint(url);
        req.setMethod('GET');
        // // Send the request, and return a response
        HttpResponse res = h.send(req);

        // Map<String, String> data = new Map<String, String>();
        // data.put('url', url);
        // data.put('signature', res.getBody()); 
        // String jsonString = JSON.serialize(data);
        
        // Map<String, String> newData = (Map<String, String>)JSON.deserialize(jsonString, Map<String, String>.class);
        // System.debug(newData.get('signature'));

        return res.getBody();

    }
    @AuraEnabled
    public static String fetchOAuthWindowURL(String signature) {
        BTCMOBILE__BTCSettings__c settings = getSettings();
        String email = EncodingUtil.urlEncode(UserInfo.getUserEmail(), 'UTF-8');
        String username = EncodingUtil.urlEncode(UserInfo.getUserName(), 'UTF-8');
        String url = settings.BTCMOBILE__API_URL__c + '/api/sandbox/oauth/oauth-index?email='+email+'&username='+username+'&device_id=BTCSFPlugin&signature='+signature+'&&oauth_client='+settings.BTCMOBILE__Client_Id__c+'&oauth_service_url='+settings.BTCMOBILE__API_URL__c;
        return url;
    }
    
}