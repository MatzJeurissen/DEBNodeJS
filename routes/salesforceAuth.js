const express = require('express')
const router = express.Router()

var jsforce = require('jsforce');
var conn = new jsforce.Connection();

  asyncTask();

  async function asyncTask () {
    try {
      // const records = login(getAccounts);
      const records2 = login(getVehicles);

    } catch (err) {
      // logger.error(err);
    }
  }

  function login(callback){
    conn = new jsforce.Connection({
      oauth2 : {
        // you can change loginUrl to connect to sandbox or prerelease env.
        loginUrl : 'https://test.salesforce.com',
        clientId : '3MVG97srI77Z1g7_fZCKXnS5SBNoDcmDiRqjIAiJkf8le7tYjZKRTCVFUZOxQC32z_RjVxYJUfE7c4J65N3vY',
        clientSecret : 'B647AD65113C49E4FB70089EA7F049B1E49FA9BF13EF89B5579772D3C1C4FB25',
        redirectUri : 'http://localhost:3000'
      }
    });

    username = 'teamgold@welisa.nl.man.KentekenV2';
    password = 'lTLq7N9JDw5aqz3iOnvUyRzow17OXk1ifx8U';
    conn.login(username, password, function(err, res) {
      if (err) { 
          return console.error(err); 
      }
      else { 
          loggedIn = true; 
          console.log("Succcessfully logged into Salesforce.");
          console.log(res);
          if(callback)
              {callback();}
      }
    });
  }

  function getAccounts() {
    console.log(conn);
    var records = [];
    var query = conn.query('SELECT Id, Name FROM Account')
      .on("record", function(record) {
        records.push(record);
      })
      .on("end", function() {
        console.log("total in database : " + query.totalSize);
        console.log("total fetched : " + query.totalFetched);
        console.log(query);
        console.log(records);
      })
      .on("error", function(err) {
        console.error(err);
      })
      .run({ autoFetch : true}); // synonym of Query#execute();

    return records;
  }

  function getVehicles() {
    var records = [];
    var query = conn.query('SELECT Id, Name, commissionNumber__c FROM Vehicle__c')
      .on("record", function(record) {
        records.push(record);
      })
      .on("end", function() {
      })
      .on("error", function(err) {
        console.error(err);
      })
      .run({ autoFetch : true}); // synonym of Query#execute();

    return records;
  }

  /*

Below are three different styles of querying records that jsforce supports
For more on data modeling in Salesforce: https://trailhead.salesforce.com/en/content/learn/modules/data_modeling

*/

//find contacts using plain SOQL
//More on SOQL here: https://trailhead.salesforce.com/en/content/learn/modules/apex_database
function displayContactsSOQL() {
  conn.query("SELECT Id, Name, CreatedDate FROM Contact", function(err, result) {
      if (err) { return console.error(err); }
      console.log("total : " + result.totalSize);
      for (var i=0; i<result.records.length; i++) {
          var record = result.records[i];
          console.log("Name: " + record.Name);
          console.log("Created Date: " + record.CreatedDate);
      }
    });
}


//find contacts by listening to events
function displayContactsEventMethod() {
  console.log('event');
  
  var records = [];
  var query = conn.query("SELECT Id, Name FROM Contact")
  .on("record", function(record) {
      records.push(record);
      console.log(record);
  })
  .on("end", function() {
      console.log("total fetched : " + query.totalFetched);
  })
  .on("error", function(err) {
      console.error(err);
  })
  .run({ autoFetch : true }); // synonym of Query#execute();
}

//find contacts by constructing the query in a method chain
function displayContactsMethodChain() {
  //
  // Following query is equivalent to this SOQL
  //
  // "SELECT Id, Name, CreatedDate FROM Contact
  //  WHERE LastName LIKE 'A%' 
  //  ORDER BY CreatedDate DESC, Name ASC
  //  LIMIT 5"
  //
  console.log('method');
  conn.sobject("Contact")
      .find({
      FirstName : { $like : 'Demo%' }
      },
      'Id, Name, CreatedDate' // fields can be string of comma-separated field names
                              // or array of field names (e.g. [ 'Id', 'Name', 'CreatedDate' ])
      )
      .sort('-CreatedDate Name') // if "-" is prefixed to field name, considered as descending.
      .limit(5)
      .execute(function(err, records) {
      if (err) { return console.error(err); }
      console.log("record length = " + records.length);
      for (var i=0; i<records.length; i++) {
          var record = records[i];
          console.log("Name: " + record.Name);
          console.log("Created Date: " + record.CreatedDate);
      }
  });
}

function createContact() {
  console.log('create');
  conn.sobject("Contact").create({FirstName: 'APIDemo', LastName: 'User'}, function(err, ret) {
      if (err || !ret.success) { return console.error(err, ret); }
      else {
          console.log("Created record id : " + ret.id);
      }
    });
}

function updateContact() {
  // Single record update.  For multiple records, provide update() with an array
  // Always include record id in fields for update
  // You can also update and insert from the same array.
  conn.query("SELECT Id, Name FROM Contact WHERE FirstName = 'APIDemo'")
  .on("record", function(record) {
      conn.sobject("Contact").update({Id: record.Id, LastName: 'Smith'}, function(err, ret) {
          if (err || !ret.success) { return console.error(err, ret); }
          console.log('Updated Successfully : ' + ret.id);
      });
  });
  
}

function deleteContact() {
  conn.query("SELECT Id, Name FROM Contact WHERE FirstName = 'APIDemo'")
  .on("record", function(record) {
      conn.sobject("Contact").delete(record.Id, function(err, ret) {
          if (err || !ret.success) { return console.error(err, ret); }
          console.log('Deleted Successfully : ' + ret.id);
        });
  });
}



module.exports = router
