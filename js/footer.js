$(function($) {

	$('input[type="radio"]:first').click(); // Best way to validate a required radio button set according to me. I don't usually do it with JS though...
	$('form input:first').focus(); // Reset to the first form field since we jumped to the Favorite field.

	$('form').on('submit', function(e) {
		e.preventDefault();
		validateform();
	});

	function validateform() {

		let fields = {'alder': 'Ålder', 'namn': 'Namn', 'favorit': 'Favorit', 'textarea': 'Lite om dig'};
		let errors = new Array();

		$('form input[type="text"]').each(function() {

			let thename = $(this).attr('name');
			let thevalue = $(this).val();

			if(thevalue == '') {
				errors.push({'field': fields[thename], 'message': 'får inte vara tomt.'});
			}
			if(thename == 'namn' && thevalue.length < 3) {
				errors.push({'field': fields[thename], 'message': 'måste vara längre än tre tecken.'});
			}

			if(thename == 'namn' && thevalue.indexOf(' ') < 0) {
				errors.push({'field': fields[thename], 'message': 'måste innehålla ett mellanslag.'});
			}

			if(thename == 'alder') {
				if(!$.isNumeric(thevalue)) {
					errors.push({'field': fields[thename], 'message': 'måste vara numeriskt.'});
				} else {
					if(thevalue < 0 || thevalue > 125) {
						errors.push({'field': fields[thename], 'message': 'måste vara ett tal mellan 0 och 125.'});	
					}
				}
			}
		})

		$('form textarea').each(function() {

			let $this = $(this);

			if($this.val() == '') {
				errors.push({'field': fields['textarea'], 'message': 'får inte vara tomt.'});
			}

			if($this.val().length < 30) {
				errors.push({'field': fields['textarea'], 'message': 'måste vara minst 30 tecken.'});
			}
		});

		if(errors.length > 0) {
			let errormessage = 'Vi stötte tyvärr på några problem med formuläret. Se gärna över dom och försök igen.\n';

			for(let i = 0; i <= errors.length-1; i++) {
				errormessage += '\n- Fältet ' + errors[i].field + ' ' + errors[i].message;
			}

			console.log(errormessage);
		} else {
			console.log('Allt ok!');
		}
	}

});