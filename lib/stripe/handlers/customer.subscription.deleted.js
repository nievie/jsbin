var models = require('../../models');

module.exports = function (data, callbackToStripe) {
  if (isCanceled(data)) {
  
    var removeProStatus = function(customer){
      return models.user.setProAccount(customer.user, false);
    };

    var sendStripe200 = callbackTostripe.bind(null, null);

    models.customer.setActive(data.customer, false)
      .then(removeProStatus)
      //.then(removeTeamStatus)
      .then(sendStripe200)
      .catch(callbackToStripe);

  } else {
    callbackToStripe(null);
  }   
};

function isCanceled(obj) {
  return obj.status ? obj.status === 'canceled' : isCanceled(obj.data || obj.object);
}