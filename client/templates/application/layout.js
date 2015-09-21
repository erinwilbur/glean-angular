Template.layout.helpers({
  pageTitle: function() {return Session.get('pageTitle');}
});

Template.layout.events({
  'submit .btn-default': function(event) {
    event.preventDefault();
    console.log("happen");

    var topic = event.target.text.value;

    Meteor.call("checkTopic", text);

  }
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

Meteor.methods({
  checkTopic: function(text) {
    /* TODO check to see if topic exists, if it does
        return a list of topics, if it does NOT return
        prompt to create a unit */

    Router.route('/unit', function () {
      this.layout('unitCreate');
    });
  }
});
