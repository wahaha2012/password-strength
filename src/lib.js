var $ = {
        extend: function(to, from){
            to = to || {};
            from = from || {};

            for(var key in from){
                to[key] = from[key];
            }

            return to;
        },

        removeClass: function(element, className){
            if(!element || !className){
                return;
            }

            var classNameStr = element.getAttribute('class'),
                classNames = classNameStr.match(/\b[\w\-\_]+\b/g),
                classResult = [];

            for(var i=0,item,L=classNames.length; i<L; i++){
                item = classNames[i];

                if(item!==className){
                    classResult.push(item);
                }
            }

            element.setAttribute('class', classResult.join(" "));
        },

        addClass: function(element, className){
            if(!element || !className){
                return;
            }

            var classNameStr = element.getAttribute('class'),
                classNames = classNameStr.match(/\b[\w\-\_]+\b/g),
                isExist;

            for(var i=0,item,L=classNames.length; i<L; i++){
                item = classNames[i];

                if(item===className){
                    isExist = true;
                }
            }

            if(!isExist){
                classNames.push(className);
            }

            element.setAttribute('class', classNames.join(" "));
        },

        removeElement: function(element){
            if(!element){
                return;
            }

            element.parentNode.removeChild(element);
        },

        css: function(element, cssData){
            if(!element || typeof cssData!=='object'){
                return;
            }

            // var styles = element.getAttribute('style') || '',
            var styles = element.style.cssText || '',
                styleArray = styles.split(';'),
                styleResult = [];

            for(var i=0,itemArr,L=styleArray.length; i<L; i++){
                itemArr = styleArray[i].split(":");

                if(cssData[itemArr[0]]){
                    itemArr[1] = cssData[itemArr[0]];
                    delete cssData[itemArr[0]];
                }

                styleResult.push(itemArr.join(":"));
            }

            for(var key in cssData){
                styleResult.push(key+':'+cssData[key]);
            }

            // element.setAttribute('style', styleResult.join(";"));
            element.style.cssText = styleResult.join(";");
        },

        on: function(element, eventName, handler){
            if(!element || !eventName || !handler){
                return;
            }

            if(element.addEventListener){
                element.addEventListener(eventName, handler, false);
            }else if (element.attachEvent) {
                element.attachEvent("on" + eventName, handler);
            }else {
                element['on' + eventName] = handler;
            }
        },

        off: function(element, eventName, handler){
            if(element.removeEventListener){
                element.removeEventListener(eventName, handler, false);
            }else if(element.detachEvent) {
                element.detachEvent('on'+eventName, handler);
            }else{
                element['on' + eventName] = null;
            }
        }
    };