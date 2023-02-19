const https = require('https');
const fs = require('fs');
const express = require('express')
const vehicleEvent= require('../models/vehicleEvents')
const router = express.Router()
const salesforceAuth = require('./salesforceAuth');
const vehicleEvents = require('../models/vehicleEvents');

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
  // path: '/ws/ImporterVehicleInformationBulk/vehicles/events?eventType=V_LSHIP;V_K;V_C7;V_0024;V_0001;V_SHIP;V_LANDED;LANDED;V_VRD;V_RFT;V_DSP;V_ID;D_LR;D_AAK;DLR_DLV;DLR_MIN;DLR_WSH;V_DLVD;V_0024;V_0001;V_SHIP;V_LANDED;V_DSP;D_LR;D_AAK;DLR_DLV;DLR_MIN;DLR_WSH&loadDatetime=2023-02-13%2000:00:00',
  path: '/ws/ImporterVehicleInformation/vehicles/events?commissionNumber=147964',

  method: 'GET',

  // https://api.uat.pa-esb.net/ws/ImporterVehicleInformationBulk/vehicles/events?eventType=V_LSHIP;V_K;V...DLR_MIN;DLR_WSH;V_DLVD;V_0024;V_0001;V_SHIP;V_LANDED;V_DSP;D_LR;D_AAK;DLR_DLV;DLR_MIN;DLR_WSH&loadDatetime=2023-01-05 00:00:00&vehicleCategory='LKW'
  rejectUnauthorized: false

};


https.request(options, (res) => {
    let data = '';
    res.on('data', (chunk) => {
      data += chunk;
    });
    res.on('end', () => {
      const parsedData = JSON.parse(data);
      var vehicleEvents =parsedData.vehicleEvents;

      var parseBackToJSON = JSON.stringify(vehicleEvents);

      salesforceAuth.upsertAllVehicleEvents(vehicleEvents);

      for (let index = 0; index < vehicleEvents.length; index++) {
        const vehicleEventHier = new vehicleEvent({
          commissionNumber: vehicleEvents[index].commissionNumber
        })
        try {
          // const newEvent =  vehicleEventHier.save();
        } catch (error) {
          console.log('error')
        }
      }
    });
  }).on('error', (err) => {
    console.error(err);
  }).end();



  
module.exports = router