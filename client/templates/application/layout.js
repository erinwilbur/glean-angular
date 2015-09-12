Template.layout.helpers({
  pageTitle: function() {return Session.get('pageTitle');}
});

Template.layout.created = function() {
  if (Accounts._verifyEmailToken) {
    Accounts.verifyEmail(Accounts._verifyEmailToken, function(err) {
      if (err != null) {
        if (err.message == 'Verify email link expired [403]') {
          console.log('Alex, check this out when you have time...')
        }
      } else {
        console.log('Thank you! Your email address has been confirmed.')
      }
    });
  }
};
