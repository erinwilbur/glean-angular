Meteor.methods({
checkUser: function(email){
  var result = Meteor.users.find({'emails.address': email}).fetch();
  console.log(email + " " + result.length);
  if(result.length == 0){
    result = 'notfound';
  } else if(result.length > 0){
    result = 'found';
  } else {
    result = 'error';
  }
  return result;
},
inviteEmail: function(email){
  var html = Blaze.toHTML(Blaze.With(function() { return Template.inviteEmail; }));
  Email.send({
    from: "InviteBot <no-reply@presents.social>",
    to: email,
    subject: "Someone you know has invited you to join Presents.Social",
    html: html,
  });
},
lookupUserByEmail: function(email){
  return Meteor.users.find({'emails.address': email});
},
getAffiliateCode: function(hostname){
  return Codes.find({'domain': hostname}).code;
},
getHeaders: function(){
  var headers = {
    "Access-Control-Allow-Origin" : "*"
  };
  return headers;
},
getLink: function(url, options){
  var result = 'ok';
  try{
    result = HTTP.get(url, options);
  } catch (error) {
      if (error.error && error.error.match(/404/)){
        result = 'bad';
      }
      if (error.reason && error.reason.match(/404/)){
        result = 'bad';
      }

      if(error.error)
        console.log("ERROR: " + error.error);
      if(error.reason)
        console.log("REASON: " + error.reason);

      console.log("URL: " + url);
      console.log("Oh No!: " + error);
      result = 'bad';
  }
    return result;
},
nullOp: function (){
 // do nothing
}
});
