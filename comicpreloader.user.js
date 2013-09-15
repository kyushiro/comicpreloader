// ==UserScript==
// @name           MangaPanda auto loader
// @namespace      http://www.geeksphere.com
// @description    MangaPanda auto loader
// @include        http://www.mangapanda.com/*
// @grant          none
// ==/UserScript==

var showOnSamePage = false;

window.setTimeout(function(){
	$(function(){

		$('[id^="ad"]').remove();
		var finished = false;

		var content = $("body").html();
		getNext(content);

		function getNext(r){

			if (finished) return;
			var imgElem = $(r).find('#img');
			if (imgElem.length == 0) {
				finished = true;
				return;
			}
			var link = imgElem.parent();
			var nextImg = imgElem.attr('src');
			if (nextImg != $('body').find("#img").attr('src')) {
				var fade = (showOnSamePage) ? 'In' : 'Out';
				$('#imgholder').append('<img src="'+nextImg+'" style="display:none; margin-top:10px;" onload="$(this).fade'+fade+'();" class="newImages" />');
			}
			var newImg = imgElem.parent().attr('href');
			$.get(link.attr('href'),getNext);
		}

	});
},500);