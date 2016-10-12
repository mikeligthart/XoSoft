/**
 * Created by Mike on 12-10-2016.
 */
var xoSoftApp = angular.module('xoSoftApp', [
    'ngRoute',
    'firebase',
    'authControllers',
    'patientControllers'
]);

xoSoftApp.config(['$routeProvider', function ($routeProvider) {
    $routeProvider.when('/auth/signup', {
        templateUrl: 'partials/auth/signUp.html',
        controller: 'SignUpController'
    }).when('/auth/signin', {
        templateUrl: 'partials/auth/signIn.html',
        controller: 'SignInController'
    }).when('/list', {
        templateUrl: 'partials/list.html',
        controller: 'ListController'
    }).when('/details/:itemId', {
        templateUrl: 'partials/details.html',
        controller: 'DetailsController'
    }).otherwise({
        redirectTo: '/auth/signin'
    });
}]);

xoSoftApp.run(['$rootScope', '$location', '$firebaseAuth', function ($rootScope, $location, $firebaseAuth) {
    $rootScope.$on('$routeChangeStart', function (event) {
        var auth = $firebaseAuth();
        var user = auth.$currentUser;
        var location = $location.path();
        if (user || location.indexOf('auth') != -1) {
            console.log('ALLOW');
        } else {
            console.log('DENY : Redirecting to Login');
            event.preventDefault();
            $location.path('/auth/signin');
        }
    });
}]);