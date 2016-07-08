var myapp = angular.module('play', ['ngSanitize']);
 myapp.controller('myplay', function($scope, $http) {
	var id = window.sessionStorage.getItem("IdTopic");
	//var topicname = window.sessionStorage.getItem("TopicName");
	var url_service = window.sessionStorage.getItem("URL");
	var getMode = window.sessionStorage.getItem("Mode");
	
	$scope.question = null; // return question for view user
	$scope.getListquestion = null;
	$scope.nextquestion = 0;
	$scope.numTrue = 0;
	$scope.numFalse = 0;
	$scope.score = 0; // set score of user answer true or false;
	$scope.timeOut = 0;
	var timePlayCountdown = null;
	$scope.isNotifyData = false;
	$scope.isShowSuggest = false;
	$scope.suggest = "Gợi Ý:";
	
 
	$http.get(url_service + 'QuestionController/getQuestionById/' + id)
	.success( function(response) {

		$scope.getListquestion = response.payload.data;
		$scope.question = $scope.getListquestion[$scope.nextquestion];
		$scope.suggest = $scope.question.Suggest;
		$scope.topicName =  window.sessionStorage.getItem("TopicName");
		$scope.className =  window.sessionStorage.getItem("ClassName").replace("Lớp", "");
		$scope.timeOut();
		
		if ($scope.getListquestion.length > 0) {
			$scope.isNotifyData = false;
			//console.log('');
			
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
			$scope.suggest = $scope.question.Suggest;

		} else {
			
			$scope.question = null;
			//$scope.open();
			$scope.nextPage();
			
			
		}

	};
	
	// show, hide button suggest, when mode is exam or no.
	
	$scope.ShowButtonSuggest = function() {
		if (getMode == "Thi") {

			return false;
			
		} else if (getMode == "LuyenTap") {
			return true;
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
	
	$scope.getSuggest = function(suggest) {
		return suggest;
	}

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
    			 var fiveMinutes = 60 * 15, display = document.querySelector('#timer');
    			 startTimer(fiveMinutes, display);
    		 };
    	 }
     };
     
     //NVTien: add style for table suggest
     $scope.showSuggest = function () {
    	 $scope.isShowSuggest = !$scope.isShowSuggest;
    	 
    	 
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

});
 
 
	function tipsListener(control) {
	
		if ($('.tips').hasClass('off')) {
			$('.tips').removeClass('off');
			//animationBackground();
			$('.left_play_suggest').show();
			$('.left_play_suggest').animate({
				width: '82%',
				height: '98%',
				opacity: 1,
			}, 'slow');
		} else {
			//clearTimeout();
			$('.tips').addClass('off');
			$('.left_play_suggest').animate({
				width: '0',
				height: '0',
				opacity: 0.5,
			}, 'slow');
		}
	}
	$(function(){
		$('.left_play_suggest').hide();
	});

