var myapp = angular.module('topic', []);
myapp.controller('getTopic', function($scope, $http) {

	$scope.listclass = null;
	$scope.listTopic = null;
	$scope.listOfTopic = null;
	$scope.className = null;
	$scope.isNotifyData = false;
	var url_service = window.sessionStorage.getItem("URL");

//	var localData = JSON.parse(localStorage.getItem('chooseClassData'));
//	 if (localData != null) {
//		 loadData(localData);
//		 
//	} else {
	
	$http.get(url_service + "classController/getAllClass")
	.success(function (response) {
		var data = JSON.stringify(response.payload.data);
		localStorage.setItem('chooseClassData', data);
		loadData(response.payload.data);

	}).error(function(data, status, headers, config) {
		alert("Không lấy được dữ liệu, kiểm tra lại internet");
		
	});
	//}
	
	 function loadData(response) {
		 $scope.listclass = response;

			if ($scope.listclass.length > 0) {
				$scope.idClass = $scope.listclass[3].Id;
				$scope.className = $scope.listclass[3].Name;
				loadTopic($scope.idClass);
			}
	 }

	$scope.selectTopic = function(val) {

		$scope.idClass = val.Id;
		$scope.className = val.Name;
//		var localTopicData = JSON.parse(localStorage.getItem('topicData' + $scope.idClass));
//		if (localTopicData != null) {
//			loadDataTopic(localTopicData);
//			
//		} else {
		loadTopic($scope.idClass);
		
		//}
	};
	
	 function loadTopic(classId) {
		$http.get(url_service + 'TopicController/getTopicById/' + $scope.idClass)
		.success(function(response) {
			
		//var data = JSON.stringify(response.payload.data);
		//localStorage.setItem('topicData' + classId, data);	
		loadDataTopic(response.payload.data);	
		
		}).error(function(response, status, headers, config) {
			//alert("Không lấy được dữ liệu, kiểm tra lại internet");
		});
	};
	
	function loadDataTopic(response) {
		
		$scope.listOfTopic = response;
		if ($scope.listOfTopic.length > 0) {
			$scope.isNotifyData = false;
		} else {
			$scope.isNotifyData = true;
		}
	}

	$scope.saveName = function (val) {
		window.sessionStorage.setItem("TopicName", val.TopicName);
		window.sessionStorage.setItem("IdTopic", val.Id);
		window.sessionStorage.setItem("ClassId", val.ClassId);
		window.sessionStorage.setItem("ClassName", $scope.className);
		window.location='./play.html';
	};

});
