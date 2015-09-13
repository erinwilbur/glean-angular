Units = new Mongo.Collection('units');

Units.allow({
  update: function(userId, unit) { return ownsDocument(userId, unit); },
  remove: function(userId, unit) { return ownsDocument(userId, unit); },
});

Units.deny({
  update: function(userId, unit, fieldNames) {
    return (_.without(fieldNames, 'url', 'title').length > 0 );
  }
});

Meteor.methods({
  unitClaim: function(claimAttributes) {
    check(Meteor.userId(), String);
    check(claimAttributes, {
      _id: String,
      anonymous: Boolean,
      claimedBy: String,
      unclaimStatus: Boolean
    });

    var unitToUpdate = Units.findOne({_id: claimAttributes._id});

    if (unitToUpdate.unclaimStatus == false){
        alert('This item has already been claimed');
    } else {
        delete claimAttributes._id;
        Units.update(unitToUpdate, {$set: claimAttributes}, function(error){
          if(error)
              return alert(error.reason);
        });
    }

  },
  unitInsert: function(unitAttributes) {
    check(Meteor.userId(), String);
    check(unitAttributes, {
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

    var unitWithSameLink = Units.findOne({url: unitAttributes.url, author: Meteor.user().emails[0].address});
    if (unitWithSameLink) {
      return {
        unitExists: true,
        _id: unitWithSameLink._id
      }
    }

    var user = Meteor.user();
    var unit = _.extend(unitAttributes, {
      userId: user._id,
      submitted: new Date()
    });

    var unitId = Units.insert(unit);

    return {
      _id: unitId
    };
  },
  unitUpdate: function(unitAttributes) {
    check(Meteor.userId(), String);
    check(unitAttributes, {
        _id: String,
        title: String,
        url: String,
    });

    var unitToUpdate = Units.findOne({_id: unitAttributes._id});
    var unitWithSameLink = Units.findOne({url: unitAttributes.url, author: Meteor.user().emails[0].address});
    var unitWithSameTitle = Units.findOne({title: unitAttributes.title, author: Meteor.user().emails[0].address});

    if (unitWithSameLink && unitWithSameTitle) {
      return {
        linkExists: true,
        _id: unitWithSameLink._id
      }
    }else if (unitWithSameTitle) {
      if (unitToUpdate._id != unitWithSameTitle._id){
        return {
          titleExists: true,
          _id: unitWithSameTitle._id
        }
      }
    } else if (unitWithSameLink) {
      if (unitToUpdate._id != unitWithSameLink._id){
        return {
          linkExists: true,
          _id: unitWithSameTitle._id
        }
      }
    }

    delete unitAttributes._id;
    var unit = _.extend(unitAttributes, {
      updated: new Date()
    });

    Units.update(unitToUpdate, {$set: unitAttributes}, function(error) {
      if (error) {
        alert(error.reason);
      }
    });

    return {
      _id: unitToUpdate._id
    };
  }
});
