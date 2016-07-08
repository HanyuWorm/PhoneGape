var myapp = angular.module('play-exam', ['ngSanitize']);
 myapp.controller('myplay-exam', function($scope, $http) {
	//var id = window.sessionStorage.getItem("IdTopic");
	//var topicname = window.sessionStorage.getItem("TopicName");
	var url_service = window.sessionStorage.getItem("URL");
	var getMode = window.sessionStorage.getItem("Mode");
	var Id = window.sessionStorage.getItem("TopicId");
	$scope.TopicName = window.sessionStorage.getItem("TopicName");
	
	$scope.question = null; // return question for view user
	$scope.getListquestion = null;
	$scope.nextquestion = 0;
	$scope.numTrue = 0;
	$scope.numFalse = 0;
	$scope.score = 0; // set score of user answer true or false;
	$scope.timeOut = 0;
	var timePlayCountdown = null;
	$scope.isNotifyData = false;

	$http.get(url_service + 'QuestionExamsController/getQuestionExamsById/' + Id)
	.success( function(response) {

		$scope.getListquestion = response.payload.data;
		$scope.question = $scope.getListquestion[$scope.nextquestion];
		$scope.topicName =  window.sessionStorage.getItem("TopicName");
		$scope.className =  window.sessionStorage.getItem("ClassName").replace("Lớp", "");
		
		
		if ($scope.getListquestion.length > 0) {
			$scope.isNotifyData = false;
		} else {
			$scope.isNotifyData = true;
		}

	}) .error(function(response, status, headers, config) {
		alert("Không lấy được dữ liệu, kiểm tra lại internet");
		$scope.errorMessage = "Couldn't load the list of Orders, error # " + status;
	});

	//function when user click view next question
	$scope.nextQuestion = function(answer) {
		//check condition compare if true then variable count number answer true increase 1
		//else variable count number answer false increase 1
		if ($scope.compareResult(answer) == true) {
			$scope.numTrue += 1; 
			$scope.score = $scope.score + 50; // if user answer true then increase 50 score;
			
		} else {
			$scope.numFalse += 1;
			if ($scope.score > 20) {
				$scope.score = $scope.score - 20;
			} else {
				$scope.score = 0;
			}
		}

		$scope.nextquestion += 1; // increase variable count question view for user 1
		if ($scope.nextquestion < $scope.getListquestion.length) {
			$scope.question = $scope.getListquestion[$scope.nextquestion];

		} else {
			
			$scope.question = null;
			//$scope.open();
			$scope.nextPage();
			
			
		}

	};
	
	$scope.styleSuggest = function() {
   	 var styleShow = "width: 35%";
   	 var styleHide = "width: 0%";
   	 if ($scope.isShowSuggest == true) {
			
   		 return styleShow;
		} else {
			return styleHide;
		}
   	 
    };
	
	$scope.nextPage = function() {
		if (getMode == "Thi") {

			clearInterval(timePlayCountdown);
			$scope.saveName();
			window.location='./name.html';
			
		} else if (getMode == "LuyenTap") {
			window.location='./topic.html';
		}
	};

	$scope.saveName = function () {
		var timePlay = document.getElementById('timer').innerHTML;
		var deviceId = window.sessionStorage.getItem("DeviceId");

		window.sessionStorage.setItem("Score", $scope.score);
		window.sessionStorage.setItem("Timer", timePlay);
		window.sessionStorage.setItem("DeviceId", deviceId);

		window.sessionStorage.setItem("TotalQuestion", $scope.getListquestion.length);
		window.sessionStorage.setItem("TotalAnswerTrue", $scope.numTrue);

	};
	

	//function compare result user choose and result actualy
	$scope.compareResult = function(value) {
		switch (value) {
		case "Answer_A":
			if ($scope.question.Answer_A == $scope.question.AnswerTrue) {
				return true;
				
			} else {
				return false;
			}

			break;
		case "Answer_B":
			if ($scope.question.Answer_B == $scope.question.AnswerTrue) {
				return true;
				
			} else {
				return false;
			}
			break;
		case "Answer_C":
			if ($scope.question.Answer_C == $scope.question.AnswerTrue) {
				return true;
				
			} else {
				return false;
			}

			break;
		case "Answer_D":
			if ($scope.question.Answer_D == $scope.question.AnswerTrue) {
				return true;
				
			} else {
				return false;
			}
			break;
		default :
			
			return false;
		break;
		} 

	};

     $scope.timeOut = function() {
    	 if (getMode == "Thi") {
    		 function startTimer(duration, display) {
    			 var timer = duration, minutes, seconds;
    			 timePlayCountdown = setInterval(function() {
    				 minutes = parseInt(timer / 60, 10)
    				 seconds = parseInt(timer % 60, 10);

    				 minutes = minutes < 10 ? "0" + minutes : minutes;
    				 seconds = seconds < 10 ? "0" + seconds : seconds;

    				 display.textContent = minutes + ":" + seconds;

    				 if (--timer < 0) {
    					 clearInterval(timePlayCountdown);
    					 $scope.nextPage();
    				 }
    			 }, 1000);
    		 }

    		 window.onload = function() {
    			 var fiveMinutes = 60 * 20, display = document.querySelector('#timer');
    			 startTimer(fiveMinutes, display);
    		 };
    	 }
     };
     

});
 
 

