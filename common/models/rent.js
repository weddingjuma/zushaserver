var loopback = require('loopback');
var path = require('path');

var app = module.exports = loopback();

module.exports = function(Rent) {
  //init PesaPal
  var PesaPal = require('pesapaljs').init({
      debug: false,    // false in production
      key: "s9wWRUjVSuzqvZIoVDzxOsjgNdmWwoAR", // TODO: Use your own credentials!!
      secret: "fe9iGVCH8YkJGL9G5V1epBh7zrQ="
  });

  app.get('/payment_status', function (req, res) {
      var options = {};
      if(req.query.reference) options.reference = req.query.reference;
      if(req.query.transaction) options.transaction = req.query.transaction;

      PesaPal.getPaymentStatus(options, function(error, status) {
          if(error) {
              res.status(500).send(error);
          } else {
              res.send({reference: options.reference, status: status});
          }
      });
  });
  app.get('/payment_details', function (req, res) {
      var options = {};
      if(req.query.reference) options.reference = req.query.reference;
      if(req.query.transaction) options.transaction = req.query.transaction;


      PesaPal.getPaymentDetails(options, function (error, payment) {
          if(error) {
              res.status(500).send(error);
          } else {
              res.send(payment);
          }
      });

  });

};
