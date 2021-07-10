// ==UserScript==
// @name         Baidu净化
// @icon         http://baidu.com/favicon.ico
// @namespace    https://github.com/iCrackit/Tampermonkey
// @version      1.0
// @description  去除百度搜索结果中的所有广告 自适应DarkMode
// @author       Edward
// @run-at       document-start
// @include      *://www.baidu.com/s?*
// @require      https://cdn.bootcss.com/jquery/3.5.1/jquery.min.js
// ==/UserScript==

(function() {
    /* global $ */
    'use strict';
    var tag = document.createElement('style');
    var light = '#content_right{display:none !important;} .c-container{width:980px !important;} .wrapper_new .s_ipt_wr{border: 2px solid #4e71f2 !important;}';
    var dark = 'body{background-color:#1a1a1a !important;} #content_right{display:none !important;} .c-container{width:980px !important;background-color: #1a1a1a !important;} .head_wrapper{background:#1a1a1a !important;} #kw{color:#fff !important;} .wrapper_new .s_ipt_wr{background:#1a1a1a !important;border: 2px solid #4e71f2 !important;} p{color:#888;} .pc-tabs-content_2Ga6e,a{color: #ccc !important;background: #1a1a1a !important;text-decoration:none !important;} a:hover{color:#315efb !important;} .wrapper_new #s_tab .cur-tab{color:#ccc !important;} #page{background-color: #1a1a1a !important;} .wrapper_new #foot{background-color: #1a1a1a;} #help{background: #1a1a1a !important;} #rs{background: #1a1a1a;} em{color:#ccc !important;text-decoration: none !important;} .new-pmd .c-abstract{color:#888;} .new-pmd .c-color-text{color:#868686} .op-video-vast-ul li.op-video-vast-smallicon-li a span i{color:#616161 !important;} .op-video-vast-border{border-top: 1px solid #00000000 !important;} .op-video-vast-ul li.op-video-vast-smallicon-li{border-bottom: 1px solid #00000000 !important;} .c-border{border: 1px solid #fff0 !important;} #wrapper.wrapper_new .bdpfmenu, #wrapper.wrapper_new .usermenu{background: #1a1a1a !important;} .new-pmd .recommend-none-border{border-color: #1a1a1a !important;} .c-tabs-nav{border-bottom: 1px solid #1a1a1a !important;background-color: #1a1a1a !important;} .c-tabs-nav .c-tabs-nav-selected{border-color: #fff0 #fff0 #fff0 #fff0 !important;background-color: #1a1a1a !important;color: #ccc !important;} textarea,span{color:#ccc;} ';
    let media = window.matchMedia('(prefers-color-scheme: dark)');

    if (media.matches){
        tag.innerHTML = dark;
        document.head.appendChild(tag);
    } else {
        tag.innerHTML = light;
        document.head.appendChild(tag);
    }

    let callback = (e) => {
        let prefersDarkMode = e.matches;
        if (prefersDarkMode) {
            tag.innerHTML = dark;
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

    document.addEventListener ("DOMContentLoaded", killads);
    function killads () {
        unsafeWindow.$(document).ajaxSuccess(function(e, xhr, opt) { // Microsoft Edge 和 Safari 不支持 $(document).ajaxSuccess()
            document.head.appendChild(tag);
            $('#content_left>div').has('span:contains("广告")').remove();
            setTimeout(function () { $('.c-container').has('.f13>a:contains("广告")').remove(); }, 2100); // 去除顽固性的延迟加载广告，一般延迟2秒左右。例如搜索“淘宝”，当页面加载完毕之后在搜索结果最前或最后会再插入一个广告。
            try{
                $(".product-item.c-span6.first-line-product").attr("class", "product-item c-span6"); // 全网热卖商品展示区布局错误，例如搜索：iPhone
                if(document.getElementsByClassName("op-img-portrait-con").length){
                    $(".c-span6.c-span-last.op-img-portrait-item-con").removeClass("c-span-last"); // 百度图片的重新排列，例如搜索：头像
                    var arr = $(".op-img-portrait-con .c-row.c-gap-top"); var html = [];
                    for(var i=0;i<arr.length;i++){
                        html[i] = arr[i].innerHTML; if(i > 0){ arr[i].remove(); }
                    }
                    arr[0].innerHTML = html.join(" ");
                }
            }catch(e){}
        });
    }
})();
