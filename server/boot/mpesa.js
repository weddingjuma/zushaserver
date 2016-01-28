'use strict'

//init pesapaljs
var PesaPal = require('pesapaljs').init({
    debug: false,    // false in production
    key: "s9wWRUjVSuzqvZIoVDzxOsjgNdmWwoAR", // TODO: Use your own credentials!!
    secret: "fe9iGVCH8YkJGL9G5V1epBh7zrQ="
});

module.exports = function (app) {
// logics here
app.get('/ipn', PesaPal.paymentListener, function(req, res) {
    var payment = req.payment;
    // do stuff with payment {transaction, method, status, reference}

    // DO NOT res.send()
});

app.get('/payment_listener', PesaPal.paymentListener, function (req) {
    var payment = req.payment;
    if (payment) {
        // TODO: Save in DB?
    }
});

//callback for paym
app.get('/payment_callback', function (req, res) {
    var options = { // Assumes pesapal calls back with a transaction id and reference
        transaction: req.query[PesaPal.getQueryKey('transaction')],
        reference: req.query[PesaPal.getQueryKey('reference')]
    };

    PesaPal.getPaymentDetails(options, function (error, payment) {
        // check payment.status and proceed accordingly

        var message = "Thank you for doing business with us.";
        res.render("message", {
            message: message,
            details: JSON.stringify(payment, null, 2),
            error: error ? JSON.stringify(error, null, 2) : null
        });
    });
  });

// route for Payment
  app.get('/pay', function (req, res, next) {
      // TODO: Render checkout UI
      res.render("checkout", {
          reference: new Date().getTime(),
          description: "Pay Here",
      //    amount: Math.floor((Math.random() * 20000) + 1)
          amount: 50

      });
  });

// payment route for post
  app.post('/pay', function (req, res, next) {
      // TODO: Make order from request;
      var customer = new PesaPal.Customer(req.body.email, "");
      customer.firstName = req.body.first_name;
      customer.lastName = req.body.last_name;
      var order = new PesaPal.Order(
          req.body.reference,
          customer,
          req.body.description,
          req.body.amount,
          req.body.currency,
          req.body.type);


      if(req.body.pesapal) { // Redirect to PesaPal for payment

          var paymentURI = PesaPal.getPaymentURL(order, "http://localhost:3000/payment_callback");
          res.redirect(paymentURI);

      } else { // Use Custom Payment Page

          var mobilePayment = req.body.mobile != undefined;
          var method = mobilePayment ? PesaPal.PaymentMethod.MPesa : PesaPal.PaymentMethod.Visa;

          PesaPal.makeOrder(order, method, function (error, order) {

              if(error) {
                  res.send(error.message);
              } else {

                  // TODO: Save order in DB
                  db.saveOrder(order);

                  // TODO: Render UI to get mpesa transaction code or card details from user
                  if (mobilePayment) {
                      res.render("mobile", {
                          reference: order.reference,
                          instructions: "Send " + order.amount + " " + order.currency + " to " + method.account + " via " + method.name
                      });
                  } else {
                      res.render("card", {reference: order.reference});
                  }
              }

          });
      }
  });

/** var options = {
    reference: "42314123", // Send this
    transaction: "175c6485-0948-4cb9-8d72-05a2c3f25be5" // or both.
};
PesaPal.getPaymentStatus(options, function(error, status){
    // do stuff
});

PesaPal.getPaymentDetails(options, function (error, payment) {
    //payment -> {transaction, method, status, reference}
    //do stuff
}); **/

};
