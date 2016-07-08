var myapp = angular.module('app-week-exam', []);
 myapp.controller('controller-week-exam', function($scope, $http) {
	var id = 4;
	var url_service = window.sessionStorage.getItem("URL");
	$scope.getListTopicWeek = null;
	var Id = window.sessionStorage.getItem("ClassId");
	var className = window.sessionStorage.getItem("ClassName");
	
	 var localData = JSON.parse(localStorage.getItem('weekExamData'));
	 if (localData != null) {
		 loadData(localData);
		 
	} else {
	
	$http.get(url_service + 'TopicWeekController/getTopicWeekByClassId/' + id)
	.success( function(response) {
		var data = JSON.stringify(response.payload.data);
		localStorage.setItem('weekExamData', data);
		loadData(response.payload.data);
		
	}) .error(function(response, status, headers, config) {
		alert("Không lấy được dữ liệu, kiểm tra lại internet");
		$scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
	});
	
	}
	 
	 function loadData(response) {
		 $scope.getListTopicWeek = response;
	 }
	
	$scope.toPlay = function(val) {
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
		window.sessionStorage.setItem("TopicName", topicName);
		window.sessionStorage.setItem("IdTopic", id);
		window.sessionStorage.setItem("ClassId", Id);
		window.sessionStorage.setItem("ClassName", className);
		window.location='./play-week.html';
		
	}


});
 
 

