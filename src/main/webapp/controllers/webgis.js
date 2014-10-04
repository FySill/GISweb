//function webGis($scope) {
//	$scope.loadingData = function () {

	    require(["dojo/on", "dojo/query", "dojo/parser", "esri/layers/FeatureLayer", "esri/tasks/query",
	             "dojo/ready", "dijit/layout/BorderContainer", 
	             "dijit/layout/ContentPane", "dojo/dom", "esri/map", 
	             "esri/geometry/Extent", "esri/urlUtils", "esri/arcgis/utils", 
	             "esri/dijit/Legend", "esri/dijit/Scalebar",
	             "dgrid/OnDemandGrid", "dojo/store/Memory", "dojo/domReady!"], 
        function( on, query, parser, FeatureLayer, Query, ready, BorderContainer, ContentPane, 
        		dom, Map, Extent, urlUtils, arcgisUtils, Legend, Scalebar,
        		OnDemandGrid, Memory) {
	    	var featureLayer, pageInfo, grid;
	    	// create a dgrid 
	        var sortAttr = [{
	          attribute: "OBJECTID",
	          descending: true
	        }];
	        grid = new OnDemandGrid({
	          store: Memory({
	            idProperty: "OBJECTID"
	          }),
	          columns:{
	        	OBJECTID: "OBJECTID",
	            JCDBH: "JCDBH",
	            JZDJ: "JZDJ",
	            SCZJ: "SCZJ",
	          },
	          sort: sortAttr
	        }, "grid");
	     // create a feature layer
	        featureLayer = new FeatureLayer("http://192.168.2.127:6080/arcgis/rest/services/webgis/cx/MapServer/2", {
	          outFields:["*"]
	        });
	     // get object IDs from the table (feature layer)
	        featureLayer.on("load", function () {
	          // create the query to fetch object IDs for earthquakes that have a magnitude greater than 6.0
	          // that occurred after January 1st 2007
	          var query = new Query();
	          query.where = "OBJECTID > 1";
//	          query.timeExtent = new TimeExtent(new Date("01/01/2007 UTC"));
	          featureLayer.queryIds(query, function (objectIds) {
	        	  console.log("objectids:" + objectIds);
	            fetchRecords(objectIds);
	          });
	          // Query for the records with the given object IDs and populate the grid
//	            featureLayer.queryFeatures(query, function (featureSet) {
//	            	console.log("featureSet:" + featureSet);
//	              updateGrid(featureSet, pageNumber);
//	            });
	        });
	        function fetchRecords(objectIds) {
	            if (objectIds.length > 0) {
	            	var query = new Query();
	                query.objectIds = objectIds;
	                query.outFields = ["*"];
	                featureLayer.queryFeatures(query, function (featureSet) {
	                	console.log("featureSet:" + featureSet);
//	              		updateGrid(featureSet, pageNumber);
	                });
//	              updatePageInformation(objectIds);
//	              queryRecordsByPage(1);
	            } else {
	              grid.showMessage("No matching records");
	              grid.setStore(null);
	            }
	        };
	        function updatePageInformation(objectIds, page) {
	            pageInfo = {
	              objectIds: objectIds,
	              totalRecords: objectIds.length,
	              totalPages: Math.ceil(objectIds.length / 15),
	              currentPage: page || 0,
	              recordsPerPage: 15
	            };
	        };
	        
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
		            		$("#webtable").animate({top:150,opacity:'show',width:500,height:300,left:'30%'},500);
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