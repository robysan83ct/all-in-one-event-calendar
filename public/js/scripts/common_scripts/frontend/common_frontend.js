/**
 * @license RequireJS domReady 2.0.0 Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/requirejs/domReady for details
 */

/**
 * jQuery Masonry v2.1.05
 * A dynamic layout plugin for jQuery
 * The flip-side of CSS Floats
 * http://masonry.desandro.com
 *
 * Licensed under the MIT license.
 * Copyright 2012 David DeSandro
 */

/*
   * smartresize: debounced resize event for jQuery
   *
   * latest version and complete README available on Github:
   * https://github.com/louisremi/jquery.smartresize.js
   *
   * Copyright 2011 @louis_remi
   * Licensed under the MIT license.
   */

/*!
   * jQuery imagesLoaded plugin v1.1.0
   * http://github.com/desandro/imagesloaded
   *
   * MIT License. by Paul Irish et al.
   */

/* ===========================================================
   * bootstrap-tooltip.js v2.0.4
   * http://twitter.github.com/bootstrap/javascript.html#tooltips
   * Inspired by the original jQuery.tipsy by Jason Frame
   * ===========================================================
   * Copyright 2012 Twitter, Inc.
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   * http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   * ========================================================== */

/* ===========================================================
	 * bootstrap-popover.js v2.0.4
	 * http://twitter.github.com/bootstrap/javascript.html#popovers
	 * ===========================================================
	 * Copyright 2012 Twitter, Inc.
	 *
	 * Licensed under the Apache License, Version 2.0 (the "License");
	 * you may not use this file except in compliance with the License.
	 * You may obtain a copy of the License at
	 *
	 * http://www.apache.org/licenses/LICENSE-2.0
	 *
	 * Unless required by applicable law or agreed to in writing, software
	 * distributed under the License is distributed on an "AS IS" BASIS,
	 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	 * See the License for the specific language governing permissions and
	 * limitations under the License.
	 * =========================================================== */

/* ============================================================
			 * bootstrap-dropdown.js v2.0.3
			 * http://twitter.github.com/bootstrap/javascript.html#dropdowns
			 * ============================================================
			 * Copyright 2012 Twitter, Inc.
			 *
			 * Licensed under the Apache License, Version 2.0 (the "License");
			 * you may not use this file except in compliance with the License.
			 * You may obtain a copy of the License at
			 *
			 * http://www.apache.org/licenses/LICENSE-2.0
			 *
			 * Unless required by applicable law or agreed to in writing, software
			 * distributed under the License is distributed on an "AS IS" BASIS,
			 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
			 * See the License for the specific language governing permissions and
			 * limitations under the License.
			 * ============================================================ */

