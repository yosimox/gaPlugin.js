(function(){

/////////////////// TRACKING SETTING /////////////////////////////
	var gaConf1 = gaConf.conf1;
	var _gaTrackName = "_firstTracker";
	var firstTracker = new GaPlugin(gaConf1.cnf, _gaTrackName);
	
	//Cross Domain Tracking Setting
	//_gaq.push([_gaTrackName+'._setDomainName', '.sample.com']);
	//_gaq.push([_gaTrackName+'._setAllowLinker', true]);
	//_gaq.push([_gaTrackName+'._setAllowHash', false]);


	//firstTracker.contentGroup(1, gaConf1.cg);
	firstTracker.dirGroup(1,2);
	firstTracker.getParam(2, gaConf1.getPar);
	firstTracker.cv(3, gaConf1.cv);
	firstTracker.weekDay(4);
	firstTracker.dayTime(5);
	//firstTracker.debug();

	_gaq.push([_gaTrackName+'._trackPageview']);
	//firstTracker.virtualPageviews(gaConf1.cg)

	window.onload=function(){
		firstTracker.autoLink(gaConf1.autoLink);
		firstTracker.timeToComplete(gaConf1.timeToComplete, true);
		firstTracker.virtualPVPlus(30);
		firstTracker.movieTrack(gaConf1.movie);
		//firstTracker.allowLinker(gaConf1.allowLinker);
	};
	
/*
	//Second Tracker for Multipul Account Tracking
	var gaConf2 = gaConf.conf2;
	var _gaTrackName = "_secondTracker";
	var secondTracker = new GaPlugin(gaConf2.cnf, _gaTrackName);
	
	//secondTracker.contentGroup(1, gaConf2.cg);
	//secondTracker.getParam(2, gaConf2.getPar);
	//secondTracker.cv(3, gaConf2.cv);
	//secondTracker.weekDay(4);
	//secondTracker.debug();

	//_gaq.push([_gaTrackName+'._trackPageview']);
	//secondTracker.virtualPageviews(gaConf2.cg);
	secondTracker.virtualDirGroup(2);

	window.onload=function(){
		secondTracker.autoLink(gaConf2.autoLink);
		//secondTracker.movieTrack(gaConf2.movie);
		//secondTracker.timeToComplete(5, gaConf2.timeToComplete);
	};
	
*/	
	
	
})();

