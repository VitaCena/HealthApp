/**
 * Created by moritzkornmeier on 15.11.16.
 */
angular.module('starter').factory

  .factory('SomeDataFactory', function($http){
    var url = 'https://vita-cena.mybluemix.net/meals?id=1';

    return {
      getSomeData: function(){
        return $http.jsonp(url);
      }
    }
  });
