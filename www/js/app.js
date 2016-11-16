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
    $scope.beaconLast = null;

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

    $scope.onJawboneClick = function() {

      $http.get('https://vita-cena.mybluemix.net/token?user=Test_User')
        .success(function(data, status, headers, config){

          var actualToken = null;

          for (var i = 0; i < data.length; i++) {
            if(actualToken === null || actualToken.timestamp < data[i].timestamp)
              actualToken = data[i];
          }

          console.log(actualToken.access_token);

          var items = [{
            name: $scope.result.name,
            sub_type: 2,
            calories: $scope.result.calories,
            protein: $scope.result.protein,
            saturated_fat: $scope.result.saturated_fat,
            unsaturated_fat: $scope.result.unsaturated_fat,
            carbohydrate: $scope.result.carbohydrate
          }];

          var title = $scope.result.name;
          var image = $scope.result.image_url;

          // data = 'aV1SI82xvTpK_Sa3ZSjDLDrylie4AAUvX0PlsHpLJUBC7LrLTyKlEdDroyDsnSQkrdG4YRHS8UrxnF8Qq8rkdVECdgRlo_GULMgGZS0EumxrKbZFiOmnmAPChBPDZ5JP';

          var req = {
            method: 'POST',
            url: encodeURI('https://jawbone.com/nudge/api/v.1.1/users/@me/meals?note='+title+'&title='+title+'&image_url='+image+'&tz=GMT+0100&items='+JSON.stringify(items)),
            // url: 'https://jawbone.com/nudge/api/v.1.1/users/@me/meals?note=Test_Meal&title=Test_Meal&tz=GMT+0100&items=[{%22name%22:%22Meal1%22,%22measurement%22:%22grams%22,%22amount%22:250,%22sub_type%22:2,%22calories%22:342,%22protein%22:123,%22saturated_fat%22:12,%22unsaturated_fat%22:14,%22carbohydrate%22:154}]',
            headers: {
              'Authorization': 'Bearer ' + actualToken.access_token,
              'Content-Type': 'application/x-www-form-urlencoded',
              'Accept': 'application/json'
            }
          };

          console.log("URL: " + req.url);

          $http(req).then(function(data, status, headers,config){
            console.log('data success');
            console.log(JSON.stringify(data));
          }, function(data, status, headers,config){
            console.log('data error: ' + JSON.stringify(status) + ' | ' + JSON.stringify(headers) + ' | ' + JSON.stringify(data));
          });
        })
        .error(function(data, status, headers,config){
          console.log('data error: ' + JSON.stringify(status) + ' | ' + JSON.stringify(headers) + ' | ' + JSON.stringify(data));
        });
    };

    $ionicPlatform.ready(function() {

        $cordovaBeacon.requestWhenInUseAuthorization();

        $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {

          $scope.beacons = {};

          var nearestBeacon = null;

          for(var i = 0; i < pluginResult.beacons.length; i++) {
            var uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
            $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];

            if(!(typeof pluginResult.beacons[i].rssi === 'undefined' || pluginResult.beacons[i].rssi === null)
            && (nearestBeacon === null || nearestBeacon.rssi < pluginResult.beacons[i].rssi)){
              nearestBeacon = pluginResult.beacons[i];
            }
          }

          if($scope.beaconLast === null || $scope.beaconLast.minor != nearestBeacon.minor){
            $scope.beaconLast = nearestBeacon;
            $http.get('https://vita-cena.mybluemix.net/meals?id=' + nearestBeacon.minor)
              .success(function(data, status, headers, config){
                $scope.result = "";
                console.log('data success');
                console.log(JSON.stringify(data[0])); // for browser console
                $scope.result = data[0];
              })
              .error(function(data, status, headers, config){
                console.log('data error: ' + JSON.stringify(status) + ' | ' + JSON.stringify(headers));
              });
          }

            $scope.$apply();
        });

        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "e2c56db5-dffb-48d2-b060-d0f5a71096e0"));

    });
});
