const mongoose = require('mongoose');

const vehicleEventSchema = new mongoose.Schema({
    
        "masterDataSource": {
          "type": "String"
        },
        "commissionYear": {
          "type": "Date"
        },
        "commissionNumber": {
          "type": "String"
        },
        "vin": {
          "type": "String"
        },
        "shortVin": {
          "type": "String"
        },
        "licensePlate": {
          "type": "String"
        },
        "eventTypeCode": {
          "type": "Date"
        },
        "eventTypeEN": {
          "type": "String"
        },
        "eventTypeNL": {
          "type": "String"
        },
        "eventStatusCode": {
          "type": "String"
        },
        "eventStatus": {
          "type": "String"
        },
        "eventSequence": {
          "type": "String"
        },
        "eventDate": {
          "type": "String"
        },
        "info": {
          "type": "Mixed"
        },
        "created": {
          "type": "String"
        },
        "modified": {
          "type": "String"
        }
      
})

module.exports = mongoose.model('vehicleEvent', vehicleEventSchema)