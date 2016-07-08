var myapp = angular.module('appChooseClass', []);
myapp.controller('ChooseClassController', function($scope, $http) {

	$scope.listclass = null;
	$scope.listTopic = null;
	$scope.listOfTopic = null;
	$scope.className = null;
	$scope.isNotifyData = false;
	var url_service = window.sessionStorage.getItem("URL");

	var localData = JSON.parse(localStorage.getItem('chooseClassData'));
	 if (localData != null) {
		 loadData(localData);
		 
	} else {
	
	$http.get(url_service + "classController/getAllClass").success(
			function(response) {
				var data = JSON.stringify(response.payload.data);
				localStorage.setItem('chooseClassData', data);
				loadData(response.payload.data)

			}).error(function(data, status, headers, config) {
				alert("Không lấy được dữ liệu, kiểm tra lại internet");

	});
	
	}
	
	function loadData(response) {
		$scope.listclass = response;

		if ($scope.listclass.length > 0) {
			$scope.isNotifyData = false;
		} else {
			$scope.isNotifyData = true;
		}
	}

	$scope.toSubjectPage = function(val) {
		window.sessionStorage.setItem("ClassId", val.Id);
		window.sessionStorage.setItem("ClassName", val.Name);
		window.location = './mode_exams.html';
	};

});
