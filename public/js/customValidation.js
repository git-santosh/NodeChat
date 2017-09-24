
			$( ".form-signin" ).validate( {
				rules: {
					
					name: {
						required: true
					},
					title: {
						required: true
					},
					email: {
						required: true,
						email:true
					},
					password: {
						required: true,
						minlength: 5
					},
					confirmation: {
						/*equalTo: "#password",*/
						required: true,
						minlength: 5
						
					}
				},
				success:function(element){
					element.text('ok!').addClass('valid');
				}
				
			} );
	