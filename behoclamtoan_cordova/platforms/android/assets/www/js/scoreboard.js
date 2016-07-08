
var postApp = angular.module('scoreBoard', []);

var url_service = window.sessionStorage.getItem("URL");

postApp.controller('scoreBoardController', function($scope, $http) {
	// init list scoreboard for each class, app support scoreboard class 1,2,3,4,5.
	$scope.listclass = null;
	$scope.listScoreClass = null;
	$scope.listScoreClass2 = null;
	$scope.listScoreClass3 = null;
	$scope.listScoreClass4 = null;
	$scope.listScoreClass5 = null;
	
	$scope.notifyData = true;
	$scope.notifyData2 = true;
	$scope.notifyData3 = true;
	$scope.notifyData4 = true;
	$scope.notifyData5 = true;
	
	var url_service = window.sessionStorage.getItem("URL");


	$http.get(url_service + "classController/getAllClass")
	.success(function (response) {

		$scope.listclass = response.payload.data;
		if ($scope.listclass.length > 0) {
			$scope.loadScoreBoard($scope.listclass[0].Id);
			$scope.loadScoreBoard2($scope.listclass[1].Id);
			$scope.loadScoreBoard3($scope.listclass[2].Id);
			$scope.loadScoreBoard4($scope.listclass[3].Id);
			$scope.loadScoreBoard5($scope.listclass[4].Id);
			
		}

	}).error(function(data, status, headers, config) {
		alert("Không lấy được dữ liệu, kiểm tra lại internet");
		$scope.errorMessage = "Couldn't load the list of customers, error # " + status;
	});

	
	$scope.loadScoreBoard = function(classId) {
		$http.get(url_service + 'ScoreBoardController/getScroboarByClassId/' + classId).success(function(response) {
			$scope.listScoreClass = $scope.getListDataforId(response.payload.data);
			if ($scope.listScoreClass.length > 0) {
				$scope.notifyData = false;
			}

		}).error(function(response, status, headers, config) {
			alert("Không lấy được dữ liệu, kiểm tra lại internet");
		});
	};
	
	$scope.loadScoreBoard2 = function(classId) {
		$http.get(url_service + 'ScoreBoardController/getScroboarByClassId/' + classId).success(function(response) {
			$scope.listScoreClass2 = $scope.getListDataforId(response.payload.data);
			if ($scope.listScoreClass2.length > 0) {
				$scope.notifyData2 = false;
			}

		}).error(function(response, status, headers, config) {
			alert("Không lấy được dữ liệu, kiểm tra lại internet");
		});
	};
	
	$scope.loadScoreBoard3 = function(classId) {
		$http.get(url_service + 'ScoreBoardController/getScroboarByClassId/' + classId).success(function(response) {
			$scope.listScoreClass3 = $scope.getListDataforId(response.payload.data);
			if ($scope.listScoreClass3.length > 0) {
				$scope.notifyData3 = false;
			}

		}).error(function(response, status, headers, config) {
			alert("Không lấy được dữ liệu, kiểm tra lại internet");
		});
	};
	
	$scope.loadScoreBoard4 = function(classId) {
		$http.get(url_service + 'ScoreBoardController/getScroboarByClassId/' + classId).success(function(response) {
			$scope.listScoreClass4 = $scope.getListDataforId(response.payload.data);
			if ($scope.listScoreClass4.length > 0) {
				$scope.notifyData4 = false;
			}

		}).error(function(response, status, headers, config) {
			alert("Không lấy được dữ liệu, kiểm tra lại internet");
		});
	};
	
	$scope.loadScoreBoard5 = function(classId) {
		$http.get(url_service + 'ScoreBoardController/getScroboarByClassId/' + classId).success(function(response) {
			$scope.listScoreClass5 = $scope.getListDataforId(response.payload.data);
			
			if ($scope.listScoreClass5.length > 0) {
				$scope.notifyData5 = false;
			}

		}).error(function(response, status, headers, config) {
			alert("Không lấy được dữ liệu, kiểm tra lại internet");
		});
	};
	
	$scope.getListDataforId = function (getlistScoreboard) {
	
		if (getlistScoreboard.length > 0) {
			if (getlistScoreboard.length == 1) {
				getlistScoreboard[0].levelScoreboard = "Trạng Nguyên";
				getlistScoreboard[0].index = "";
				
				getlistScoreboard[0].styleCupScore = "background: url('image/cup_gold.png') no-repeat;";
				getlistScoreboard[0].styleIndexScore = "height: 0%; width: 0%";
				
			} else if (getlistScoreboard.length == 2) {
				
				getlistScoreboard[0].levelScoreboard = "Trạng Nguyên";
				getlistScoreboard[1].levelScoreboard = "Bảng Nhãn";
				getlistScoreboard[0].index = "";
				getlistScoreboard[1].index = "";
				
				getlistScoreboard[0].styleCupScore = "background: url('image/cup_gold.png') no-repeat;";
				getlistScoreboard[0].styleIndexScore = "height: 0%; width: 0%";
				getlistScoreboard[1].styleCupScore = "background: url('image/cup_silver.png') no-repeat;";
				getlistScoreboard[1].styleIndexScore = "height: 0%; width: 0%";
				
			} else if (getlistScoreboard.length == 3) {
				getlistScoreboard[0].levelScoreboard = "Trạng Nguyên";
				getlistScoreboard[1].levelScoreboard = "Bảng Nhãn";
				getlistScoreboard[2].levelScoreboard = "Thám Hoa";
				
				getlistScoreboard[0].index = "";
				getlistScoreboard[1].index = "";
				getlistScoreboard[2].index = "";
				
				getlistScoreboard[0].styleCupScore = "background: url('image/cup_gold.png') no-repeat;";
				getlistScoreboard[0].styleIndexScore = "height: 0%; width: 0%";
				getlistScoreboard[1].styleCupScore = "background: url('image/cup_silver.png') no-repeat;";
				getlistScoreboard[1].styleIndexScore = "height: 0%; width: 0%";
				getlistScoreboard[2].styleCupScore = "background: url('image/cup_bronze.png') no-repeat;";
				getlistScoreboard[2].styleIndexScore = "height: 0%; width: 0%";
					
			} else {
				getlistScoreboard[0].levelScoreboard = "Trạng Nguyên";
				getlistScoreboard[1].levelScoreboard = "Bảng Nhãn";
				getlistScoreboard[2].levelScoreboard = "Thám Hoa";
				
				getlistScoreboard[0].index = "";
				getlistScoreboard[1].index = "";
				getlistScoreboard[2].index = "";
				
				getlistScoreboard[0].styleCupScore = "background: url('image/cup_gold.png') no-repeat;";
				getlistScoreboard[0].styleIndexScore = "height: 0%; width: 0%";
				getlistScoreboard[1].styleCupScore = "background: url('image/cup_silver.png') no-repeat;";
				getlistScoreboard[1].styleIndexScore = "height: 0%; width: 0%";
				getlistScoreboard[2].styleCupScore = "background: url('image/cup_bronze.png') no-repeat;";
				getlistScoreboard[2].styleIndexScore = "height: 0%; width: 0%";
					
				for (var i = 3; i < getlistScoreboard.length; i++) {
					getlistScoreboard[i].levelScoreboard = "Thí Sinh";
					getlistScoreboard[i].index = "" + (i + 1);
					
					getlistScoreboard[i].styleCupScore = "height: 0%; width: 0%;";
					getlistScoreboard[i].styleIndexScore = "height: 100%; width: 100%";
				}
			}
		}
		
		return getlistScoreboard;
	};


});
