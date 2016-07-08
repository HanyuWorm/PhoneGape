var myapp = angular.module('appMode', []);

myapp.controller('ModeController', function($scope, $http){

	$scope.nextPage = function(value) {
		switch (value) {
		case "Luyentap":
			window.location='./topic.html';
			window.sessionStorage.setItem("Mode", "LuyenTap");
			break;
		case "Thi":
			window.location='./chooseclass.html';
			window.sessionStorage.setItem("Mode", "Thi");
			break;

		}
	}

});

