/*
Theme Name: Interaction 15
Theme URI: http://interaction15.ixda.org/
Description: 
Author: Rob Nero
Author URI: 
Version: 1.0
*/


/*
===============================================================
POST TITLE FIELD
reposition on the page
*/
$(window).ready(function(){
	//$('.acf-form-fields>div').appendTo($('.acf-form-fields:nth-child(5)'));
	//$('div[data-name="_post_title"]').css('border', '1px dashed red'); //yes
	//$('.acf-form-fields > div:nth-child(14n)').css('border', '1px dashed red'); //yes
	//$('.acf-form-fields > div:nth-child(14)').after('div[data-name="_post_title"]'); //no
	//$('.acf-form-fields').append('<div>THIS</div>'); //yes
	
	//MOVES FIELD LOWER ON PAGE
	//$('div[data-name="_post_title"]').appendTo('.acf-form-fields > div:nth-child(15)'); //YES!
	//$('div[data-name="_post_title"]').css('margin-top','20px');
	
	//CHANGE TEXT TO TITLE LABEL
	$("label[for='acf-_post_title']").text('Title of Submission ');
	$("label[for='acf-_post_title']").append('<span class="acf-required">*</span>');
});