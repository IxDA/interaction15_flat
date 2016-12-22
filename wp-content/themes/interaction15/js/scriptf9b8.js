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
STICKY PRIMARY NAVIGATION

*/

var mn, navHeight, mns, hdr, wrapper, mnLink;

$(window).ready(function() {
	getSizes();
	mainNav();
});
$(window).resize(function() {
	getSizes();
	mainNav();
});

function getSizes(){
	mn = $('.primary-nav');
	navHeight = $('.primary-nav').height();
	
	mns = 'primary-nav-scrolled';
	hdr = $('.banner').height();
	
	wrapper = $('.wrapper.main');
}

$(window).scroll(function() {
	if( $(this).scrollTop() > hdr ) {
		mn.addClass(mns);
		wrapper.css('padding-top',navHeight);
	}
	else {
		mn.removeClass(mns);
		wrapper.css('padding-top',0);
	}
});

function mainNav() {
	mnLink = $('.menu-link a');

	mnLink.add(mn).add($('body')).unbind();

	mnLink.bind('click touchstart', function(e) {
		e.stopPropagation();
		if ($('.menu-link').css('display') == 'block') {
			e.preventDefault();
			mnLink.toggleClass('active');
			mn.toggleClass('active');	
		}
	});

	mn.bind('click touchstart', function(e) {
		e.stopPropagation();
	});

	$('body').bind('click touchstart', function(e) {
		if (mn.hasClass('active')) {
			e.preventDefault();
			mn.removeClass('active');
		}
	});
}


/*
===============================================================
SUBMIT SESSION BUTTON
add bootstrap class to button
*/
/*
$(window).ready(function(){
	//ADD BOOTSTRAP CLASSES
	if($('.button.button-primary').length){
		//YES
		$('.button.button-primary').addClass('btn btn-primary');
	}
});
*/


/*
===============================================================
RESPONSIVE VIDEOS

	FluidVids.js - Fluid and Responsive YouTube/Vimeo Videos v1.0.0
	by Todd Motto: http://www.toddmotto.com
	Latest version: https://github.com/toddmotto/Fluid-Responsive-Videos
	
	Copyright 2013 Todd Motto
	Licensed under the MIT license
	http://www.opensource.org/licenses/mit-license.php

	A raw JavaScript alternative to FitVids.js, fluid width video embeds
*/ 
    (function() {
    	var iframes = document.getElementsByTagName('iframe');
    	
    	for (var i = 0; i < iframes.length; ++i) {
    		var iframe = iframes[i];
    		var players = /www.youtube.com|player.vimeo.com/;
    		if(iframe.src.search(players) !== -1) {
    			var videoRatio = (iframe.height / iframe.width) * 100;
    			
    			iframe.style.position = 'absolute';
    			iframe.style.top = '0';
    			iframe.style.left = '0';
    			iframe.width = '100%';
    			iframe.height = '100%';
    			
    			var div = document.createElement('div');
    			div.className = 'video-wrap';
    			div.style.width = '100%';
    			div.style.position = 'relative';
    			div.style.paddingTop = videoRatio + '%';
    			//ADD BY SMART:
    			//div.style.marginBottom = '40px';
    			//END
    			
    			var parentNode = iframe.parentNode;
    			parentNode.insertBefore(div, iframe);
    			div.appendChild(iframe);
    		}
    	}
    })();
