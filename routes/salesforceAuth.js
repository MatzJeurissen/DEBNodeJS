const express = require('express')
const router = express.Router()

var jsforce = require('jsforce');
var conn = new jsforce.Connection();

var conn = new jsforce.Connection({
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
  conn.login(username, password, function(err, userInfo) {
    if (err) { return console.error(err); }
    // Now you can get the access token and instance URL information.
    // Save them to establish connection next time.
    console.log(conn.accessToken);
    console.log(conn.instanceUrl);
    // logged in user property
    console.log("User ID: " + userInfo.id);
    console.log("Org ID: " + userInfo.organizationId);
    // ...
  });

module.exports = router
