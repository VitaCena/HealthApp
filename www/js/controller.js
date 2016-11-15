/**
 * Created by moritzkornmeier on 15.11.16.
 */
angular.module('starter')

  .controller('SomeController', function(SomeDataFactory){
    var _this = this;

    SomeDataFactory.getSomeData().then(function(response){
      //do something with response
      console.log(this.data)
      _this.data = response.data;
    }).catch(function(response){
      //handle the error
    });
  });
