import { Template } from 'meteor/templating'

Template.Login.onRendered(function() {

  $('.form').find('input, textarea').on('keyup blur focus', function (e) {
    var $this = $(this),
        label = $this.prev('label');

  	  if (e.type === 'keyup') {
  			if ($this.val() === '') {
            label.removeClass('active highlight');
          } else {
            label.addClass('active highlight');
          }
      } else if (e.type === 'blur') {
      	if( $this.val() === '' ) {
      		label.removeClass('active highlight');
  			} else {
  		    label.removeClass('highlight');
  			}
      } else if (e.type === 'focus') {

        if( $this.val() === '' ) {
      		label.removeClass('highlight');
  			}
        else if( $this.val() !== '' ) {
  		    label.addClass('highlight');
  			}
      }
  });

  $('.tab a').on('click', function (e) {
    e.preventDefault();

    $(this).parent().addClass('active');
    $(this).parent().siblings().removeClass('active');

    target = $(this).attr('href');

    $('.tab-content > div').not(target).hide();

    $(target).fadeIn(600);
  });

});

Template.Login.events({
  'submit #loginForm': function(event) {
    event.preventDefault();

    let target = event.target;
    let userName = target.querySelector('input[name="email"]').value;
    let password = target.querySelector('input[name="password"]').value;

    Meteor.loginWithPassword(userName, password, function(error){
      if (error) {
        toastr.error(error.message, 'Something went wrong');
      } 
    });
  },
  'submit #signUpForm': function(event) {
    event.preventDefault();

    let target = event.target;
    let firstname = target.querySelector('input[name="firstname"]').value;
    let lastname = target.querySelector('input[name="lastname"]').value;
    let email = target.querySelector('input[name="email"]').value;
    let password = target.querySelector('input[name="password"]').value;
    let username = lastname.toLowerCase().substring(0, 3) + '' + firstname.toLowerCase().substring(0, 3);

    if(firstname && lastname && email && password && username) {
      Accounts.createUser({
        username: username,
        password: password,
        email: email,
        profile: {
          name: firstname + ' ' + lastname
        }
      }, function(error) {
        toastr.error(error.message, 'Something went wrong');
      });
    }
  },
  'click .password-reset': function(event) {
    event.preventDefault();

    console.log('Password reset');
  }
});
