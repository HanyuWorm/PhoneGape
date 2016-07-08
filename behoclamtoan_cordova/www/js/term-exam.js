var myapp = angular.module('app-term-exam', []);
 myapp.controller('controller-term-exam', function($scope, $http) {
	
	var url_service = window.sessionStorage.getItem("URL");
	$scope.getListTopicExams = null;
	var Id = window.sessionStorage.getItem("ClassId");
	var className = window.sessionStorage.getItem("ClassName");

	var localData = JSON.parse(localStorage.getItem('termExamData'));
	 if (localData != null) {
		 loadData(localData);
		 
	} else {

	$http.get(url_service + 'TopicExamsController/getTopicExamsByClassId/' + Id)
	.success( function(response) {
		var data = JSON.stringify(response.payload.data);
		localStorage.setItem('termExamData', data);
		loadData(response.payload.data);
	
	}) .error(function(response, status, headers, config) {
		alert("Không lấy được dữ liệu, kiểm tra lại internet");
		$scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
	});
	}
	
	function loadData(response) {
		 $scope.getListTopicExams = response;
	 }

	$scope.toPlay = function(val, val2) {
		var id = "";
		var topicName = "";
		if (val.length > 1) {
			for (var i = 0; i < val.length; i++) {
				if (i==0) {
					id = val[0].TopicWeekId;
					topicName = val[0].TopicName;
				} else {
					id = id + "-" + val[i].TopicWeekId;
					topicName = topicName + "-" + val[i].TopicName;
				} 
			}
		} else {
			id = val[0].TopicWeekId;
			topicName = val[0].TopicName;
		}
		window.sessionStorage.setItem("TopicName", val2.Name);
		window.sessionStorage.setItem("TopicId", id);
		window.sessionStorage.setItem("ClassId", Id);
		window.sessionStorage.setItem("ClassName", className);
		window.location='./play-exam.html';
		
	}
	
});
 
 

