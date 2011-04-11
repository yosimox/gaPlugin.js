(function(){

/////////////////// TRACKING SETTING /////////////////////////////
	var gaConf1 = gaConf.conf1;
	var _gaTrackName = "_firstTracker";
	var firstTracker = new GaPlugin(gaConf1.cnf, _gaTrackName);

	firstTracker.dirGroup(1);
	firstTracker.dirGroup(2, 2);
	firstTracker.getParam(3);
	firstTracker.weekDay(4);
	firstTracker.dayTime(5);

	_gaq.push([_gaTrackName+'._trackPageview']);

	window.onload=function(){
		firstTracker.autoLink();
	};

})();

