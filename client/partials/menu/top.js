Template.MenuTop.events({
  'click #logout': function(event){
    Meteor.logout(function(error){
      if(error){
        toastr.error(error.message, 'Something went wrong');
      }
    });
  }
});
