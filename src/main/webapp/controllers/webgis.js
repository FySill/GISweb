//function webGis($scope) {
//	$scope.loadingData = function () {
	    require(["dojo/on", "dojo/query", "dojo/parser", "dojo/ready", "dijit/layout/BorderContainer", "dijit/layout/ContentPane", "dojo/dom", "esri/map", "esri/geometry/Extent", "esri/urlUtils", "esri/arcgis/utils", "esri/dijit/Legend", "esri/dijit/Scalebar", "dojo/domReady!"], 
        function( on, query, parser, ready, BorderContainer, ContentPane, dom, Map, Extent, urlUtils, arcgisUtils, Legend, Scalebar) {
	    	// Wire UI Events
	    	var layerIsHide = true;
	    	var frist = true;
	        on(dom.byId("btnLayers"),"click", function() { 
	        	if (layerIsHide) {
	        		$("#layer").animate({top:50,opacity:'show',width:150,height:400,right:'85%'},500);
	        		layerIsHide = false;
	        	} else {
	        		$("#layer").animate({top:50,opacity: 'hide',width:0,height:0,right:0},500);
	        		layerIsHide = true;
	        	}
	        	var isHide = true;
	        	var text = "";
	        	if (frist) {
//	        		on(dom.byId("legend_operational0"),"click", function() { 
	        		var length = $('#legend_operational0')[0].childNodes.length;
	        		for (var i = 1; i < length; i++){
	        		on($('#legend_operational0')[0].childNodes[i],"click", function(e) { 
		            	if (isHide ) {
		            		$("#webtable").animate({top:150,opacity:'show',width:150,height:400,left:'40%'},500);
		            		text = e.currentTarget.innerText;
		            		isHide = false;
		            	}else if(text != e.currentTarget.innerText){
		            		//
		            		text = e.currentTarget.innerText;
		            	}
		            	else {
		            		$("#webtable").animate({top:150,opacity: 'hide',width:0,height:0,left:0},500);
		            		text = "";
		            		isHide = true;
		            	}
		            });
	        		frist = false;
	        		}
	        	}
	        	
//	          map.setBasemap("streets");
	        });
//	        on(dom.byId("btnSatellite"),"click", function() { 
////	          map.setBasemap("satellite");
//	        });
//	        on(dom.byId("btnHybrid"),"click", function() { 
//	          map.setBasemap("hybrid");
//	        });
//	        on(dom.byId("btnTopo"),"click", function() { 
//	          map.setBasemap("topo");
//	        });
//	        on(dom.byId("btnGray"),"click", function() { 
//	          map.setBasemap("gray");
//	        });
//	        on(dom.byId("btnNatGeo"),"click", function() { 
//	          map.setBasemap("national-geographic");
//	        });
	    	// Toggle panel
	        on(dom.byId("chevron"), "click", function(e){
	          if (query(".glyphicon.glyphicon-chevron-up")[0]) {
	            query(".glyphicon").replaceClass("glyphicon-chevron-down","glyphicon-chevron-up");
	            query(".panel-body.collapse").removeClass("in");
	          } else {
	            query(".glyphicon").replaceClass("glyphicon-chevron-up","glyphicon-chevron-down");
	            query(".panel-body.collapse").addClass("in");
	          }
	        });
	        ready(function(){
	        parser.parse();
	        var webmap = {};
	        webmap.item = {
	          "title":"frist map"
	        };
	        webmap.itemData = {
	          "operationalLayers": [{
	            "url": "http://192.168.2.127:6080/arcgis/rest/services/webgis/cx/MapServer",
	            "visibility": true,
	            "opacity": 0.75,
	            "title": "     ",
//	            "itemId": "204d94c9b1374de9a21574c9efa31164"
	          }],
	          "baseMap": {
	            "baseMapLayers": [{
	              "opacity": 1,
	              "visibility": true,
	              "url": "http://192.168.2.127:6080/arcgis/rest/services/webgis/cx/MapServer"
	              },{
	              "isReference": true,
	              "opacity": 1,
	              "visibility": true,
	              "url": "http://192.168.2.127:6080/arcgis/rest/services/webgis/cx/MapServer"
	              }],
	            "title": "World_Terrain_Base"
	          },
	          "version": "1.1"
	        };
	        arcgisUtils.createMap(webmap,"map").then(function(response){
	          var map = response.map;
		        var legendLayers = arcgisUtils.getLegendLayers(response); 
		          var legendDijit = new Legend({
		            map: map,
		            layerInfos: legendLayers
		          },"legend");
		          legendDijit.startup();
	        });
        });
      });
//	}
//}