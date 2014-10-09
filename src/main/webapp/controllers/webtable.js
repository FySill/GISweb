var featureLayer, pageInfo, grid;
    require([
      "esri/layers/FeatureLayer", "esri/tasks/query", "esri/TimeExtent",
      "dojo/number", "dojo/date/locale", "dojo/dom","dojo/on",
      "dojo/_base/array", "dojo/store/Memory",
      "dgrid/OnDemandGrid", "dojo/domReady!"
    ], function(
      FeatureLayer, Query, TimeExtent,
      number, locale, dom, on,
      arrayUtils, Memory,
      OnDemandGrid
    ) {
    	on(dom.byId("btnSatellite"),"click", function() { 
        	if (isHide) {
        		$("#webtable").animate({top:50,opacity:'show',width:150,height:400,right:'85%'},500);
        		isHide = false;
        	} else {
        		$("#webtable").animate({top:50,opacity: 'hide',width:0,height:0,right:0},500);
        		isHide = true;
        	}
      })
    }
);