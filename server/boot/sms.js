var dotenv = require('dotenv').config();
var loopback = require('loopback');
module.exports = function(app) {
  var options = {
    apiKey: process.env.AT_APIKEY,
    username: process.env.AT_USERNAME,
    format: 'json' // or xml
  };
  var AfricasTalking = require('africastalking')(options);
  var sms = AfricasTalking.SMS;
  var opts = {
    keyword: '101',
    linkId: 'www.zusha.co.ke',
    to: "254704654445",
    message: 'Server is Spinning',
    lastReceivedId: 2
  };
  console.log(opts);

  // sms.send(opts)
  //   .then(function(s) {
  //       console.log(s);
  //     })
  //     .catch(function(error) {
  //       console.log(error);
  //     });
  /** Using Premium
   * add keyword for shortcode
   **/
  //  sms.sendPremium(opts)
  //    .then(function(s) {
  //      console.log(s);
  //    })
  //    .catch(function(error) {
  //      console.log(error);
  //    });

  /* Retrieve SMS from the Senders */
  sms.fetchMessages(opts)
    .then(function(s) {
      var jsoned = {};
      // jsoned = JSON.stringify(s);
      console.log(s.SMSMessageData.Messages[0].to);
    })
    .catch(function(error) {
      console.log(error);
    });
};
