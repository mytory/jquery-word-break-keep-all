/*!
 * jQuery word-break keep-all Plugin
 * ver 1.0
 *
 * Copyright 2012, Ahn Hyoung-woo (mytory@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * http://code.google.com/p/jquery-word-break-keep-all-plugin/
 * http://mytory.co.kr/archives/2801
 *
 * Date: 2012-07-04
 */

jQuery.fn.wordBreakKeepAll = function() {
	if( /MSIE/.test(navigator.userAgent) ){
		var addWordBreakKeepAll = function(obj){
			$(obj).css({
				'word-break': 'keep-all',
				'word-wrap': 'break-word',	
				'display': 'block'
			});
		};
	}else{
		var addWordBreakKeepAll = function(obj){
			if($(obj).html() != $(obj).text()){
				alert('요소 안에 텍스트만 있어야 제대로 작동합니다.');
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