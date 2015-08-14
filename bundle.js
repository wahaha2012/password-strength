/*!
 * Password Strength Checker
 * Copyright (C) 2015  wxwdesign@gmail.com
 * Licensed under the GPL License.
 * https://github.com/wahaha2012/password-strength
 */
!function(t,e){e="function"==typeof e?e:function(){},"function"==typeof define?define.amd?define([],e):define.cmd&&define(function(t,n,i){i.exports=e()}):"object"==typeof exports?module.exports=e():"object"==typeof DP&&"function"==typeof DP.define?DP.define([],e):t.PasswordStrength=t.PasswordStrength||e()}(this,function(){function t(t){this.options=e.extend({},i),this.options=e.extend(this.options,t||{}),this._init()}var e={extend:function(t,e){t=t||{},e=e||{};for(var n in e)t[n]=e[n];return t},removeClass:function(t,e){if(t&&e){for(var n,i=t.getAttribute("class"),o=i.match(/\b[\w\-\_]+\b/g),s=[],h=0,r=o.length;r>h;h++)n=o[h],n!==e&&s.push(n);t.setAttribute("class",s.join(" "))}},addClass:function(t,e){if(t&&e){for(var n,i,o=t.getAttribute("class"),s=o.match(/\b[\w\-\_]+\b/g),h=0,r=s.length;r>h;h++)i=s[h],i===e&&(n=!0);n||s.push(e),t.setAttribute("class",s.join(" "))}},removeElement:function(t){t&&t.parentNode.removeChild(t)},css:function(t,e){if(t&&"object"==typeof e){for(var n,i=t.getAttribute("style")||"",o=i.split(";"),s=[],h=0,r=o.length;r>h;h++)n=o[h].split(":"),e[n[0]]&&(n[1]=e[n[0]],delete e[n[0]]),s.push(n.join(":"));for(var a in e)s.push(a+":"+e[a]);t.setAttribute("style",s.join(";"))}},on:function(t,e,n){t&&e&&n&&(t.addEventListener?t.addEventListener(e,n,!1):t.attachEvent?t.attachEvent("on"+e,n):t["on"+e]=n)},off:function(t,e,n){t.removeEventListener?t.removeEventListener(e,n,!1):t.detachEvent?t.detachEvent("on"+e,n):t["on"+e]=null}},n=document.body,i={bgColors:{weaker:"#f22a26",weak:"#ff880a",normal:"#b2a30a",strong:"#99b20a",stronger:"#58a80a"},checkLength:6,strengthTexts:"空差弱中好强",tagText:"密码强度",autoFindInputs:!0,zIndex:1e4};return t.prototype={constructor:t,_init:function(){if(this._createStrengthNotifier(),this._inputsList=[],this.options.autoFindInputs){var t=this._getPwDoms();this._inputsList.push(t),this._bindEvents(t)}},_getPwDoms:function(){var t;if(document.querySelectorAll)t=document.querySelectorAll("input[type=password]");else{var e=document.getElementsByTagName("input");t=[];for(var n=0,i=e.length;i>n;n++)"password"==e[n].getAttribute("type")&&t.push(e[n])}return t},_bindEvents:function(t){var n=this;if(!(t.length<1))for(var i,o=0,s=t.length;s>o;o++)i=t[o],function(t){e.on(t,"keyup",function(){n.updateStrength(t)}),e.on(t,"focus",function(){n.showStrength(t)}),e.on(t,"blur",function(){n.hideStrength()})}(i)},_createStrengthNotifier:function(){this.notifier=document.createElement("div"),this.notifierTag=document.createElement("div"),e.css(this.notifier,{position:"absolute",left:0,top:0,width:0,height:0,"font-size":"14px","text-align":"center",color:"#ffffff","z-index":this.options.zIndex,display:"none"}),e.css(this.notifierTag,{position:"absolute",left:0,top:0,width:12*(this.options.tagText.length+1)+"px",height:0,"font-size":"12px","text-align":"center",color:"#666666",background:"#e0e0e0","z-index":this.options.zIndex+2,opacity:.7,display:"none"}),this.notifierTag.innerHTML=this.options.tagText,n.appendChild(this.notifier),n.appendChild(this.notifierTag)},addInputs:function(t){t&&(t.length||(t=[t]),this._inputsList.push(t),this._bindEvents(t))},updateStrength:function(t){var n=t.value,i=this.checkStrength(n,this.options.checkLength);e.css(this.notifier,{background:this.options.bgColors[i.text],display:n.length?"block":"none"}),this.notifier.innerHTML=this.options.strengthTexts.substr(i.strength,1),e.css(this.notifierTag,{display:n.length?"block":"none"})},showStrength:function(t){var n=t.value,i={width:t.offsetWidth,height:t.offsetHeight},o=t.getBoundingClientRect(),s=this.checkStrength(n);e.css(this.notifier,{left:o.left+i.width-i.height+"px",top:o.top+2+"px",width:i.height-2+"px",height:i.height-4+"px","line-height":i.height-4+"px",background:this.options.bgColors[s.text],display:n.length?"block":"none"}),this.notifier.innerHTML=this.options.strengthTexts.substr(s.strength,1),e.css(this.notifierTag,{left:o.left+i.width-i.height-12*(this.options.tagText.length+1)+"px",top:o.top+2+"px",height:i.height-4+"px","line-height":i.height-4+"px",display:n.length?"block":"none"})},hideStrength:function(){e.css(this.notifier,{display:"none"}),e.css(this.notifierTag,{display:"none"})},valid:function(t){var e=!0,n=t||this._inputsList,i=this;if(n.length)for(var o=0,s=n.length;s>o;o++){if(!e)return;e=i._traverseInputs(n[o])}else e=this._traverseInputs(n);return e},_traverseInputs:function(t){var e=this,n=!0;if(!t)return n;if(t.length)for(var i=0,o=t.length;o>i;i++){var s=t[i],h=s.value,r=e.checkStrength(h,e.options.checkLength);r.strength<3&&(e.showStrength(s),n=!1)}else{if(!n)return;var s=t,h=s.value,r=e.checkStrength(h,e.options.checkLength);r.strength<3&&(e.showStrength(s),n=!1)}return n},checkStrength:function(t,e){t="number"!=typeof t&&"string"!=typeof t?"":String(t),e=e||6;var n=Math.ceil(t.length/e),i=/\d+/,o=/[a-z]+/,s=/[A-Z]+/,h=/\W+/,r="weaker,weak,normal,strong,stronger";return t.length>=e&&(i.test(t)&&(n+=1),o.test(t)&&(n+=1),s.test(t)&&(n+=1),h.test(t)&&(n+=1)),n>5&&(n=5),{strength:n,text:r.split(",")[n-1]}}},t});