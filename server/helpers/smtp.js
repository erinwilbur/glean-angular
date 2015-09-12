Meteor.startup(function () {
  smtp = {
    username: '',  //name@domain.com
    password: '',  // pass.word
    server: '',    // mail.domain.com
    port: 26
  }
  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;

  Accounts.emailTemplates.from = 'InviteBot <no-reply@glean.io>';
  Accounts.emailTemplates.siteName = 'Glean.io';

  Accounts.emailTemplates.verifyEmail.subject = function(user) {
    return 'Confirm Your Email Address';
  };

  Accounts.emailTemplates.verifyEmail.text = function(user, url){
    return 'Click on the following link to verify your email address: ' + url;
  };

});
