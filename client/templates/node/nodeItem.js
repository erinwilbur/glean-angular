Template.nodeItem.helpers({
  anonymous: function() {
    return this.anonymous;
  },
  ownPost: function() {
    return this.userId === Meteor.userId();
  },
  unclaimed: function() {
    return this.unclaimStatus;
  },
  unfinished: function() {
    return this.unfinishStatus;
  },
  domain: function() {
    var a = document.createElement('a');
    a.href = this.url;
    return a.hostname;
  }
});
