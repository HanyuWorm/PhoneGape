var myapp = angular.module('appModeExams', []);

myapp.controller('ModeControllerExams', function($scope, $http){
	var ClassId = window.sessionStorage.getItem("ClassId");

	$scope.nextPage = function(value) {
		switch (value) {
		case "ThiTuan":
			window.location='./week-exam.html';
			window.sessionStorage.setItem("ClassId", ClassId);
			break;
		case "ThiHocKy":
			window.location='./term-exam.html';
			window.sessionStorage.setItem("ClassId", ClassId);
			break;
		case "ThiTheoChuDe":
			window.location='./subject.html';
			window.sessionStorage.setItem("ClassId", ClassId);
			break;

		}
	}

});

