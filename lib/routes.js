Accounts.onLogin(function() {
  FlowRouter.go('start');
});

Accounts.onLogout(function() {
  FlowRouter.go('login');
});

FlowRouter.triggers.enter([function(context, redirect){
  if(!Meteor.userId()) {
    FlowRouter.go('login');
  }
}]);

FlowRouter.route('/',{
  name: 'start',
  action() {
    BlazeLayout.render('StartLayout');
  }
});

FlowRouter.route('/login',{
  name: 'login',
  action() {
    BlazeLayout.render('LoginLayout');
  }
});
