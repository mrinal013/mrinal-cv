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
			$('.tabcontent#General').html('<h2>General</h2>');
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
				console.log(response);
				if(activeContent=='general') {
					$('.tabcontent#'+OriginalTabName).html('<h2>'+OriginalTabName+'</h2>');
				}
				if(activeContent=='skill') {
					$('.tabcontent#'+OriginalTabName).html('<h2>'+OriginalTabName+'</h2>');
				}
				if(activeContent=='employment') {
					$('.tabcontent#'+OriginalTabName).html('<h2>'+OriginalTabName+'</h2>');
				}
				if(activeContent=='portfolio') {
					$('.tabcontent#'+OriginalTabName).html('<h2>'+OriginalTabName+'</h2>');
				}
				if(activeContent=='education') {
					$('.tabcontent#'+OriginalTabName).html('<h2>'+OriginalTabName+'</h2>');
				}
				if(activeContent=='training') {
					$('.tabcontent#'+OriginalTabName).html('<h2>'+OriginalTabName+'</h2>');
				}
				if(activeContent=='personal') {
					$('.tabcontent#'+OriginalTabName).html('<h2>'+OriginalTabName+'</h2>');
				}
				if(activeContent=='social') {
					$('.tabcontent#'+OriginalTabName).html('<h2>'+OriginalTabName+'</h2>');
				}
				if(activeContent=='references') {
					$('.tabcontent#'+OriginalTabName).html('<h2>'+OriginalTabName+'</h2>');
				}
			}
		});
	});
	
});