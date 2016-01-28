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
