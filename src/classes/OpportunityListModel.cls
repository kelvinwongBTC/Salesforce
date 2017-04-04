public with sharing class OpportunityListModel {
    
    @AuraEnabled
    public static List<Opportunity> getOpportunities() {
        return [SELECT Id, Name, CloseDate FROM Opportunity];
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
    

}