Template.claimItem.events({
  'submit form': function(e) {
    e.preventDefault();

    var claim = {
      _id: this._id,
      anonymous: $(e.target).find('[name=anonymous]')[0].checked,
      claimedBy: Meteor.user().emails[0].address,
      unclaimStatus: false
    }

      Meteor.call('postClaim', claim, function(error){
        if (error)
            return alert(error.reason);

        Router.go('postsList');
      });
  }
});
Template.claimItem.helpers({
  anonymous: function() {
    return this.anonymous;
  },
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  unclaimed: function() {
    return this.unclaimStatus;
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});
