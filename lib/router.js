Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
  notFoundTemplate: 'notFound',
  waitOn: function() { return Meteor.subscribe('posts'); }
});

Router.route('/', {name: 'postsList'});

Router.route('/claim/:_id', {
    name: 'claimItem',
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/posts/:_id', {
    name: 'postPage',
    data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/wishlist/:email', {
      name: 'wishlist',
      data: function() {
          templateData = { posts: Posts.find({"author": this.params.email}) };
          return templateData;
      }
});

Router.route('/posts/:_id/edit', {
  name: 'postEdit',
  data: function() { return Posts.findOne(this.params._id); }
});

Router.route('/profile', {name: 'userProfile'});
Router.route('/submit', {name: 'postSubmit'});

var requireLogin = function() {
  if(! Meteor.user()){
    if (Meteor.loggingIn()){
      this.render(this.loadingTemplate);
    } else {
      this.render('accessDenied');
    }
  } else {
    this.next();
  }
}

Router.onBeforeAction('dataNotFound', {only: 'postPage'});
Router.onBeforeAction(requireLogin, {only: 'postSubmit'});
