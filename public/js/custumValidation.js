$( "#signupForm" ).validate( {
				rules: {
					name: {
						required: true
						
					},
					title: {
						required: true
					},
					email: {
						required: true,
						email: true
					},
					password: {
						required: true,
						minlength: 5
					},
					confirmation: {
						required: true,
						minlength: 5,
						equalTo: "#password"
					}
					
				},
				success:function (argument) {
					argument.text('ok !').addClass('valid');
					// body...
				}
				
			} );