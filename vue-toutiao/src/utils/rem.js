(function(win, doc){
    var docEl = doc.documentElement,
        resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
        refresh = function () { 
            var w = docEl.clientWidth,
                dpr = win.devicePixelRatio || 1;

            docEl.style.fontSize = 100 * (w/375) + 'px';

            function setBodyFontSize () {
                if (doc.body) {
                    doc.body.style.fontSize = '16px';
                }else {
                    doc.addEventListener('DOMContentLoaded', refresh)
                }
            }
            setBodyFontSize();  
        };
    refresh();

    if (!doc.addEventListener) return;
    win.addEventListener(resizeEvt, refresh, false);
})(window, document);