/*!
 * jQuery word-break keep-all Plugin
 * ver 1.3.0
 *
 * Copyright 2012, Ahn Hyoung-woo (mytory@gmail.com)
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * https://github.com/mytory/jquery-word-break-keep-all
 * http://mytory.co.kr/archives/2801
 *
 * Date: 2013-09-04
 */

jQuery.fn.wordBreakKeepAll = function(option) {
	var is_there_end_angle_bracket = function(str){
		return str.lastIndexOf('<') < str.lastIndexOf('>');
	};

	var is_there_start_angle_bracket = function(str){
		return str.lastIndexOf('>') < str.lastIndexOf('<');
	};

	var is_there_no_angle_bracket = function(str){
		//only -1
		return str.lastIndexOf('>') == str.lastIndexOf('<');
	};
	
	var defaultOption = {
		OffForIE: false, // If IE, turn off plugin.
		useCSSonIE: true // on IE, use CSS word-break: keep-all
	};

	var opt = $.extend(defaultOption,option);

	if( /MSIE/.test(navigator.userAgent) && opt.OffForIE == false && opt.useCSSonIE == true){
		var addWordBreakKeepAll = function(obj){
			$(obj).css({
				'word-break': 'keep-all',
				'word-wrap': 'break-word'
			});
			if($(obj).css('display') == 'inline'){
				$(obj).css('display','block');
			}
		};
	}else if( ! /MSIE/.test(navigator.userAgent) || /MSIE/.test(navigator.userAgent) && opt.OffForIE == false && opt.useCSSonIE == false ){
		var addWordBreakKeepAll = function(obj){
			
			var html = $(obj).html();
			
			// to store line break
			html = html.replace(/(\r\n|\n|\r)/gm, ' ＃＆＊＠§ ');
			
			// .html() 로 집어 넣었을 때, 여는 태그만 있으면 브라우저가 자동으로 닫는 태그를 집어 넣기 때문에 <,>를 다 없앤다.
			var textArr = html.split(' ');
			
			// remove empty array
			textArr = textArr.filter(function(e){return e;});
			$(obj).text('');
			var skip = false;
			var full_str = '';
			
			for(var i=0,j=textArr.length; i<j; i++){
				var str = textArr[i];
				
				/*
				 * 태그가 닫히고 끝났으면 일단 이놈은 적용하지 않고 다음 놈부터 skip = false;
				 * 태그가 열리고 끝났으면 skip = true;
				 * 태그가 없는 경우 특별히 skip을 조정하지 않는다. 태그 안의 속성도 글자만 있을 수 있다.
				 * 
				 * nowrap 적용할 경우 : 태그가 없다 and skip == false
				 * nowrap 적용 안 하는 경우 : 태그가 있는 경우 or skip == true
				 * 
				 * skip = true 로 변경하는 경우 : 지금 태그가 열린 경우
				 * skip = false 로 변경하는 경우 : 지금 태그가 닫힌 경우
				 */
				if(skip == false && is_there_no_angle_bracket(str) &&  str.indexOf('＃＆＊＠§') == -1 ){
					full_str += '<span style="white-space: nowrap">'+str+'</span> ';
				}else{
					full_str += str + ' ';
				}
				
				if(is_there_start_angle_bracket(str)){
					skip = true;
				}
				if(is_there_end_angle_bracket(str)){
					skip = false;
				}
			};
			$(obj).html(full_str.replace(/＃＆＊＠§/g, "\n"));
		};
	}
	return this.each(function(){
		addWordBreakKeepAll(this);
	});
};