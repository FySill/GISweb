<html ng-app>
  <head>
    <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no">
    <title>Loading the frist map</title>

    <link rel="stylesheet" href="http://js.arcgis.com/3.10/js/dojo/dijit/themes/claro/claro.css"/>
    <link rel="stylesheet" href="http://js.arcgis.com/3.10/js/esri/css/esri.css" />

    <script src="http://js.arcgis.com/3.10/"></script>
    <script src="/GISweb/javascripts/jquery-2.1.1.min.js"></script>
    <script src="http://cdn.bootcss.com/angular.js/1.3.0-beta.8/angular.min.js"></script>
    <script src="/GISweb/controllers/webgis.js"></script>
  </head>

  <body class="claro" ng-controller='webGis' ng-init='loadingData()'>
    <div id="mainWindow" data-dojo-type="dijit/layout/BorderContainer" data-dojo-props="design:'headline'" style="width:100%; height:100%;">
      <div id="header" class="shadow roundedCorners" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'top'">
        <div id="title"></div>
        <div id="subtitle"></div>
      </div>
      <div id="map" class="roundedCorners shadow" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'center'"></div>
      <div id="rightPane" class="roundedCorners shadow" data-dojo-type="dijit/layout/ContentPane" data-dojo-props="region:'right'" >
        <div id="legend"></div>
      </div>
    </div>
  </body>
</html>