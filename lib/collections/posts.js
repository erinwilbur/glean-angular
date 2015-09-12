Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    return (_.without(fieldNames, 'url', 'title').length > 0 );
  }
});

Meteor.methods({
  postClaim: function(claimAttributes) {
    check(Meteor.userId(), String);
    check(claimAttributes, {
      _id: String,
      anonymous: Boolean,
      claimedBy: String,
      unclaimStatus: Boolean
    });

    var postToUpdate = Posts.findOne({_id: claimAttributes._id});

    if (postToUpdate.unclaimStatus == false){
        alert('This item has already been claimed');
    } else {
        delete claimAttributes._id;
        Posts.update(postToUpdate, {$set: claimAttributes}, function(error){
          if(error)
              return alert(error.reason);
        });
    }

  },
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String,
      author: String,
      price: String,
      description: String,
      unclaimStatus: Boolean,
      claimedBy: String,
      anonymous: Boolean,
      access: Array
    });

    var postWithSameLink = Posts.findOne({url: postAttributes.url, author: Meteor.user().emails[0].address});
    if (postWithSameLink) {
      return {
        postExists: true,
        _id: postWithSameLink._id
      }
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      submitted: new Date()
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  },
  postUpdate: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
        _id: String,
        title: String,
        url: String,
    });

    var postToUpdate = Posts.findOne({_id: postAttributes._id});
    var postWithSameLink = Posts.findOne({url: postAttributes.url, author: Meteor.user().emails[0].address});
    var postWithSameTitle = Posts.findOne({title: postAttributes.title, author: Meteor.user().emails[0].address});

    if (postWithSameLink && postWithSameTitle) {
      return {
        linkExists: true,
        _id: postWithSameLink._id
      }
    }else if (postWithSameTitle) {
      if (postToUpdate._id != postWithSameTitle._id){
        return {
          titleExists: true,
          _id: postWithSameTitle._id
        }
      }
    } else if (postWithSameLink) {
      if (postToUpdate._id != postWithSameLink._id){
        return {
          linkExists: true,
          _id: postWithSameTitle._id
        }
      }
    }

    delete postAttributes._id;
    var post = _.extend(postAttributes, {
      updated: new Date()
    });

    Posts.update(postToUpdate, {$set: postAttributes}, function(error) {
      if (error) {
        alert(error.reason);
      }
    });

    return {
      _id: postToUpdate._id
    };
  }
});
