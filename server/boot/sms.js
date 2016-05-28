
 var loopback = require('loopback');
 module.exports = function(app) {
   var options = {
     apiKey: 'fba7496230933570608885b3d39450d29be19c4f702ef9aad13de9990d32a25a',
     username: 'denzelwamburu',
     format: 'json' // or xml
   };
   var AfricasTalking = require('africastalking')(options);
   var sms = AfricasTalking.SMS;
   var opts = {
     keyword: '101',
     linkId: 'www.zusha.co.ke',
     to: "254704654445",
     message: 'Server is Spinning'
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
        console.log(s);
      })
      .catch(function(error) {
        console.log(error);
      });
 };
