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
			
			var html = $(obj).html();
			// .html() 로 집어 넣었을 때, 여는 태그만 있으면 브라우저가 자동으로 닫는 태그를 집어 넣기 때문에 <,>를 다 없앤다.
			html = html.replace(/\</g,'☆§┡【').replace(/\>/g,'】┪§☆');
			var textArr = html.split(' ');
			console.log(textArr);
			//빈 배열 제거
			textArr = textArr.filter(function(e){return e;});
			$(obj).text('');
			var skip = false;
			
			for(var i=0,j=textArr.length; i<j; i++){
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
				if(skip == false && is_no_tag(textArr[i])){
					$('<span/>',{
						'html': textArr[i],
						'style': 'white-space: nowrap;'
					}).appendTo($(obj));
					
					log(textArr[i],'done');
				}else{
					$(obj).append(textArr[i]);
					log(textArr[i],'skip');
				}

				$(obj).html($(obj).html()+' ');
				
				if(is_tag_opend(textArr[i])){
					skip = true;
				}
				if(is_tag_closed(textArr[i])){
					skip = false;
				}
			};
			var finalHTML = $(obj).html();
			console.log(finalHTML);
			$(obj).html(finalHTML.replace(/☆§┡【/g,'<').replace(/】┪§☆/g,'>'));
		};
	}
	return this.each(function(){
		addWordBreakKeepAll(this);
	});
};

function log(str, echo){
	if(str.indexOf('실행') > -1 || str.indexOf('방법') > -1){
		console.log(str, str.lastIndexOf('☆§┡【'), str.lastIndexOf('】┪§☆'));
		console.log(echo);
	}
}


function is_tag_closed(str){
	return str.lastIndexOf('☆§┡【') < str.lastIndexOf('】┪§☆');
}

function is_tag_opend(str){
	return str.lastIndexOf('】┪§☆') < str.lastIndexOf('☆§┡【');
}

function is_no_tag(str){
	//only -1
	return str.lastIndexOf('】┪§☆') == str.lastIndexOf('☆§┡【');
}