var myapp = angular.module('saveInfo', []);
myapp.controller('myGetUserName', function($scope, $http) {
	
	$scope.score = window.sessionStorage.getItem("Score");
	var getTimePlay = window.sessionStorage.getItem("Timer");
	$scope.timePlay = convertTimeToSeconds(getTimePlay);
	var url_service = window.sessionStorage.getItem("URL");
	

	function convertTimeToSeconds(timeplay) {

		var second = 0;
		var res = timeplay.split(":");
		var minute = parseInt(res[0]);
		var second = parseInt(res[1]);
		var totalSecond = (minute * 60) + second;
		var secondPlay = (20 * 60) - totalSecond;

		return secondPlay;
	}
	


	$scope.nextPage = function(name) {
		if (name != null && name != "") {
			$scope.saveData();
			
		} else {
			alert("Mời bạn nhập tên!");
		}
		
	};

	$scope.saveData = function() {
		localStorage.setItem('isRefreshHistory', true);
		var name = $scope.getUserName();
		var classId = window.sessionStorage.getItem("ClassId");
		var className = window.sessionStorage.getItem("ClassName");
		var deviceId = window.sessionStorage.getItem("DeviceId");
		var totalQuestion = window.sessionStorage.getItem("TotalQuestion");
		var totalAnswerTrue = window.sessionStorage.getItem("TotalAnswerTrue");
		var topic = window.sessionStorage.getItem("TopicName");
		
		$http({
			method : 'POST',
			url     : url_service + 'ScoreBoardController/saveData',
				data : {
					Name: name,
					Score: $scope.score,
					TimePlay: $scope.timePlay,
					ClassId: classId,
					ClassName: className,
					DeviceId: deviceId,
					TotalQuestion: totalQuestion,
					TotalAnswerTrue: totalAnswerTrue,
					Topic: topic

				}

		})
		.success( function(response) {
			window.location='./mode_exams.html';

		}) .error(function(response, status, headers, config) {
			//alert("Can not connect db");
			alert("Kiểm tra lại internet");
		});
	};
	
	
	$scope.getUserName = function () {
		
		return $scope.userName;
		
	};
	
});
