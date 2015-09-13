Nodes = new Mongo.Collection('nodes');

Nodes.allow({
  update: function(userId, node) { return ownsDocument(userId, node); },
  remove: function(userId, node) { return ownsDocument(userId, node); },
});

Nodes.deny({
  update: function(userId, node, fieldNames) {
    return (_.without(fieldNames, 'url', 'title').length > 0 );
  }
});

Meteor.methods({
  nodeClaim: function(claimAttributes) {
    check(Meteor.userId(), String);
    check(claimAttributes, {
      _id: String,
      anonymous: Boolean,
      claimedBy: String,
      unclaimStatus: Boolean
    });

    var nodeToUpdate = Nodes.findOne({_id: claimAttributes._id});

    if (nodeToUpdate.unclaimStatus == false){
        alert('This item has already been claimed');
    } else {
        delete claimAttributes._id;
        Nodes.update(nodeToUpdate, {$set: claimAttributes}, function(error){
          if(error)
              return alert(error.reason);
        });
    }

  },
  nodeInsert: function(nodeAttributes) {
    check(Meteor.userId(), String);
    check(nodeAttributes, {
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

    var nodeWithSameLink = Nodes.findOne({url: nodeAttributes.url, author: Meteor.user().emails[0].address});
    if (nodeWithSameLink) {
      return {
        nodeExists: true,
        _id: nodeWithSameLink._id
      }
    }

    var user = Meteor.user();
    var node = _.extend(nodeAttributes, {
      userId: user._id,
      submitted: new Date()
    });

    var nodeId = Nodes.insert(node);

    return {
      _id: nodeId
    };
  },
  nodeUpdate: function(nodeAttributes) {
    check(Meteor.userId(), String);
    check(nodeAttributes, {
        _id: String,
        title: String,
        url: String,
    });

    var nodeToUpdate = Nodes.findOne({_id: nodeAttributes._id});
    var nodeWithSameLink = Nodes.findOne({url: nodeAttributes.url, author: Meteor.user().emails[0].address});
    var nodeWithSameTitle = Nodes.findOne({title: nodeAttributes.title, author: Meteor.user().emails[0].address});

    if (nodeWithSameLink && nodeWithSameTitle) {
      return {
        linkExists: true,
        _id: nodeWithSameLink._id
      }
    }else if (nodeWithSameTitle) {
      if (nodeToUpdate._id != nodeWithSameTitle._id){
        return {
          titleExists: true,
          _id: nodeWithSameTitle._id
        }
      }
    } else if (nodeWithSameLink) {
      if (nodeToUpdate._id != nodeWithSameLink._id){
        return {
          linkExists: true,
          _id: nodeWithSameTitle._id
        }
      }
    }

    delete nodeAttributes._id;
    var node = _.extend(nodeAttributes, {
      updated: new Date()
    });

    Nodes.update(nodeToUpdate, {$set: nodeAttributes}, function(error) {
      if (error) {
        alert(error.reason);
      }
    });

    return {
      _id: nodeToUpdate._id
    };
  }
});
