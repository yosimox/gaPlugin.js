

(function(){

/////////////////// TRACKING SETTING /////////////////////////////
	//load configure file. Set the pathname for configure files
	var gaConf = loadJson("/test/ga/js/gaConf.json");
	var _gaTrackName = "_firstTracker";
	var firstTracker = new GaPlugin(gaConf.cnf, _gaTrackName);
	
	//Cross Domain Tracking Setting
	//_gaq.push([_gaTrackName+'._setDomainName', '.sample.com']);
	//_gaq.push([_gaTrackName+'._setAllowLinker', true]);
	//_gaq.push([_gaTrackName+'._setAllowHash', false]);


	firstTracker.contentGroup(1, gaConf.cg);
	//firstTracker.dirGroup(1);
	firstTracker.getParam(2, gaConf.getPar);
	firstTracker.cv(3, gaConf.cv);
	firstTracker.weekDay(4);
	firstTracker.dayTime(5);
	//firstTracker.debug();

	_gaq.push([_gaTrackName+'._trackPageview']);
	//firstTracker.virtualPageviews(gaConf.cg)

	window.onload=function(){
		//firstTracker.autoLink(gaConf.autoLink);
		firstTracker.autoLink();
		firstTracker.timeToComplete(gaConf.timeToComplete);
		//firstTracker.allowLinker(gaConf.allowLinker);
		//firstTracker.movieTrack(gaConf.movie);
	};
	
/*
	//Second Tracker for Multipul Account Tracking
	var gaConf2 = loadJson("/test/ga/js/gaConf2.json");
	var _gaTrackName = "_secondTracker";
	var secondTracker = new GaPlugin(gaConf2.cnf, _gaTrackName);
	
	//secondTracker.contentGroup(1, gaConf2.cg);
	//secondTracker.getParam(2, gaConf2.getPar);
	//secondTracker.cv(3, gaConf2.cv);
	//secondTracker.weekDay(4);
	//secondTracker.debug();

	//_gaq.push([_gaTrackName+'._trackPageview']);
	secondTracker.virtualPageviews(gaConf2.cg)

	window.onload=function(){
		secondTracker.autoLink(gaConf2.autoLink);
		//secondTracker.movieTrack(gaConf2.movie);
		//secondTracker.timeToComplete(5, gaConf2.timeToComplete);
	};
	
*/	
	
	
	
/////////////////// END OF TRACKING SETTING //////////////////////

	////////////////DO NOT ALTER BELOW/////////////
	//function for loading json conf file
	function loadJson(path){
		var req = new XMLHttpRequest();
		req.open("GET", path, false);  
		req.send(null); 
		var text = req.responseText; 
		return eval( "(" + text + ")" );
	}
	
})();

