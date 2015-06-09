var user = new UserModel();
var App = Backbone.Router.extend({
	routes: {
		'': 'profile',
		'edit': 'edit',
		
	},
	profile: function() {
		$('.page').hide();
		$('#profile').show();
	},
	edit: function() {
		$('.page').hide();
		$('#edit').show();
	},
	
});

// console.log( $('.nav navbar-nav navbar-right').find('a').first());
$('.profile-usermenu').find('li').next().click(function(e){
	e.preventDefault();

	console.log('true');
	app.navigate('edit', {trigger: true});

})

//models
var user = new UserModel();

	// $('#name').val(user.get('name'));
	//$('#inputEmail3').val(user.get('email'));
	// $('#role').val(user.get('role'));
	
	//gets info from server
	$.get('http://tiny-pizza-server.herokuapp.com/collections/userModel/5576272ce315ae0300000001', function(data){
			$('#name').val(data.name);
			$('#inputEmail3').val(data.email);
			$('#role').val(data.role);	
			$('.profile-usertitle-name').html(data.name);
			$('a.dropdown-toggle').last().html(data.name);
			$('.profile-usertitle-job').html(data.role);	

	}, 'JSON');


$('#edit').find('button').click('submit',function(e){
	// console.log('true');
	user.set({
			name: $('#name').val(),
			email: $('#inputEmail3').val(),
			role: $('#role').val()
		});	
		//updates user info on server	
		$.ajax({
			url: 'http://tiny-pizza-server.herokuapp.com/collections/userModel/5576272ce315ae0300000001',
			type: 'PUT',
			data: {
					name: user.get('name'),
					email: user.get('email'),
					role: user.get('role')
				  },
			dataType: 'JSON'
		});

	});	


//update UI
user.on('change', function(e){
		$('.profile-usertitle-name').html(user.get('name'));
		$('a.dropdown-toggle').last().html(user.get('name'));
		$('.profile-usertitle-job').html(user.get('role'));
	})


var app = new App();
Backbone.history.start();