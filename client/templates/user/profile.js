Template.userProfile.events({
  'submit form': function(e) {
    e.preventDefault();

    var post = {
      title: $(e.target).find('[name=title]').val(),
      url: $(e.target).find('[name=url]').val(),
      author: Meteor.user().emails[0].address
    };

    Meteor.call('postInsert', post, function(error, result) {
      if (error)
        return alert(error.reason);

      if (result.postExists)
        alert('This link has already been posted');

      Router.go('postPage', {_id: result._id});
    });
    
  }
});

Template.userProfile.helpers({
  posts: function (){
    return Posts.find({"author": Meteor.user().emails[0].address},{sort : {submitted: -1}});
  },
  nodes: function (){
    return Nodes.find({"author": Meteor.user().emails[0].address},{sort : {submitted: -1}});
  },
  units: function (){
    return Units.find({"author": Meteor.user().emails[0].address},{sort : {submitted: -1}});
  }
});
