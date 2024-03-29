/**
 * Created by Veket on 2017/8/17.
 */
(function () {

    /**异步加载vue组件**/
    window.loadVueComponents = function (urls,cb) {

        var afterDone = function(times, func) {
            return function() {
                if (--times < 1) {
                    return func.apply(this, arguments);
                }
            };
        };

        var isArray = function(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        };

        if(!isArray(urls)||urls.length==0) return;

        var clearExistFlag =function (url,fg) {//移除存在的标签
            var getName=function (it) {
                if(it) {
                    return it.substring(it.lastIndexOf('/')+1,it.lastIndexOf('.'))
                } else return '';
            };
            var list=document.getElementsByTagName(fg);
            var cName = getName(url);
            for(var k=0;k<list.length;k++){
                if((fg=='link'&&getName(list[k].href)===cName)||(fg=='script'&&getName(list[k].src)===cName)) {
                    document.head.removeChild(list[k]) ;
                }
            }
        };

        var head = document.getElementsByTagName('head');
        if(head&&head.length){
            head = head[0];
        }else{
            head = document.body;
        }

        var exec = afterDone(urls.length, function () {
            if (cb && typeof(cb) == "function")cb();
        });

        var loadScripts = afterDone(urls.length, function () {
            for(var j=0;j<urls.length;j++){
                clearExistFlag(urls[j],'script');
                var script = document.createElement('script');
                script.type = "text/javascript";
                script.src = urls[j];
                head.appendChild(script);
                script.onload = script.onreadystatechange = function(){
                    if ((!this.readyState) || this.readyState == "complete" || this.readyState == "loaded" ){ exec(); }
                };
            }
        });


        for(var i=0;i<urls.length;i++){
            clearExistFlag(urls[i],'link');
            var styleLink = document.createElement('link');
            styleLink.rel = "stylesheet";
            styleLink.href = urls[i].substring(0,urls[i].lastIndexOf('.'))+'.css';
            document.head.appendChild(styleLink);
            styleLink.onload = styleLink.onreadystatechange = function(){
                if ((!this.readyState) || this.readyState == "complete" || this.readyState == "loaded" ){ loadScripts(); }
            };
        }
    };

})();