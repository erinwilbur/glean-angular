Template.postEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var currentPostId = this._id;

    var postProperties = {
      _id: this._id,
      url: $(e.target).find('[name=url]').val(),
      title: $(e.target).find('[name=title]').val(),
    }

    var testurl = postProperties.url;

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
    postProperties.url = testurl;

    Meteor.call('postUpdate', postProperties, function(error, result){
      if (error)
          return alert(error.reason);

      if (result.linkExists)
        alert('The link has already been posted.')

      if (result.titleExists)
        alert('The title has already been posted.')

        Router.go('postPage', {_id: result._id});
    });
  },

  'click .delete': function(e) {
      e.preventDefault();

      if(confirm("Delete this post?")) {
        var currentPostId = this._id;
        Posts.remove(currentPostId);
        Router.go('postsList');
      }
  }
});
