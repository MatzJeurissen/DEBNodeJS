const https = require('https');
const fs = require('fs');
const express = require('express')

const router = express.Router()

var user =  'welisa-vip-uat-app';
var pass = 'UBv2chMN7y-sNp2Ko_ZV';
var options = {
    headers: {
        'Content-Type': 'application/json'
      },
    headers: {
        'Authorization': 'Basic ' + new Buffer(user + ':' + pass).toString('base64')
     }  ,

  cert: fs.readFileSync('./routes/DEB_Certificate_VIP.crt'),
  key: fs.readFileSync('./routes/VIPKey.key'),
  hostname: 'api.uat.pa-esb.net',
  path: '/ws/ImporterVehicleInformation/vehicles/events?eventType=AM&registrationNumber=05ZJRT;xg830j',
  method: 'GET',


  rejectUnauthorized: false

};


https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      const parsedData = JSON.parse(data);
      console.log(parsedData); // parsed response body as a JSON object
    });
  }).on('error', (err) => {
    console.error(err);
  }).end();

module.exports = router