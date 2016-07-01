var myApp=angular.module( 'myApp', [] );

myApp.controller( "villanController", ['$scope', '$http', function($scope, $http){

  var populateVillans = function(){
    $http({
      method: "GET",
      url: "/getVillans"
    }).then(function(results){
      $scope.villanRecords = results.data;
    }).then($http({
      method: "GET",
      url: "/getPowers"
    }).then(function(powerResults){
      console.log(powerResults.data[0].power_name); //Not sure why the data came back in an array but WHATEVER, I don't have enought time to fix it
      $scope.powerList = powerResults.data[0].power_name;
    }));
  };

  populateVillans();

  $scope.vanquish = function(villanId){
    var sendId = {
      id: villanId
    }
    console.log("Client sending " + sendId + " to defeat.");

    $http({
      method: "DELETE",
      url: "/deleteVillan",
      data: sendId,
      headers: {'Content-Type': 'application/json;charset=utf-8'}
    }).then(populateVillans());

  };

  $scope.createVillan = function(){
    console.log("MUWAHAHAHA");

    var sendVillan = {
      alias: $scope.aliasIn,
      first_name: $scope.fNameIn,
      last_name: $scope.lNameIn,
      city: $scope.cityIn,
      power_name: $scope.powerIn
    }

    $scope.aliasIn = '';
    $scope.fNameIn = '';
    $scope.lNameIn = '';
    $scope.cityIn = '';
    $scope.powerIn = '';

    console.log("Sending: " + sendVillan.alias);

    $http({
      method: "POST",
      url: "/createVillan",
      data: sendVillan
    }).then(function(){
      populateVillans();
    });

  };

}]);
