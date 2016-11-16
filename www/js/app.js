// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'ngCordovaBeacon'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller("MainController", function($scope, $rootScope, $ionicPlatform, $cordovaBeacon, $http) {

    $scope.beacons = {};
    $scope.result = "";
    $scope.testResult = "Test";

    $scope.onButtonClick = function(){
      
      $http.get('https://vita-cena.mybluemix.net/meals?id=1')
        .success(function(data, status, headers,config){
          $scope.result = "";
          console.log('data success');
          console.log(JSON.stringify(data[0])); // for browser console
          $scope.result = data[0];
        })
        .error(function(data, status, headers,config){
          console.log('data error: ' + JSON.stringify(status) + ' | ' + JSON.stringify(headers));
        });
    };

    $scope.onJawboneClick = function() { //https://vita-cena.mybluemix.net/redirect

    };

    $ionicPlatform.ready(function() {

        $cordovaBeacon.requestWhenInUseAuthorization();

        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {

            $scope.beacons = {};

            var nearestBeacon = {};

            for(var i = 0; i < pluginResult.beacons.length; i++) {
                var uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
                $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];

                if(!(typeof pluginResult.beacons[i].rssi === 'undefined' || pluginResult.beacons[i].rssi === null)
                && ((typeof nearestBeacon.rssi === 'undefined' || nearestBeacon.rssi === null)
                || nearestBeacon.rssi < pluginResult.beacons[i].rssi)){
                  nearestBeacon = pluginResult.beacons[i];
                }
            }

            if(nearestBeacon != null) {
              $scope.testResult = JSON.stringify(nearestBeacon);
              $http.get('https://vita-cena.mybluemix.net/meals?id=' + nearestBeacon.minor)
                .success(function(data, status, headers,config){
                  $scope.result = "";
                  console.log('data success');
                  console.log(JSON.stringify(data[0])); // for browser console
                  $scope.result = data[0];
                })
                .error(function(data, status, headers,config){
                  console.log('data error: ' + JSON.stringify(status) + ' | ' + JSON.stringify(headers));
                });
            }

            $scope.$apply();
        });

        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "e2c56db5-dffb-48d2-b060-d0f5a71096e0"));

    });
});
