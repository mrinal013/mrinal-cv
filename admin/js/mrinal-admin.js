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
	// defaultly open general tab
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
			$('.generalTab').append('<div class="basic"></div><div class="image"></div><div class="objective"></div>');
			$.each(response, function(key, value){
				if(key=='Name') {
					$('.generalTab .basic').append('<p class="name">'+value+'</p>');
				}
				if(key=='Address') {
					$('.generalTab .basic').append('<p>'+value+'</p>');
				}
				if(key=='Email'){
					$('.generalTab .basic').append('<p>'+key+': <a href="mailto:'+value+'">'+value+'</a></p>');
				}
				if(key=='Mobile'){
					$('.generalTab .basic').append('<p>'+key+': '+value+'</p>');
				}
				if(key=='Objective') {
					$('.generalTab .objective').append('<strong>'+key+'</strong><p>'+value+'</p>');
				}
				if(key=='image'){
					$('.generalTab .image').append('<img src="'+value+'" alt="My Picture"/>');
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
					$('.generalTab').append('<div class="basic"></div><div class="image"></div><div class="objective"></div>');
					$.each(response, function(key, value){
						if(key=='Name') {
							$('.generalTab .basic').append('<p class="name">'+value+'</p>');
						}
						if(key=='Address') {
							$('.generalTab .basic').append('<p>'+value+'</p>');
						}
						if(key=='Email'){
							$('.generalTab .basic').append('<p>'+key+': <a href="mailto:'+value+'">'+value+'</a></p>');
						}
						if(key=='Mobile'){
							$('.generalTab .basic').append('<p>'+key+': '+value+'</p>');
						}
						if(key=='Objective') {
							$('.generalTab .objective').append('<strong>'+key+'</strong><p>'+value+'</p>');
						}
						if(key=='image'){
							$('.generalTab .image').append('<img src="'+value+'" alt="My Picture"/>');
						}
					});
				}
				if(activeContent=='skill') {
					$('.tabcontent#'+OriginalTabName).html('<div class="skillTab"></div>');
					$.each(response, function(key, value){
						$('.skillTab').append('<ol id='+ key +'><strong>'+ key +'</strong></ol>');
						$.each(value, function(k, v){
							$('.skillTab ol#'+key).append('<li>'+ v +'</li>');
						});
					});
				}
				if(activeContent=='employment') {
					$('.tabcontent#'+OriginalTabName).html('<table class="employTab"></table>');
					$.each(response, function(key, value){
						$('.employTab').append('<tr id='+ key +'></tr>');
						$.each(value, function(k, v){
							if(k==Object.keys(value)[0]) {
								$('.employTab tbody>tr#'+key).append('<td class='+k+'><a href="'+v+'" target="_blank">'+k+'</a></td>');
							} else {
								$('.employTab tbody>tr#'+key).append('<td class='+k+'>'+v+'</td>');
							}								
						});
					});
				}
				if(activeContent=='portfolio') {
					console.log(response);
					$('.tabcontent#'+OriginalTabName).html('<table class="portfolioTab"></table>');
					$.each( response, function(key, value){
						$('.portfolioTab').append('<tr id='+ key +'></tr>');
						$.each(value, function(k, v) {
							if(k=='url'){
								$('.portfolioTab tbody>tr#'+key).append('<td class='+k+'><a href="'+v+'">'+v+'</a></td>');
							} else {
								$('.portfolioTab tbody>tr#'+key).append('<td class='+k+'>'+v+'</td>');
							}
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
					console.log(response);
					$('.tabcontent#'+OriginalTabName).html('<div class="personalTab"></div>');
					$.each(response, function(key, value){
						$('#'+OriginalTabName+' .personalTab').append('<p><strong>'+key+':</strong> '+value+'</p>');
							
					});
				}
				if(activeContent=='social') {
					$('.tabcontent#'+OriginalTabName).html('<div class="socialTab"></div>');
					$.each(response, function(key, value){
						$('#'+OriginalTabName+' .socialTab').append('<p>'+key+': <a href="'+value+'" target="_blank">'+value+'</a></p>');
					});
				}
				if(activeContent=='references') {
					$('.tabcontent#'+OriginalTabName).html('<div class="referencesTab"></div>');
					$.each(response, function(key, value){
						$('#'+OriginalTabName+' .referencesTab').append('<p class="name">'+key+'</p>');
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