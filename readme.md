jQuery `word-break: keep-all` plugin
====================================

Not in latin letter, break line by a word, not a letter. This is like CSS `word-break: keep-all` property that only be in IE.

<span style="font-size: 2em">[▶Demo](http://dl.dropboxusercontent.com/u/15546257/code/jquery-word-break-keep-all-plugin/example.html)</span>

Sometimes, linebreak is like below.

    이명박과 마힌드라가 22명을 죽
    였다.

What we want is below. Not above. ('죽였다' is a word.)

    이명박과 마힌드라가 22명을
    죽였다.

This plugin is for it. IE has CSS property `word-break: keep-all;` but other browser has not. So I made jQuery plugin.

Usage
-----

    <script type="text/javascript" src="http://code.jquery.com/jquery-1.8.3.min.js"></script>
    <script type="text/javascript" src="jquery.word-break-keep-all.min.js"></script>
    <script type="text/javascript">
    $(document).ready(function(){
      // run
      $('.test').wordBreakKeepAll();

      // if IE, off this plugin.
      // IE에서는 플러그인을 사용하지 않고 CSS로 처리하고 싶은 경우 이렇게 옵션을 주면 된다.
      //$('.test').wordBreakKeepAll({OffForIE: true});

      // On IE, if you want to apply js type, not CSS, set option like below.
      // IE에서 플러그인을 사용하되 CSS를 적용하는 게 아니라 비 IE 브라우저처럼 적용하고 싶을 때 이렇게 옵션을 준다.
      //$('.test').wordBreakKeepAll({useCSSonIE: false});
    });
    </script>

영어가 아닌 문자에서, 글자별로 줄바꿈하는 것이 아니라 단어별로 줄바꿈을 하도록 한다. CSS의 `word-break: keep-all`처럼 작동을 한다. 이 프로퍼티는 IE에만 있다.

<span style="font-size: 2em">[▶데모 보기](http://dl.dropboxusercontent.com/u/15546257/code/jquery-word-break-keep-all-plugin/example.html)</span> | 
<span style="font-size: 2em">[▶개발 동기 보기](http://mytory.net/archives/2801)</span>

포스트 제목 등에서 줄바꿈이 아래처럼 되는 경우가 있다.

    이명박과 마힌드라가 22명을 죽
    였다.

이렇게 되는 것이 더 좋을 것이다.

    이명박과 마힌드라가 22명을
    죽였다.

이걸 해 주는 jQuery 플러그인이다. IE에서는 word-break: keep-all; 속성으로 처리 가능하지만, IE가 아닌 브라우저에서는 이 속성이 작동하지 않는다. 그래서 jQuery 플러그인을 만들었다.

