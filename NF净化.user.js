// ==UserScript==
// @name         NF净化
// @icon         https://www.nfmovies.com/favicon.ico
// @namespace    https://github.com/iCrackit/Tampermonkey
// @version      1.0
// @description  去除奈菲影视内所有广告 自适应DarkMode 添加在IINA中打开
// @author       Edward
// @run-at       document-start
// @match        https://www.nfmovies.com/*
// @grant        GM_registerMenuCommand
// ==/UserScript==

(function() {
    'use strict';

    var tag = document.createElement('style');
    var light = '.hidden-xs{display:none !important;} .hidden-sm{display:block !important;} .myui-ra-container{display:none;} .hy-layout{display:none;} .dplayer-logo{display:none;} #aaaDiv{display:none !important;} #aaaDiv2{display:none !important;} #sponsorAdDiv{display:none !important;} #sponsorAdDiv2{display:none !important;} .tips.close-box{display:none;} ';
    var dark = 'body{background:#1a1a1a !important;color:#ccc !important;} .myui-panel-bg, .myui-panel-bg2{background-color: #1a1a1a !important;} .myui-foot{background:#1a1a1a !important;} a, h1, h2, h3, h4, h5, h6, h1 a, h2 a, h3 a, h4 a, h5 a, h6 a{color: #ccc !important;} .top-line:before, .bottom-line:after, .top-line-dot:before, .bottom-line-dot:before{border-color: #eee0 !important;} .myui-header__top{background-color: #1a1a1a !important;} .myui-topbg{background: #1a1a1a;} ';


    let media = window.matchMedia('(prefers-color-scheme: dark)');
    if (media.matches){
        tag.innerHTML = light + dark;
        document.head.appendChild(tag);
    } else {
        tag.innerHTML = light;
        document.head.appendChild(tag);
    }

    let callback = (e) => {
        let prefersDarkMode = e.matches;
        if (prefersDarkMode) {
            tag.innerHTML = light + dark;
            document.head.appendChild(tag);
        } else {
            tag.innerHTML = light;
            document.head.appendChild(tag);
        }
    };
    if (typeof media.addEventListener === 'function') {
        media.addEventListener('change', callback);
    } else if (typeof media.addListener === 'function') {
        media.addListener(callback);
    }

    //<li><a onclick="iina()" href="javascript:void(0)" title="Open In IINA"><i class="fa fa-play-circle"></i></a></li>
    GM_registerMenuCommand ("Open In IINA", iina, "");
    function iina() {
        var html = document.getElementsByClassName("embed-responsive clearfix")[0].childNodes[1].innerHTML;
        var code = html + "window.open('iina://weblink?url=' + now)";
        eval(code);
    }
})();