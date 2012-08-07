/*!
 * jQuery word-break keep-all Plugin
 * ver 1.12
 *
 * Copyright 2012, Ahn Hyoung-woo (mytory@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://code.google.com/p/jquery-word-break-keep-all-plugin/
 * http://mytory.co.kr/archives/2801
 *
 * Date: 2012-08-07
 */

jQuery.fn.wordBreakKeepAll = function(option) {
	var defaultOption = {
		OffForIE: false // If IE, turn off plugin.
	};

	var opt = $.extend(defaultOption,option);

	if( /MSIE/.test(navigator.userAgent) ){
		var addWordBreakKeepAll = function(obj){
			if(opt.OffForIE == false){
				$(obj).css({
					'word-break': 'keep-all',
					'word-wrap': 'break-word'
				});
				if($(obj).css('display') == 'inline'){
					$(obj).css('display','block');
				}
			}
		};
	}else{
		var addWordBreakKeepAll = function(obj){
			if($(obj).html() != $(obj).text()){
				if (typeof window.console != 'undefined' && typeof window.console.log != 'undefined') {
					console.log('대상이 된 요소 안에 텍스트만 있어야 제대로 작동합니다.');
				}
				return false;
			}else{
				var textArr = $(obj).text().split(' ');
				$(obj).text('');
				for(var i=0,j=textArr.length; i<j; i++){
				  	
					$('<span/>',{
						'text': textArr[i],
						'style': 'white-space: nowrap;'
					}).appendTo($(obj));
					$(obj).html($(obj).html()+' ');
				
				};
			}
		};
	}
	return this.each(function(){
    	addWordBreakKeepAll(this);
  	});
};