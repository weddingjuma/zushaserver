var loopback = require('loopback');
var path = require('path');

var app = module.exports = loopback();

module.exports = function(Payment) {
  //init PesaPal
  var PesaPal = require('pesapaljs').init({
      debug: false,    // false in production
      key: "s9wWRUjVSuzqvZIoVDzxOsjgNdmWwoAR", // TODO: Use your own credentials!!
      secret: "fe9iGVCH8YkJGL9G5V1epBh7zrQ="
  });


  // confirm transaction code
Payment.details = function (details) {

var options = {
    reference: new Date().getTime(),
    transaction: "175c6485-0948-4cb9-8d72-05a2c3f25be5" // or both.
};
PesaPal.getPaymentStatus(options, function(error, status){
  if(error) {
      res.status(500).send(error);
  } else {
      details = ({reference: options.reference, status: status});
  }
});

PesaPal.getPaymentDetails(options, function (error, payment) {
    //payment -> {transaction, method, status, reference}
    //do stuff
    var message = "Thank you for doing business with us.";
      res.render("message", {
          message: message,
          details: JSON.stringify(payment, null, 2),
          error: error ? JSON.stringify(error, null, 2) : null
      });
});

return details;
};

};
