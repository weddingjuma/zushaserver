/**
 * sms model
 */

module.exports = function(options) {
  options = options || {};
  var mongoose = options.mongoose || require('mongoose')
  , Schema = mongoose.Schema;

  var SMSSchema = new Schema({
    FromCity : {
      type : String
    },
    FromState : {
      type : String
    },
    Body : { type : String},
    date: { type: Date, default: Date.now }
  });

  var SMSMessage = mongoose.model("smsmessage", SMSSchema);
}
