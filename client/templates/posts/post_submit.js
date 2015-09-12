Template.postSubmit.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      title: $(e.target).find('[name=title]').val(),
      url: $(e.target).find('[name=url]').val(),
      author: Meteor.user().emails[0].address,
      price: $(e.target).find('[name=price]').val(),
      description: $(e.target).find('[name=description]').val(),
      unclaimStatus: true,
      claimedBy: '',
      anonymous: false,
      access: $(e.target).find('[name=access]').val()
    };

    if (post.access == '') {
      post.access = [];
    } else {
      var names = post.access.split(' ');
      if(names.length > 0){
          console.log("found " + names.length + " names");
        Meteor.call('nullOp', function(error, result){
          post.access = [];
          for (i =0; i < names.length; i++){
            var name = names[i];
            Meteor.call('checkUser', name, function(error, result){
              if(result && result == 'notfound'){
                console.log("did not find: " + name);
                console.log(name + " notfoundresult " + result);
      //add an alert to ask the user if they want to send an invite
                Meteor.call('inviteEmail', name, {}, function(error, result){
                  console.log("inviting: " + name);
                  if(error)
                    alert(error.reason);
                });
              } else if(result && result == 'found'){
                console.log("adding: " + name);
                console.log(name + " foundresult " + result);
                post.access.push(name);
              } else if(result && result == 'error'){
                console.log("bummer man, an error happened with: " + name);
              }
              console.log('end of checkuser');
            });
            console.log('end of for loop');
            console.log('access length: ' + post.access.length );
          }//end of for
        });//end of nullOp
      }// end of if names.length > 0
    }//end of else


    var testurl = post.url;

    var parser = document.createElement('a');
    parser.href = testurl;

    var isamazonlink = false;
    //var affiliatecode = Meteor.call('getAffiliateCode', parser.hostname);
    //console.log(affiliatecode);
    if (parser.hostname.match(/amazon\.com/)){
        isamazonlink = true;
        if(testurl.search(/tag=/) == -1){
            testurl += '&tag=presentsocial-20';
        }
    }
    post.url = testurl;
    got404 = false;
    Meteor.call('getLink', testurl, {}, function(error, result){
      if (result && result == 'bad'){
        got404 = true;
      }
      if (result && result.statusCode==200){

        if(isamazonlink){
          var doc = document.implementation.createHTMLDocument("example");
          doc.documentElement.innerHTML = result.content;
          if(doc.getElementById("productTitle") != null)
            post.description = doc.getElementById("productTitle").innerHTML;
          if(doc.getElementById("current-price") != null && post.price == '$0.00')
            post.price = doc.getElementById("current-price");
        }

        Meteor.call('postInsert', post, function(error, result) {
          if (error)
            return alert(error.reason);

          if (result.postExists)
            alert('This link has already been posted');

            Router.go('postSubmit', {_id: result._id});
        });
      } else {
        if(got404){
          alert('We could not find that link, please try another.');
        }
        if(parser.protocol != 'http:' || parser.protocol != 'https:'){
          alert('Please put http at the front of the link');
        }
      }
    });
  }
});
Template.postSubmit.helpers({
  posts: function (){
    return Posts.find({"author": Meteor.user().emails[0].address},{sort : {submitted: -1}});
  }
});
