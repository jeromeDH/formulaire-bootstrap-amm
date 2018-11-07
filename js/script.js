jQuery(function($){
	$.datepicker.regional['fr'] = {
		closeText: 'Fermer',
		prevText: '<Préc',
		nextText: 'Suiv>',
		currentText: 'Aujourd\'hui',
		monthNames: ['Janvier','Fevrier','Mars','Avril','Mai','Juin',
		'Juillet','Aout','Septembre','Octobre','Novembre','Decembre'],
		monthNamesShort: ['Jan','Fev','Mar','Avr','Mai','Jun',
		'Jul','Aou','Sep','Oct','Nov','Dec'],
		dayNames: ['Dimanche','Lundi','Mardi','Mercredi','Jeudi','Vendredi','Samedi'],
		dayNamesShort: ['Dim','Lun','Mar','Mer','Jeu','Ven','Sam'],
		dayNamesMin: ['Di','Lu','Ma','Me','Je','Ve','Sa'],
		weekHeader: 'Sm',
		dateFormat: 'DD, d MM, yy',
		firstDay: 1,
		isRTL: false,
		showMonthAfterYear: false,
		yearSuffix: '',
		minDate: 0,
		maxDate: '+12M +0D',
		numberOfMonths: 1,
		showButtonPanel: true,
		showAnim: 'fold',
		showOn: "button",
		buttonImage: "../css/images/calendar.gif",
		buttonImageOnly: true,
		buttonText: "Select date"
		};
	$.datepicker.setDefaults($.datepicker.regional['fr']);
});

$(function(){
	
    	$( "#datepicker" ).datepicker(); //datepicker
	
		var availableTags = [
		  "ActionScript",
		  "AppleScript",
		  "Asp",
		  "BASIC",
		  "C",
		  "C++",
		  "Clojure",
		  "COBOL",
		  "ColdFusion",
		  "Erlang",
		  "Fortran",
		  "Groovy",
		  "Haskell",
		  "Java",
		  "JavaScript",
		  "Lisp",
		  "Perl",
		  "PHP",
		  "Python",
		  "Ruby",
		  "Scala",
		  "Scheme"
		];//availabletags
	
    /*$( "#tags" ).autocomplete({
      source: availableTags,
		minLenght: 2,
    });*/
	
	$( "#tags" ).autocomplete({
  		source: function( request, response ) {
          var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
          response( $.grep( availableTags, function( item ){
              return matcher.test( item );
          }) );
      	}
	});//Autocomplete
	
	$.ajax({
		
		url:'../json/cities.json',
		method: "GET",
		dataType: "json",
		success:function(monObjet){
			
			//console.log(monObjet.length);
			
			var i = 0;
			
			var villes = [];
			
			for(i=0; i<monObjet.length; i++){
				
				//console.log(monObjet[i].name);
				
				var obj = {};
				
				obj["value"] = monObjet[i].zip;
				obj["label"] = monObjet[i].zip+ " " +monObjet[i].name;
				obj["ville"] = monObjet[i].name;
				
				villes.push(obj); //Ajoute des valeurs dans l'array "villes".
				
			}//for
			
			console.log(villes);
			
			$("#cp").autocomplete({
				
				source: function( request, response ) {
				  var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( request.term ), "i" );
				  response( $.grep( villes, function( item ){
					  return matcher.test( item.label );
				  }) );
      			},
				
				select: function(event, ui){
					
					$("#ville").val(ui.item.ville);
					
				}

				
			});//autocomplete
			
		}//success
		
	});//ajax
	
	$('#form').validetta({
		
		  onValid : function( event ) {
			event.preventDefault(); // Will prevent the submission of the form

		   //alert( 'Nice, Form is valid.' );

		 // ici faire la requête ajax


		 }, // valid
		  onError : function( event ){
			//alert( 'Stop bro !! There are some errors.');


		  }, // error


		  display : 'bubble',
		  errorClass : 'validetta-error',
		  /** Same for valid validation */
		  validClass : 'validetta-valid', // Same for valid validation
		  bubblePosition: 'right', // Bubble position // right / bottom
		  bubbleGapLeft: 15, // Right gap of bubble (px unit)
		  bubbleGapTop: 0, // Top gap of bubble (px unit)
		  /* To enable real-time form control, set this option true. */
		  realTime : true
  
	});

	
}); //ready