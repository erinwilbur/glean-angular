Accounts.validateLoginAttempt(function(attempt){
  if (attempt.user && attempt.user.emails && !attempt.user.emails[0].verified ) {
    throw new Meteor.Error(403, "Please verify your email first");
    return false; // the user's email is not verified yet and the login is aborted
  }
    return true;
});
