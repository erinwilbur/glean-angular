Template.userView.helpers({
  nodes: function (){
    return Nodes.find({"author": Meteor.user().emails[0].address},{sort : {submitted: -1}});
  },
});
