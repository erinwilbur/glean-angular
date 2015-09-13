Template.unitCreate.events({
  'submit form': function(e) {
    e.preventDefault();

    var unit = {
      title: $(e.target).find('[name=title]').val(),
      url: $(e.target).find('[name=url]').val(),
      author: Meteor.user().emails[0].address
    };

    Meteor.call('unitInsert', unit, function(error, result) {
      if (error)
        return alert(error.reason);

      if (result.unitExists)
        alert('This unit has already been added');

      Router.go('postPage', {_id: result._id});
    });
  }
});
