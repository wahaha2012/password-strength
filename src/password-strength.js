function(){
    //{{{utils}}}
    
    var BODY = document.body,
        defaultOptions = {
            background: {
                'weaker': '#f22a26',
                'weak': '#ff880a',
                'normal': '#b2a30a',
                'strong': '#99b20a',
                'stronger': '#58a80a'
            },
            checkLength: 6,
            strengthTexts:['空','差','弱','中','好','强'],
            tagText: '密码强度',
            autoFindInputs: true,
            zIndex: 10000
        };

    function Password(options){
        this.options = $.extend({}, defaultOptions);
        this.options = $.extend(this.options, options||{});

        this._init();
    }

    Password.prototype = {
        constructor: Password,

        _init: function(){
            this._createStrengthNotifier();
            this._inputsList = [];

            if(this.options.autoFindInputs){
                var inputs = this._getPwDoms();
                this._inputsList.push(inputs);
                this._bindEvents(inputs);
            }
        },

        _getPwDoms: function(){
            var inputs;
            if(document.querySelectorAll){
                inputs = document.querySelectorAll('input[type=password]');
            }else{
                var temp = document.getElementsByTagName("input");
                inputs = [];
                for(var i=0, L=temp.length; i<L; i++){
                    if(temp[i].getAttribute("type")=='password'){
                        inputs.push(temp[i]);
                    }
                }
            }

            return inputs
        },

        _bindEvents: function(inputs){
            var self = this;

            if(inputs.length < 1){
                return;
            }

            for(var i=0,el,L=inputs.length; i<L; i++){
                el = inputs[i];

                (function(el){
                    $.on(el, 'keyup', function(){
                        self.updateStrength(el);
                    })
                    $.on(el, 'focus', function(){
                        self.showStrength(el);
                    })
                    $.on(el, 'blur', function(){
                        self.hideStrength();
                    });
                })(el);
            }
        },

        _getStrLength: function(str){
            return (utils.getCharLength(str) + 3)*6;
        },

        _createStrengthNotifier: function(){
            this.notifier = document.createElement('div');
            this.notifierTag = document.createElement('div');

            $.css(this.notifier,{
                position: 'absolute',
                left: 0,
                top: 0,
                width: 0,
                height: 0,
                'font-size': '14px',
                'text-align': 'center',
                color: '#ffffff',
                'z-index': this.options.zIndex,
                display: 'none'
            });

            $.css(this.notifierTag,{
                position: 'absolute',
                left: 0,
                top: 0,
                // width: (this.options.tagText.length+1)*12 + 'px',
                width: this._getStrLength(this.options.tagText) + 'px',
                height: 0,
                'font-size': '12px',
                'text-align': 'center',
                color: '#666666',
                background:'#e0e0e0',
                'z-index': this.options.zIndex + 2,
                opacity: 0.7,
                display: 'none'
            });
            this.notifierTag.innerHTML = this.options.tagText;

            BODY.appendChild(this.notifier);
            BODY.appendChild(this.notifierTag);
        },

        addInputs: function(inputs){
            if(!inputs){return}

            if(!inputs.length){inputs = [inputs];}

            this._inputsList.push(inputs);
            this._bindEvents(inputs);
        },

        updateStrength: function(el){
            var val = el.value,
                size = {width: el.offsetWidth, height: el.offsetHeight},
                pos = el.getBoundingClientRect(),
                strength = this.checkStrength(val, this.options.checkLength),
                notifierWidth = this._getStrLength(this.options.strengthTexts[strength.strength]);

            $.css(this.notifier, {
                background: this.options.background[strength.text],
                display: val.length?'block':'none',
                width: notifierWidth-2 + 'px',
                left: pos.left + size.width - notifierWidth + 'px',
            });

            this.notifier.innerHTML = this.options.strengthTexts[strength.strength];

            $.css(this.notifierTag, {
                display: val.length?'block':'none',
                left: pos.left + size.width - notifierWidth - this._getStrLength(this.options.tagText)+ 'px',
            });
        },

        showStrength: function(el){
            var val = el.value,
                size = {width: el.offsetWidth, height: el.offsetHeight},
                pos = el.getBoundingClientRect(),
                strength = this.checkStrength(val),
                notifierWidth = this._getStrLength(this.options.strengthTexts[strength.strength]);

            $.css(this.notifier, {
                left: pos.left + size.width - notifierWidth + 'px',
                top: pos.top + 2 + 'px',
                width: notifierWidth-2 + 'px',
                height: size.height-4 + 'px',
                'line-height': size.height-4 +'px',
                background: this.options.background[strength.text],
                display: val.length?'block':'none'
            });
            this.notifier.innerHTML = this.options.strengthTexts[strength.strength];

            $.css(this.notifierTag, {
                left: pos.left + size.width - notifierWidth - this._getStrLength(this.options.tagText)+ 'px',
                top: pos.top + 2 + 'px',
                height: size.height-4 + 'px',
                'line-height': size.height-4 + 'px',
                display: val.length?'block':'none'
            });
        },

        hideStrength: function(){
            $.css(this.notifier, {
                display:'none'
            });

            $.css(this.notifierTag, {
                display:'none'
            });
        },

        verify: function(inputs){
            var result = true,
                list = inputs || this._inputsList,
                self = this;

            if(list.length){
                for(var i=0,L=list.length; i<L; i++){
                    if(!result){
                        break;
                    }
                    result = self._traverseInputs(list[i]);
                }
            }else{
                result = this._traverseInputs(list);
            }

            return result
        },

        _traverseInputs: function(inputs){
            var self = this,
                result = true;
            if(!inputs){
                return result;
            }else if(!inputs.length){
                if(!result){
                    return
                }
                var el = inputs,
                    val = el.value,
                    strength = self.checkStrength(val, self.options.checkLength);

                if(strength.strength < 3){
                    self.showStrength(el);
                    result = false;
                }
            }else{
                for(var i=0,L=inputs.length; i<L; i++){
                    if(!result){
                        break;
                    }
                    var el = inputs[i],
                        val = el.value,
                        strength = self.checkStrength(val, self.options.checkLength);

                    if(strength.strength < 3){
                        self.showStrength(el);
                        result = false;
                    }
                } 
            }

            return result
        },
        
        checkStrength: function(password, minLength){
            if(typeof password !== "number" && typeof password !== "string"){
                password = '';
            }else{
                password = String(password);
            }
            minLength = minLength || 6;

            /**
             * strength
             * 1: too short
             * 2: pure string
             * 3: normal
             * 4: strong
             * 5: stronger
             */
            var strength = 1,
                numberPattern = /\d+/,
                stringLowPattern = /[a-z]+/,
                stringUpPattern = /[A-Z]+/,
                otherStrPattern = /\W+/,
                strengthText = 'weaker,weak,normal,strong,stronger';

            if(password.length >= minLength){
                if(numberPattern.test(password)){
                    strength += 1;
                }

                if(stringLowPattern.test(password)){
                    strength += 1;
                }

                if(stringUpPattern.test(password)){
                    strength += 1;
                }

                if(otherStrPattern.test(password)){
                    strength += 1;
                }

                if(password.length > minLength*2){
                    strength += Math.floor(password.length/minLength) - 2
                }

                if(strength>5){
                    strength = 5;
                }
            }

            return {
                strength: strength,
                text: strengthText.split(',')[strength-1]
            };
        }
    }

    return Password;
}