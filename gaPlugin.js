/*	gaPlugin.js v2.0 <http://web-analytics-or-die.org/2011/02/ga_plugin_j/> 
	is released under the MIT License <http://www.opensource.org/licenses/mit-license.php> 
*/

var GaPlugin = function(conf, trackName){
	this.pageLevel = conf.pageLevel;
	this.trackName = trackName;
	_gaq.push([trackName+'._setAccount', conf.account]);
}

//Prototype Setting
GaPlugin.prototype = {
	//Common Utility
	common : {
  		//Return GET Parameter
		getQuery : function(name){
			if(location.search){
					var query = location.search;
					query = query.substring(1,query.length);
					var qArray = [];
					qArray = query.split("&");
					for(var i=0;i<qArray.length;i++){
						var param = qArray[i].split("=");
						if(param[0] == name){
							return param[1];
						}
					}
				}else{
					return false;
				}
				return false;
			},
		//Delete Custom Var for Custom Link
		delCvar : function(cVarArray, trcName){
			for(var i = 0; i < cVarArray.length ; i++){
				//console.log([trcName+'._deleteCustomVar', cVarArray[i]]);
				_gaq.push([trcName+'._deleteCustomVar', cVarArray[i]]);
				}
			},
		//Wait Function
		loopWait : function(timeWait) {
			var timeStart = new Date().getTime();
			var timeNow = new Date().getTime();
			 while( timeNow < (timeStart + timeWait ) )
		 {
			 timeNow = new Date().getTime();
		}
			return;
		},
			//for cookie setting
	    getCookie: function(key) {
	        var cookies = document.cookie.split('; ');
	        for (var i = 0; i < cookies.length; i++) {
	            var part = cookies[i].split('=');
	            if (part[0] == key && part[1] != null) {
	                return unescape(part[1]);
	            }
	        }
	        return null;
	    },
	    setCookie: function(key, value, life) {
	        var date = new Date();
	        date.setTime(date.getTime() + life);
	        document.cookie = key + '=' + escape(value)
	            + '; expires=' + date.toGMTString() + '; path=/';
	    }
	    
	},
	//Content Group
	contentGroup : function(slot,confCg){
		var groupName = this.getContentGroup(confCg.pages);
		_gaq.push([this.trackName+'._setCustomVar', slot, confCg.category, groupName, confCg.scope]);
	},
	getContentGroup : function(pages){
		var	path = location.pathname;
		var cVal = "";
		for(var i in pages){
			if(path.match(pages[i])){
				cVal = i;
				break;
			}
		}
		if(cVal==""){
			cVal = "others";
		}
		return cVal;
	},
	//Directroy Group
	dirGroup : function(slot){
		var pathArr = location.pathname.split('/');
		var dirName = "";
		if(pathArr.length < 3){
			dirName = "top";
		}else{
			dirName = pathArr[1];
		}
		_gaq.push([this.trackName+'._setCustomVar', slot, "DirectoryGroup", dirName, 3]);
	},

	//GET Parameter
	getParam : function(slot, confPar){
		var val = this.common.getQuery(confPar.paramName);
		if(val){
			_gaq.push([this.trackName+'._setCustomVar', slot, confPar.category, val, confPar.scope]);
		}
	},
	//Conversion User
	cv : function(slot, confCv){
		var loc = location.pathname + location.search;
		var arr = confCv.urlString;
		for(var i=0; i < arr.length; i++){
			if(loc.match(arr[i])){
				_gaq.push([this.trackName+'._setCustomVar', slot, confCv.category, confCv.cvName, confCv.scope]);				
			}
		}
	},
	//Get Week Day
	weekDay : function(slot){
		var week = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
		var today = week[new Date().getDay()];
		_gaq.push([this.trackName+'._setCustomVar', slot, "WeekDay", today, 2]);					
	},
	
	//AutoLink
	//_gaq.push(['_trackEvent', 'category', 'action', 'optional_label','optional_value']);
	autoLink : function(confLink){
		var aTag = document.getElementsByTagName('a');
		
		if(!confLink){
			confLink = this.defAutoLinkCof;
		}
		this.confLink = confLink;
		this.confLink.internalDomain.push(location.host);
		for(var i=0; i < aTag.length; i++){
			var ref = aTag[i].href;
			var path = "";
			//Link for Outbound
				if(this.matchDomain(ref, this.confLink.internalDomain) === false){
						this.addListener(aTag[i],
						"click",
						this.bindFunc(aTag[i], this.getOffsite, this)
						);
					//alert(ref + ":offsite");
				//Link for Internal
				}else{
					this.addListener(aTag[i],
					"click",
					this.bindFunc(aTag[i], this.getOnsite, this)
					);
				//alert(ref + ":onsite");
				}
		}
	},
	addListener : function(el, type, func) {
		  if(! el) { return false; }
		  if(el.addEventListener) { 
		    el.addEventListener(type, func, false);
		  } else if(el.attachEvent) { 
		    el.attachEvent('on'+type, func);
		  } else {
		    return false;
		  }
		  return true;
	},
	matchDomain : function(ref, domainURL){
		for(var i = 0; i < domainURL.length; i++){
			if(ref.indexOf(domainURL[i]) != -1){
				return true;
			}
		}
		return false;
	},
	bindFunc : function (bind, func, that){
	    return (function(){
	    	 var arg = [that];
	        func.apply(bind, arg);
	    	}
	    )
	},
	getOffsite : function(arg){
		var path = this.hostname + this.pathname;
		path = arg.delSlash(path);
		//console.log(path);
		//console.log(arg);
		var ev_val = {
			category : arg.confLink.category.offSite,
			action : location.pathname,
			label : path
			};
		//delete the customVar of PageLevel
		arg.common.delCvar(arg.pageLevel, arg.trackName);
		_gaq.push([arg.trackName+'._trackEvent', ev_val.category, ev_val.action, ev_val.label]);
		//Delay 50mm seconds
		arg.common.loopWait(50);
	},

	getOnsite : function(arg){
		var path = this.hostname + this.pathname;
		path = arg.delSlash(path);
		var ev_val = {};
		
		var arr = arg.confLink.dlFiles;
		for(var val in arr){
			if(path.match(arr[val])){
				ev_val = {
					category : arg.confLink.category.download,
					action : location.pathname,
					label : path.replace(location.hostname, "") 
					};
				//delete the customVar of PageLevel
				arg.common.delCvar(arg.pageLevel, arg.trackName);
				//console.log(ev_val);
				_gaq.push([arg.trackName+'._trackEvent', ev_val.category, ev_val.action, ev_val.label]);
				//Delay 50mm seconds
				arg.common.loopWait(50);
				break;
			}
		}
	},

	delSlash : function(str){
		if (str === "/"){
			return "/";
		}else{
			str = str.replace(/^\//, "");
			str = str.replace(/\/$/, "");
			return str;
		}
	},
	defAutoLinkCof : {
		internalDomain : [],
		category : {
			offSite : "OffSiteLink",
			download : "DownLoadLink"
		},
		dlFiles : {
			emailLink : /^mailto:(.+)$/i,
			pdf: /^(.+\.pdf)$/i,
			zip: /^(.+\.zip)$/i,
			PowerPoint: /^(.+\.pptx?)$/i,
			Excel: /^(.+\.xlsx?)$/i,
			Word: /^(.+\.docx?)$/i
		}	
	},
	//End of AutoLink
	
	//Movie Watching Time Measuring
	movieTrack : 	function(confMovie){
			var category = confMovie.category;
			var action = confMovie.action;
			var maxT = confMovie.maxTime;
			var t = confMovie.interval;
			
			var that = this
			var elas = 0;
			var fnc = function(){
				_gaq.push([that.trackName+'._trackEvent', category, action, ""+elas]);
				elas += t;
				if(elas > maxT){
					clearInterval(timer);		
					}
				}
			this.common.delCvar(this.pageLevel, this.trackName);
			fnc();
			timer = setInterval(function(){fnc()}, t*1000);
		},	
	
	//
	timeToComplete : function(confTC){
			var stArr = confTC.startUrl;
			var enArr = confTC.endUrl;
			var cookieName = confTC.cookieName;
			var action = confTC.action;
			
			var uri = document.URL;
			
			// Start
			var stArrLen = stArr.length;
			for (var i=0; i < stArrLen; i++){
				if(uri.match(stArr[i])){
					this.ttcStart(cookieName);
				}
			}
			//End
			var enArrLen = enArr.length;
			for (var i=0; i < enArrLen; i++){
				if(uri.match(enArr[i])){
					this.ttcEnd(action, cookieName);
				}
				else{
					return false;
				}
			}
							
		},
	ttcStart : function(cookieName){
			if(!this.common.getCookie(cookieName)){
				var d = new Date().getTime();
				//valid time = 24 hours
				this.common.setCookie(cookieName, d, 1000*60*60*24);
			}else{
				return false;
			}
			
		},
	ttcEnd : function(action, cookieName){
			if(this.common.getCookie(cookieName)){
				var sTime = parseInt(this.common.getCookie(cookieName));
				if(sTime!==0){
					var eTime = new Date().getTime();
					var ttc = Math.round((parseInt(eTime) -sTime)/1000);
					
					var ev_val = {
						category : "timeToComplete",
						action 		: action,
						label : location.pathname
					}
					this.common.delCvar(this.pageLevel, this.trackName);
					_gaq.push([this.trackName+'._trackEvent', ev_val.category, ev_val.action, ev_val.label, ttc]);
					this.common.setCookie(cookieName, 0, 1000*60*60*24);
				}else{
					return false;
				}
			}else{
				return false;
			}
		},	
	
	//Virtual PageViews for Content Group
	virtualPageviews : function(confCg){
		var groupName = "/" + this.getContentGroup(confCg.pages);
		_gaq.push([this.trackName+'._trackPageview', groupName]);
		},
	
	//Virtural PageViews for the users staying over xx seconds
	virtualPVPlus : function(seconds){
			var cookieName = "_gapluginPVP";
			var path = location.pathname + location.search;
			var that = this;
			if(!this.common.getCookie(cookieName)){
				setTimeout(function(){
					_gaq.push([that.trackName+'._trackPageview', path + "_" + seconds + "over"]);
				},
				seconds * 1000);
			}
			this.common.setCookie(cookieName, true, (30 * 1000 * 60));			
		},
	
	//Allow link (by get) to use same _utm cookies for cross domain tracking
	allowLinker : function(confLinker){
		var aTag = document.getElementsByTagName('a');
		this.allowLinker = confLinker.allow;
		for(var i=0; i < aTag.length; i++){
			var ref = aTag[i].href;
			//Link for Outbound
				if(this.matchDomain(ref, this.allowLinker) === true){
						this.addListener(aTag[i],
						"click",
						this.bindFunc(aTag[i], this.getLinker, this)
						);
				}
		}
	},
	getLinker : function(arg){
		var href = this.href;
		_gaq.push([arg.trackName+'._link', href]);
		//Delay 50mm seconds
		arg.common.loopWait(50);
	},	
	dayTime : function(slot){
		var times = "";
		var myHour = new Date().getHours();
		if(myHour < 5){
			times = "late night";
		}else if(myHour < 9){
			times = "early morning";
		}else if(myHour < 12){
			times = "morning";
		}else if(myHour < 15){
			times = "after noon";
		}else if(myHour < 18){
			times = "evening";
		}else if(myHour < 21){
			times = "late evening";
		}else if(myHour < 24){
			times = "night";
		}else{
			times = "error";
		}
		_gaq.push([this.trackName+'._setCustomVar', slot, "DayTime", times, 2]);
	},
	
	//method for debug
	debug : function(){console.log(this);}
}


//Read ga.js and Make _gaq object
var _gaq = _gaq || [];
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
  
