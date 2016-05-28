'use strict';
var moment = require('moment');
var CronJob = require('cron').CronJob;
module.exports = function(text) {
  // Install a `/` route that returns server status

  var SID = 'AC5f4567cc3765581dc07c908b2a9bb4df';
  var TOKEN = '36fbac9a3e5861c5cb4fcb57977d1e66';

  var TO = '+254704654445'; // replace with greenhouse owner
  var FROM = '+18443264512';


  var smsData = {
      type: 'sms',
      to: TO,
      from: FROM,
      body: 'Daily SMS enabled'
  }

  var callData = {
      type: 'call',
      to: TO,
      from: FROM,
      url: 'https://raw.githubusercontent.com/dashby3000/loopback-connector-twilio/master/example/call.xml'
  }

  var ds = require('loopback').createDataSource({connector: require('loopback-connector-twilio'), accountSid: SID, authToken: TOKEN});

  var Twilio = ds.createModel('Twilio', {
      type: {type: String, id: true, required: true},
      to: {type: String, required: true},
      from: {type: String, required: true},
      body: {type: String, required: true},
      url: {type: String, required: true}
  });
  var begin = moment().get('hour');
// use cron for Text
new CronJob('* 35 12 * * *', function(){
console.log('Sending Text');
// Twilio.send(smsData, function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });
},null, true)
};

//
// Twilio.send(smsData, function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });
//
// Twilio.send(callData, function (err, data) {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log(data);
//     }
// });
