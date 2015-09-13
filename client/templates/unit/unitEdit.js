Template.unitEdit.events({
  'submit form': function(e) {
    e.preventDefault();

    var node = {
      title: $(e.target).find('[name=title]').val(),
      url: $(e.target).find('[name=url]').val(),
      author: Meteor.user().emails[0].address
    };

    Meteor.call('nodeInsert', node, function(error, result) {
      if (error)
        return alert(error.reason);

      if (result.nodeExists)
        alert('This node has already been added');

      Router.go('postPage', {_id: result._id});
    });

  }
});
