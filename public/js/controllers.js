/**
 * Created by Mike Ligthart on 11-Oct-16.
 */

/* Auth controllers */
var authControllers = angular.module('authControllers', []);

authControllers.controller("SignUpController", ['$scope', '$firebaseAuth', function ($scope, $firebaseAuth) {
    var auth = $firebaseAuth();
}]);

authControllers.controller("SignInController", [
    '$scope',
    '$firebaseAuth',
    '$location',
    '$timeout',
    function ($scope, $firebaseAuth, $location, $timeout) {
        var auth = $firebaseAuth();

        $scope.signIn = function () {
            auth.$signInWithEmailAndPassword($scope.authform.email, $scope.authform.password).
            then(function(firebaseUser) {
                $scope.signInSuccess = "Login successful for " + firebaseUser.email;
                $timeout(function() {$location.path('/list');}, 1000);
            }).
            catch(function (error) {
                // Handle Errors here.
                $scope.signInFailure = "(" + error.code + ") " + error.message;
            });
    };
}]);

/* PatientControllers (test controllers) */
var patientControllers = angular.module('patientControllers', []);

patientControllers.controller("ListController", ['$scope', '$http', '$firebaseAuth', function ($scope, $http, $firebaseAuth) {
    $http.get('js/data.json').success(function (data) {
        $scope.patients = data;
        $scope.patientOrder = 'id';
        $scope.auth = $firebaseAuth();
    });
}]);

patientControllers.controller("DetailsController", ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    $http.get('js/data.json').success(function (data) {
        $scope.patients = data;
        $scope.whichItem = $routeParams.itemId;

        if ($routeParams.itemId > 0) {
            $scope.prevItem = Number($routeParams.itemId) - 1;
        } else {
            $scope.prevItem = $scope.patients.length - 1;
        }

        if ($routeParams.itemId < $scope.patients.length - 1) {
            $scope.nextItem = Number($routeParams.itemId) + 1;
        } else {
            $scope.nextItem = 0;
        }
    });
}]);

