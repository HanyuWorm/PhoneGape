var myapp = angular.module('appHome', []);

myapp.controller('homeController', function($scope, $http){
	
	$scope.nextPage = function(value){
		
		//window.sessionStorage.setItem("URL", "http://192.168.10.105:8088/ServiceBeHocLamToan/");
		window.sessionStorage.setItem("URL", "http://107.161.20.205:8080/ServiceBeHocLamToan/");
		switch (value) {
		case "modePage":
			if ($scope.checkInternet() == true) {
				window.location='./mode.html';
			} else {
				alert("Không có kết nối Internet!");
			}

			break;
		case "lichSu":
			if ($scope.checkInternet() == true) {
				window.location='./history.html';
			} else {
				alert("Không có kết nối Internet!");
			}

			break;
		case "scoreBoard":
			if ($scope.checkInternet() == true) {
				window.location='./scoreboard.html';
			} else {
				alert("Không có kết nối Internet!");
			}

			break;	

		}
		
	}
	document.addEventListener("deviceready", onDeviceReady, false);
	document.addEventListener("online", onOnline, false);				
	$scope.checkInternet = function onDeviceReady() {
		return onOnline();
	}
	
	function onOnline() {
    // Handle the online event
	var networkState = navigator.connection.type;
    if (networkState !== Connection.NONE) {      
		//alert("Có internet ");        
			return true;      
		
    } else {
		//alert("Không có internet "); 
		return false;
	}
	}
	

});