timely.define("domReady",[],function(){function u(e){var t;for(t=0;t<e.length;t++)e[t](n)}function a(){var e=r;t&&e.length&&(r=[],u(e))}function f(){t||(t=!0,o&&clearInterval(o),a())}function c(e){return t?e(n):r.push(e),c}var e=typeof window!="undefined"&&window.document,t=!e,n=e?document:null,r=[],i,s,o;if(e){if(document.addEventListener)document.addEventListener("DOMContentLoaded",f,!1),window.addEventListener("load",f,!1);else if(window.attachEvent){window.attachEvent("onload",f),s=document.createElement("div");try{i=window.frameElement===null}catch(l){}s.doScroll&&i&&window.external&&(o=setInterval(function(){try{s.doScroll(),f()}catch(e){}},30))}(document.readyState==="complete"||document.readyState==="interactive")&&f()}return c.version="2.0.0",c.load=function(e,t,n,r){r.isBuild?n(null):c(n)},c}),timely.define("external_libs/jquery.masonry",["jquery_timely"],function(e){(function(e,t,n){var r=t.event,i;r.special.smartresize={setup:function(){t(this).bind("resize",r.special.smartresize.handler)},teardown:function(){t(this).unbind("resize",r.special.smartresize.handler)},handler:function(e,n){var r=this,s=arguments;e.type="smartresize",i&&clearTimeout(i),i=setTimeout(function(){t.event.handle.apply(r,s)},n==="execAsap"?0:100)}},t.fn.smartresize=function(e){return e?this.bind("smartresize",e):this.trigger("smartresize",["execAsap"])},t.Mason=function(e,n){this.element=t(n),this._create(e),this._init()},t.Mason.settings={isResizable:!0,isAnimated:!1,animationOptions:{queue:!1,duration:500},gutterWidth:0,isRTL:!1,isFitWidth:!1,containerStyle:{position:"relative"}},t.Mason.prototype={_filterFindBricks:function(e){var t=this.options.itemSelector;return t?e.filter(t).add(e.find(t)):e},_getBricks:function(e){var t=this._filterFindBricks(e).css({position:"absolute"}).addClass("masonry-brick");return t},_create:function(n){this.options=t.extend(!0,{},t.Mason.settings,n),this.styleQueue=[];var r=this.element[0].style;this.originalStyle={height:r.height||""};var i=this.options.containerStyle;for(var s in i)this.originalStyle[s]=r[s]||"";this.element.css(i),this.horizontalDirection=this.options.isRTL?"right":"left",this.offset={x:parseInt(this.element.css("padding-"+this.horizontalDirection),10),y:parseInt(this.element.css("padding-top"),10)},this.isFluid=this.options.columnWidth&&typeof this.options.columnWidth=="function";var o=this;setTimeout(function(){o.element.addClass("masonry")},0),this.options.isResizable&&t(e).bind("smartresize.masonry",function(){o.resize()}),this.reloadItems()},_init:function(e){this._getColumns(),this._reLayout(e)},option:function(e,n){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))},layout:function(e,t){for(var n=0,r=e.length;n<r;n++)this._placeBrick(e[n]);var i={};i.height=Math.max.apply(Math,this.colYs);if(this.options.isFitWidth){var s=0;n=this.cols;while(--n){if(this.colYs[n]!==0)break;s++}i.width=(this.cols-s)*this.columnWidth-this.options.gutterWidth}this.styleQueue.push({$el:this.element,style:i});var o=this.isLaidOut?this.options.isAnimated?"animate":"css":"css",u=this.options.animationOptions,a;for(n=0,r=this.styleQueue.length;n<r;n++)a=this.styleQueue[n],a.$el[o](a.style,u);this.styleQueue=[],t&&t.call(e),this.isLaidOut=!0},_getColumns:function(){var e=this.options.isFitWidth?this.element.parent():this.element,t=e.width();this.columnWidth=this.isFluid?this.options.columnWidth(t):this.options.columnWidth||this.$bricks.outerWidth(!0)||t,this.columnWidth+=this.options.gutterWidth,this.cols=Math.floor((t+this.options.gutterWidth)/this.columnWidth),this.cols=Math.max(this.cols,1)},_placeBrick:function(e){var n=t(e),r,i,s,o,u;r=Math.ceil(n.outerWidth(!0)/this.columnWidth),r=Math.min(r,this.cols);if(r===1)s=this.colYs;else{i=this.cols+1-r,s=[];for(u=0;u<i;u++)o=this.colYs.slice(u,u+r),s[u]=Math.max.apply(Math,o)}var a=Math.min.apply(Math,s),f=0;for(var l=0,c=s.length;l<c;l++)if(s[l]===a){f=l;break}var h={top:a+this.offset.y};h[this.horizontalDirection]=this.columnWidth*f+this.offset.x,this.styleQueue.push({$el:n,style:h});var p=a+n.outerHeight(!0),d=this.cols+1-c;for(l=0;l<d;l++)this.colYs[f+l]=p},resize:function(){var e=this.cols;this._getColumns(),(this.isFluid||this.cols!==e)&&this._reLayout()},_reLayout:function(e){var t=this.cols;this.colYs=[];while(t--)this.colYs.push(0);this.layout(this.$bricks,e)},reloadItems:function(){this.$bricks=this._getBricks(this.element.children())},reload:function(e){this.reloadItems(),this._init(e)},appended:function(e,t,n){if(t){this._filterFindBricks(e).css({top:this.element.height()});var r=this;setTimeout(function(){r._appended(e,n)},1)}else this._appended(e,n)},_appended:function(e,t){var n=this._getBricks(e);this.$bricks=this.$bricks.add(n),this.layout(n,t)},remove:function(e){this.$bricks=this.$bricks.not(e),e.remove()},destroy:function(){this.$bricks.removeClass("masonry-brick").each(function(){this.style.position="",this.style.top="",this.style.left=""});var n=this.element[0].style;for(var r in this.originalStyle)n[r]=this.originalStyle[r];this.element.unbind(".masonry").removeClass("masonry").removeData("masonry"),t(e).unbind(".masonry")}},t.fn.imagesLoaded=function(e){function u(){e.call(n,r)}function a(e){var n=e.target;n.src!==s&&t.inArray(n,o)===-1&&(o.push(n),--i<=0&&(setTimeout(u),r.unbind(".imagesLoaded",a)))}var n=this,r=n.find("img").add(n.filter("img")),i=r.length,s="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==",o=[];return i||u(),r.bind("load.imagesLoaded error.imagesLoaded",a).each(function(){var e=this.src;this.src=s,this.src=e}),n};var s=function(t){e.console&&e.console.error(t)};t.fn.masonry=function(e){if(typeof e=="string"){var n=Array.prototype.slice.call(arguments,1);this.each(function(){var r=t.data(this,"masonry");if(!r){s("cannot call methods on masonry prior to initialization; attempted to call method '"+e+"'");return}if(!t.isFunction(r[e])||e.charAt(0)==="_"){s("no such method '"+e+"' for masonry instance");return}r[e].apply(r,n)})}else this.each(function(){var n=t.data(this,"masonry");n?(n.option(e||{}),n._init()):t.data(this,"masonry",new t.Mason(e,this))});return this}})(window,e)}),timely.define("scripts/calendar/posterboard_view",["jquery_timely","external_libs/jquery.masonry"],function(e,t){var n=function(){var t=e(".ai1ec-posterboard-view"),n=e("> .ai1ec-event",t),r,i,s;if(t.length===0)return;r=t.parent().width(),i=t.data("ai1ecTileMinWidth"),s=Math.floor(r/i),s=Math.min(s,n.length),i=Math.floor(r/s),t.css("width","auto"),n.width(i),t.imagesLoaded(function(){var n=e("#ai1ec-calendar-view-loading");t.masonry({itemSelector:".ai1ec-event",isFitWidth:!0,isResizable:!1,isAnimated:!0,columnWidth:i,animationOptions:{easing:"swing"}})}),t.imagesLoaded(function(){t.masonry("reload")})},r=function(){e(".ai1ec-posterboard-view").masonry("reload")};return{resize_masonry:n,reload_masonry:r}}),timely.define("scripts/common_scripts/frontend/common_event_handlers",["jquery_timely","scripts/calendar/posterboard_view"],function(e,t){var n=function(t){var n=e(this),r=n.next(".ai1ec-popup"),i,s,o;if(r.length===0)return;i=r.html(),s=r.attr("class");var u=n.closest("#ai1ec-calendar-view");u.length===0&&(u=e("body")),n.offset().left-u.offset().left>182?o="left":o="right",n.constrained_popover({content:i,title:"",placement:o,trigger:"manual",html:!0,template:'<div class="timely popover '+s+'"><div class="arrow"></div><div class="popover-inner">'+'<div class="popover-content"><div></div></div></div></div></div>',container:n.closest(".ai1ec-popover-boundary")}).constrained_popover("show")},r=function(t){var n=e(t.toElement||t.relatedTarget);n.closest(".ai1ec-popup").length===0&&e(this).constrained_popover("hide")},i=function(t){var n=e(t.toElement||t.relatedTarget);n.closest(".tooltip").length===0&&(e(this).remove(),e("body > .tooltip").remove())},s=function(t){var n=e(this),r={template:'<div class="timely tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"manual"};if(n.is(".ai1ec-category .ai1ec-color-swatch"))return;n.tooltip(r),n.tooltip("show")},o=function(t){var n=e(t.toElement||t.relatedTarget);n.closest(".tooltip").length===0&&e(this).tooltip("hide")},u=function(t){var n=e(t.toElement||t.relatedTarget);n.closest(".ai1ec-tooltip-trigger").length===0&&e(this).remove(),n.closest(".ai1ec-popup").length===0&&e("body > .ai1ec-popup").remove()},a=function(n){t.resize_masonry(),e("html").is("#ie8")};return{handle_popover_over:n,handle_popover_out:r,handle_popover_self_out:i,handle_tooltip_over:s,handle_tooltip_out:o,handle_tooltip_self_out:u,handle_fonts_loaded:a}}),timely.define("external_libs/modernizr",[],function(){var e=function(e,t,n){function S(e){f.cssText=e}function x(e,t){return S(h.join(e+";")+(t||""))}function T(e,t){return typeof e===t}function N(e,t){return!!~(""+e).indexOf(t)}function C(e,t,r){for(var i in e){var s=t[e[i]];if(s!==n)return r===!1?e[i]:T(s,"function")?s.bind(r||t):s}return!1}var r="2.5.3",i={},s=!0,o=t.documentElement,u="modernizr",a=t.createElement(u),f=a.style,l,c={}.toString,h=" -webkit- -moz- -o- -ms- ".split(" "),p={},d={},v={},m=[],g=m.slice,y,b=function(e,n,r,i){var s,a,f,l=t.createElement("div"),c=t.body,h=c?c:t.createElement("body");if(parseInt(r,10))while(r--)f=t.createElement("div"),f.id=i?i[r]:u+(r+1),l.appendChild(f);return s=["&#173;","<style>",e,"</style>"].join(""),l.id=u,(c?l:h).innerHTML+=s,h.appendChild(l),c||(h.style.background="",o.appendChild(h)),a=n(l,e),c?l.parentNode.removeChild(l):h.parentNode.removeChild(h),!!a},w={}.hasOwnProperty,E;!T(w,"undefined")&&!T(w.call,"undefined")?E=function(e,t){return w.call(e,t)}:E=function(e,t){return t in e&&T(e.constructor.prototype[t],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(t){var n=this;if(typeof n!="function")throw new TypeError;var r=g.call(arguments,1),i=function(){if(this instanceof i){var e=function(){};e.prototype=n.prototype;var s=new e,o=n.apply(s,r.concat(g.call(arguments)));return Object(o)===o?o:s}return n.apply(t,r.concat(g.call(arguments)))};return i});var k=function(n,r){var s=n.join(""),o=r.length;b(s,function(n,r){var s=t.styleSheets[t.styleSheets.length-1],u=s?s.cssRules&&s.cssRules[0]?s.cssRules[0].cssText:s.cssText||"":"",a=n.childNodes,f={};while(o--)f[a[o].id]=a[o];i.touch="ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch||(f.touch&&f.touch.offsetTop)===9},o,r)}([,["@media (",h.join("touch-enabled),("),u,")","{#touch{top:9px;position:absolute}}"].join("")],[,"touch"]);p.touch=function(){return i.touch};for(var L in p)E(p,L)&&(y=L.toLowerCase(),i[y]=p[L](),m.push((i[y]?"":"no-")+y));return S(""),a=l=null,i._version=r,i._prefixes=h,i.testStyles=b,o.className=o.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(s?" js "+m.join(" "):""),i}(window,window.document);return e}),timely.define("external_libs/bootstrap_tooltip",["jquery_timely"],function(e){if(!e.fn.tooltip){var t=function(e,t){this.init("tooltip",e,t)};t.prototype={constructor:t,init:function(t,n,r){var i,s;this.type=t,this.$element=e(n),this.options=this.getOptions(r),this.enabled=!0,this.options.trigger!="manual"&&(i=this.options.trigger=="hover"?"mouseenter":"focus",s=this.options.trigger=="hover"?"mouseleave":"blur",this.$element.on(i,this.options.selector,e.proxy(this.enter,this)),this.$element.on(s,this.options.selector,e.proxy(this.leave,this))),this.options.selector?this._options=e.extend({},this.options,{trigger:"manual",selector:""}):this.fixTitle()},getOptions:function(t){return t=e.extend({},e.fn[this.type].defaults,t,this.$element.data()),t.delay&&typeof t.delay=="number"&&(t.delay={show:t.delay,hide:t.delay}),t},enter:function(t){var n=e(t.currentTarget)[this.type](this._options).data(this.type);if(!n.options.delay||!n.options.delay.show)return n.show();clearTimeout(this.timeout),n.hoverState="in",this.timeout=setTimeout(function(){n.hoverState=="in"&&n.show()},n.options.delay.show)},leave:function(t){var n=e(t.currentTarget)[this.type](this._options).data(this.type);this.timeout&&clearTimeout(this.timeout);if(!n.options.delay||!n.options.delay.hide)return n.hide();n.hoverState="out",this.timeout=setTimeout(function(){n.hoverState=="out"&&n.hide()},n.options.delay.hide)},show:function(){var e,t,n,r,i,s,o;if(this.hasContent()&&this.enabled){e=this.tip(),this.setContent(),this.options.animation&&e.addClass("fade"),s=typeof this.options.placement=="function"?this.options.placement.call(this,e[0],this.$element[0]):this.options.placement,t=/in/.test(s),e.remove().css({top:0,left:0,display:"block"}).appendTo(t?this.$element:document.body),n=this.getPosition(t),r=e[0].offsetWidth,i=e[0].offsetHeight;switch(t?s.split(" ")[1]:s){case"bottom":o={top:n.top+n.height,left:n.left+n.width/2-r/2};break;case"top":o={top:n.top-i,left:n.left+n.width/2-r/2};break;case"left":o={top:n.top+n.height/2-i/2,left:n.left-r};break;case"right":o={top:n.top+n.height/2-i/2,left:n.left+n.width}}e.css(o).addClass(s).addClass("in")}},isHTML:function(e){return typeof e!="string"||e.charAt(0)==="<"&&e.charAt(e.length-1)===">"&&e.length>=3||/^(?:[^<]*<[\w\W]+>[^>]*$)/.exec(e)},setContent:function(){var e=this.tip(),t=this.getTitle();e.find(".tooltip-inner")[this.isHTML(t)?"html":"text"](t),e.removeClass("fade in top bottom left right")},hide:function(){function r(){var t=setTimeout(function(){n.off(e.support.transition.end).remove()},500);n.one(e.support.transition.end,function(){clearTimeout(t),n.remove()})}var t=this,n=this.tip();n.removeClass("in"),e.support.transition&&this.$tip.hasClass("fade")?r():n.remove()},fixTitle:function(){var e=this.$element;(e.attr("title")||typeof e.attr("data-original-title")!="string")&&e.attr("data-original-title",e.attr("title")||"").removeAttr("title")},hasContent:function(){return this.getTitle()},getPosition:function(t){return e.extend({},t?{top:0,left:0}:this.$element.offset(),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var e,t=this.$element,n=this.options;return e=t.attr("data-original-title")||(typeof n.title=="function"?n.title.call(t[0]):n.title),e},tip:function(){return this.$tip=this.$tip||e(this.options.template)},validate:function(){this.$element[0].parentNode||(this.hide(),this.$element=null,this.options=null)},enable:function(){this.enabled=!0},disable:function(){this.enabled=!1},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()}},e.fn.tooltip=function(n){return this.each(function(){var r=e(this),i=r.data("tooltip"),s=typeof n=="object"&&n;i||r.data("tooltip",i=new t(this,s)),typeof n=="string"&&i[n]()})},e.fn.tooltip.Constructor=t,e.fn.tooltip.defaults={animation:!0,placement:"top",selector:!1,template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',trigger:"hover",title:"",delay:0}}}),timely.define("external_libs/bootstrap_popover",["jquery_timely","external_libs/bootstrap_tooltip"],function(e,t){if(!e.fn.popover){var n=function(e,t){this.init("popover",e,t)};n.prototype=e.extend({},e.fn.tooltip.Constructor.prototype,{constructor:n,setContent:function(){var e=this.tip(),t=this.getTitle(),n=this.getContent();e.find(".popover-title")[this.isHTML(t)?"html":"text"](t),e.find(".popover-content > *")[this.isHTML(n)?"html":"text"](n),e.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var e,t=this.$element,n=this.options;return e=t.attr("data-content")||(typeof n.content=="function"?n.content.call(t[0]):n.content),e},tip:function(){return this.$tip||(this.$tip=e(this.options.template)),this.$tip}}),e.fn.popover=function(t){return this.each(function(){var r=e(this),i=r.data("popover"),s=typeof t=="object"&&t;i||r.data("popover",i=new n(this,s)),typeof t=="string"&&i[t]()})},e.fn.popover.Constructor=n,e.fn.popover.defaults=e.extend({},e.fn.tooltip.defaults,{placement:"right",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}if(!e.fn.constrained_popover){var r=function(e,t){this.init("constrained_popover",e,t)};r.prototype=e.extend({},e.fn.popover.Constructor.prototype,{constructor:r,show:function(){var e,t,n,r,i,s,o,u,a={};if(this.hasContent()&&this.enabled){e=this.tip(),this.setContent(),this.options.animation&&e.addClass("fade"),o=typeof this.options.placement=="function"?this.options.placement.call(this,e[0],this.$element[0]):this.options.placement,t=/in/.test(o),e.remove().css({top:0,left:0,display:"block"}).appendTo(t?this.$element:document.body),n=this.getPosition(t),i=e[0].offsetWidth,s=e[0].offsetHeight;switch(t?o.split(" ")[1]:o){case"left":r=this.defineBounds(n),typeof r.top=="undefined"?a.top=n.top+n.height/2-s/2:a.top=r.top-s/2,typeof r.left=="undefined"?a.left=n.left-i:a.left=r.left-i,u={top:a.top,left:a.left};break;case"right":r=this.defineBounds(n),typeof r.top=="undefined"?a.top=n.top+n.height/2-s/2:a.top=r.top-s/2,typeof r.left=="undefined"?a.left=n.left+n.width:a.left=r.left+n.width,u={top:a.top,left:a.left}}e.css(u).addClass(o).addClass("in")}},defineBounds:function(t){var n,r,i,s,o,u,a={},f=e(this.options.container);return f.length?(r=f.offset(),i=r.top,s=r.left,o=i+f.height(),u=s+f.width(),t.top+t.height/2<i&&(a.top=i),t.top+t.height/2>o&&(a.top=o),t.left-t.width/2<s&&(a.left=s),t.left-t.width/2>u&&(a.left=u),a):!1}}),e.fn.constrained_popover=function(t){return this.each(function(){var n=e(this),i=n.data("constrained_popover"),s=typeof t=="object"&&t;i||n.data("constrained_popover",i=new r(this,s)),typeof t=="string"&&i[t]()})},e.fn.constrained_popover.Constructor=r,e.fn.constrained_popover.defaults=e.extend({},e.fn.popover.defaults,{container:"",content:this.options})}}),timely.define("external_libs/bootstrap_dropdown",["jquery_timely","domReady"],function(e,t){if(!e.fn.dropdown){var n='[data-toggle="dropdown"]',r=function(t){var n=e(t).on("click.dropdown.data-api",this.toggle);e("html").on("click.dropdown.data-api",function(){n.parent().removeClass("open")})};r.prototype={constructor:r,toggle:function(t){var n=e(this),r,s,o;if(n.is(".disabled, :disabled"))return;return s=n.attr("data-target"),s||(s=n.attr("href"),s=s&&s.replace(/.*(?=#[^\s]*$)/,"")),r=e(s),r.length||(r=n.parent()),o=r.hasClass("open"),i(),o||r.toggleClass("open"),!1}};function i(){e(n).parent().removeClass("open")}e.fn.dropdown=function(t){return this.each(function(){var n=e(this),i=n.data("dropdown");i||n.data("dropdown",i=new r(this)),typeof t=="string"&&i[t].call(n)})},e.fn.dropdown.Constructor=r,t(function(){e(document).on("click.dropdown.data-api",i),e(document).on("click.dropdown",".dropdown form",function(e){e.stopPropagation()}).on("click.dropdown.data-api",n,r.prototype.toggle)})}}),timely.define("scripts/common_scripts/frontend/common_frontend",["jquery_timely","domReady","scripts/common_scripts/frontend/common_event_handlers","ai1ec_calendar","external_libs/modernizr","external_libs/bootstrap_tooltip","external_libs/bootstrap_popover","external_libs/bootstrap_dropdown"],function(e,t,n,r,i){var s=!1,o=function(){s=!0,e(document).on("mouseenter",".ai1ec-popup-trigger",n.handle_popover_over),e(document).on("mouseleave",".ai1ec-popup-trigger",n.handle_popover_out),e(document).on("mouseleave",".ai1ec-popup",n.handle_popover_self_out),e(document).on("mouseenter",".ai1ec-tooltip-trigger",n.handle_tooltip_over),e(document).on("mouseleave",".ai1ec-tooltip-trigger",n.handle_tooltip_out),e(document).on("mouseleave",".tooltip",n.handle_tooltip_self_out)},u=function(){var t=[],i=[];e.each(r.fonts,function(){t.push(this.name),i.push(this.url)});var s={active:n.handle_fonts_loaded,custom:{families:t,urls:i}};timely.require(["external_libs/webfont"],function(){WebFont.load(s)})},a=function(){u(),t(function(){o()})},f=function(){return s};return{start:a,are_event_listeners_attached:f}});