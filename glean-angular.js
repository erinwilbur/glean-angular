/* if (Meteor.isClient) {
  // counter starts at 0
  Session.setDefault('counter', 0);

  Template.hello.helpers({
    counter: function () {
      return Session.get('counter');
    }
  });

  Template.hello.events({
    'click button': function () {
      // increment the counter when button is clicked
      Session.set('counter', Session.get('counter') + 1);
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
} */
Router.route('/', function() {
  // render the Home template with a custom data context
  this.render('Home', {data: {title: 'Glean'}});
});

// when you nav to "/one" auto render the template name "One"
Router.route('/one');

// when you nav to "/two" auto render the template name "Two"
Router.route('/two');
