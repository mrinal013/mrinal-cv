function cvTab(evt, tabName) {
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
}

;jQuery(document).ready(function( $ ) {
	
	$("button.tablinks:first-of-type").attr('id', 'defaultOpen');
	// find active content
	document.getElementById("defaultOpen").click();

	/*
	* load general content default with ajax
	*/
	$.ajax({
		url : ajax_object.ajax_url,
		type : 'post',
		data : {
			action : 'tab_content_general',
		},
		success: function(response) {
			var response = $.parseJSON(response);
			console.log(response);
			$('.tabcontent#General').html('<div class="generalTab"></div>');
			$.each(response, function(key, value){
				if((key=='Name')||(key=='Address')) {
					$('.generalTab').append('<p>'+value+'</p>');
				}
				if((key=='Email')||(key=='Mobile')){
					$('.generalTab').append('<p>'+key+': '+value+'</p>');
				}
				if(key=='Objective') {
					$('.generalTab').append('<strong>'+key+'</strong><p>'+value+'</p>');
				}
				if(key=='image'){
					$('.generalTab').append('<img src="'+value+'"/>');
				}
			});
		}	
	});

	$(".tablinks").click(function() {
		$(".tablinks").trigger("displayPanel");
	});
	$(".tablinks.active").bind("displayPanel", function() {
		var activeTab = $(".tablinks.active").attr("onclick");
		var OriginalTabName = activeTab.split(", '")[1].split("'")[0];
		var activeContent = OriginalTabName.toLowerCase();
		/*
		* load clicked tab content with ajax
		*/
		$.ajax({
			url : ajax_object.ajax_url,
			type : 'post',
			data : {
				action : 'tab_content_' + activeContent,
			},
			success: function(response) {
				var response = $.parseJSON(response);
				console.log(response);
				if(activeContent=='general') {
					$('.tabcontent#'+OriginalTabName).html('<div class="generalTab"></div>');
					$.each(response, function(key, value){
						if((key=='Name')||(key=='Address')) {
							$('.generalTab').append('<p>'+value+'</p>');
						}
						if((key=='Email')||(key=='Mobile')){
							$('.generalTab').append('<p>'+key+': '+value+'</p>');
						}
						if(key=='Objective') {
							$('.generalTab').append('<strong>'+key+'</strong><p>'+value+'</p>');
						}
						if(key=='image'){
							$('.generalTab').append('<img src="'+value+'"/>');
						}
					});
				}
				if(activeContent=='skill') {
					$('.tabcontent#'+OriginalTabName).html('<div class="skillTab"></div>');
					$.each(response, function(key, value){
						$('.skillTab').append('<ul id='+ key +'><strong>'+ key +'</strong></ul>');
						$.each(value, function(k, v){
							$('.skillTab ul#'+key).append('<li>'+ v +'</li>');
						});
					});
				}
				if(activeContent=='employment') {
					$('.tabcontent#'+OriginalTabName).html('<table class="employTab"></table>');
					$.each(response, function(key, value){
						$('.employTab').append('<tr id='+ key +'></tr>');
						$.each(value, function(k, v){
							$('.employTab tbody>tr#'+key).append('<td class='+k+'>'+v+'</td>');
							// if($.isArray(v)){
							// 	$('.employTab tbody>tr#'+key+' td.'+k).html('<ul class='+key+'></ul>');
							// 	$.each(v, function(i, j){
							// 		$('td.'+k+'>ul.'+k).append('<li>'+j+'</li>');
							// 	});
							// }
						});
					});
				}
				if(activeContent=='portfolio') {
					console.log(response);
					$('.tabcontent#'+OriginalTabName).html('<table class="portfolioTab"></table>');
					$.each( response, function(key, value){
						$('.portfolioTab').append('<tr id='+ key +'></tr>');
						$.each(value, function(k, v) {
							$('.portfolioTab tbody>tr#'+key).append('<td class='+k+'>'+v+'</td>');
						});
					});
				}
				if(activeContent=='education') {
					$('.tabcontent#'+OriginalTabName).html('<table class="educationTab"></table>');
					$.each( response, function(key, value){
						$('.educationTab').append('<tr id='+ key +'></tr>');
						$.each(value, function(k, v) {
							$('.educationTab tbody>tr#'+key).append('<td class='+k+'>'+v+'</td>');
						});
					});
				}
				if(activeContent=='training') {
					$('.tabcontent#'+OriginalTabName).html('<table class="trainingTab"></table>');
					$.each( response, function(key, value){
						$('.trainingTab').append('<tr id='+ key +'></tr>');
						$.each(value, function(k, v) {
							$('.trainingTab tbody>tr#'+key).append('<td class='+k+'>'+v+'</td>');
						});
					});
				}
				if(activeContent=='personal') {
					$('.tabcontent#'+OriginalTabName).html('<div class="personalTab"></div>');
					$.each(response, function(key, value){
						if(!$.isPlainObject(value)){
							$('#'+OriginalTabName+' .personalTab').append('<p>'+key+': '+value+'</p>');
						} else {
							$('#'+OriginalTabName+' .personalTab').append('<table></table>');
							$.each(value, function(k, v){
								$('.personalTab table').append('<tr id='+ k +'></tr>');
								$('.personalTab table tr#'+k).append('<td>'+k+'</td>');
								$.each(v, function(i, j){
									$('.personalTab table tr#'+k).append('<td>'+j+'</td>');
								});

							});
						}
					});
				}
				if(activeContent=='social') {
					$('.tabcontent#'+OriginalTabName).html('<div class="socialTab"></div>');
					$.each(response, function(key, value){
						$('#'+OriginalTabName+' .socialTab').append('<p>'+key+': <a href="'+value+'">'+value+'</a></p>');
					});
				}
				if(activeContent=='references') {
					$('.tabcontent#'+OriginalTabName).html('<div class="referencesTab"></div>');
					$.each(response, function(key, value){
						$('#'+OriginalTabName+' .referencesTab').append('<p>'+key+'</p>');
						$.each(value, function(k, v){
							$('#'+OriginalTabName+' .referencesTab').append('<p>'+v+'</p>');
						});
						$('#'+OriginalTabName+' .referencesTab').append('<hr/>');
					});
				}
			}
		});
	});
});