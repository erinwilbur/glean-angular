Accounts.onCreateUser(function(options, user) {
  //if (options.firstName)
      //user.firstName = options.firstName;
//add more things
  //
  //Meteor.setTimeout(function() {
    //console.log("sending an email");
    //Accounts.sendVerificationEmail(user._id);
  //}, 2 * 1000);
    console.log("another user just registered");
  return user;
});

/*Accounts.validateNewUser(function (user) {
  if(user.firstName && user.firstName.length >= 3)
      return true;
  throw new Meteor.Error(403, "The first name must have at least 3 letters.");

  //add more things

});*/
