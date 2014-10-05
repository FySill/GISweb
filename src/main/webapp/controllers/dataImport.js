require(["dojo/on", "dojo/query", "dojo/parser", "esri/layers/FeatureLayer", "esri/tasks/query",
	     "dojo/ready", "dijit/layout/BorderContainer",  "esri/layers/GraphicsLayer",
	     "dijit/layout/ContentPane", "dojo/dom", "esri/map", "esri/graphic",
	     "esri/geometry/Extent", "esri/urlUtils", "esri/arcgis/utils", 
	     "esri/dijit/Legend", "esri/dijit/Scalebar","dojo/_base/array",
	     "dgrid/OnDemandGrid", "dojo/store/Memory", "dojo/domReady!"], 
function( on, query, parser, FeatureLayer, Query, ready, BorderContainer, GraphicsLayer, ContentPane, 
		dom, Map, Graphic, Extent, urlUtils, arcgisUtils, Legend, Scalebar,arrayUtils,
		OnDemandGrid, Memory) {
	 		var extendPoint;
//	 		console.log("dataImport");
//	 		console.log(featureLayer);
	    	on(dom.byId("btnImport"),"click", function() { 
//				var length = $('#legend_operational0')[0].childNodes.length;
//				var layerNumArr = [];
//				for (var n = 1; n < length; n++){
//				layerNumArr[$('#legend_operational0')[0].childNodes[n].innerText] = n;
//				}
//				layerNum = layerNumArr["边界"];
		        featureLayer = new FeatureLayer("http://192.168.2.127:6080/arcgis/rest/services/webgis/cx/MapServer/6", {
			          outFields:["*"]
			    });
    	        featureLayer.on("load", function () {
  		          var query = new Query();
  		          query.where = "OBJECTID > 0";
  		          featureLayer.queryIds(query, function (objectIds) {
  		            if (objectIds.length > 0) {
  		            	var query = new Query();
  		                query.objectIds = objectIds;
  		                query.outFields = ["*"];
  		                featureLayer.queryFeatures(query, function (featureSet) {
  		                	extendPoint = [];
  		                	extendPoint = featureSet.features[0].geometry.paths[0];
//  		                	for(var point in featureSet.features[0].geometry.paths[0]){
//  		                		extendPoint.push(featureSet.features[0].geometry.paths[0][point]);
//  		                	}
  		                	var rings = [];
  		    		        var myPolygon = {"geometry":{"rings":rings.push(extendPoint),
						                                "spatialReference":{latestWkid: 2384, wkid: 2384}
						     							},
						                    "symbol":{"color":[0,0,0,64],
						                   	 	   "outline":{"color":[0,0,0,255],
						                   	 		   		  "width":1,
						                   	 		   		  "type":"esriSLS","style":"esriSLSSolid"},
						                   	 	   "type":"esriSFS","style":"esriSFSSolid"}
						     				};
  		                });
  		            }
  		       });  
  	        });
      })
    }
);