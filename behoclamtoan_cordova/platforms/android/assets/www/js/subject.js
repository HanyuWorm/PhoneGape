var myapp = angular.module('appsubject', []);
myapp.controller('subjectcontroller', function($scope, $http) {

	$scope.listTopic = null;
	$scope.className = null;
	$scope.isNotifyData = false;
	
	var url_service = window.sessionStorage.getItem("URL");
	var Id = window.sessionStorage.getItem("ClassId");
	var className = window.sessionStorage.getItem("ClassName");

//	 var localData = JSON.parse(localStorage.getItem('subjectExamData'));
//	 if (localData != null) {
//		 loadData(localData);
//		 
//	} else {
//	
	$http.get(url_service + 'TopicController/getTopicById/' + Id)
	.success(function(response) {
		var data = JSON.stringify(response.payload.data);
		localStorage.setItem('subjectExamData', data);
		loadData(response.payload.data);	
		
		}).error(function(response, status, headers, config) {
			alert("Không lấy được dữ liệu, kiểm tra lại internet");
		});
	//}
	
	function loadData(response) {
		$scope.listTopic = response;
		if ($scope.listTopic.length > 0) {
				$scope.isNotifyData = false;
		} else {
				$scope.isNotifyData = true;
		}
	 }


	$scope.saveName = function (val) {
		window.sessionStorage.setItem("TopicName", val.TopicName);
		window.sessionStorage.setItem("TopicId", val.Id);
		window.sessionStorage.setItem("ClassId", Id);
		window.sessionStorage.setItem("ClassName", className);
		window.location='./play-topic.html';
	};

});
