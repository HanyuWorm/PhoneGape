var myapp = angular.module('history', []);
 myapp.controller('getHistory', function($scope, $http) {
	 $scope.listHistory = null;
	 var statusShow = false; //init status of layout showdetails history
	 var deviceId = window.sessionStorage.getItem("DeviceId");
	 var url_service = window.sessionStorage.getItem("URL");
	 $scope.notifyData = true;
	 
//	 var localData = JSON.parse(localStorage.getItem('historyData'));
//	 if (localData != null) {
//		 loadData(localData);
//		 
//	} else {
	 
		$http.get(url_service + 'HistoryController/getHistoryByDeviceId/' + deviceId)
		.success(function (response) {
			var data = JSON.stringify(response.payload.data);
			localStorage.setItem('historyData', data);
			loadData(response.payload.data);
			
		}).error(function(data, status, headers, config) {
			alert("Không lấy được dữ liệu, kiểm tra lại internet");
			$scope.errorMessage = "Couldn't load the list of customers, error # " + status;
		});
		
	//}

		 function loadData(response) {
			
			$scope.listHistory = response;
			if ($scope.listHistory.length > 0) {
				$scope.notifyData = false;
				for (var i = 0; i < $scope.listHistory.length; i++) {
					$scope.listHistory[i].status = statusShow;  //add status into list history
				}
			} 
			
			//alert("deviceId = " + deviceId + " list = " + $scope.listHistory.length);
			
			$scope.expand = function(vote) {
				   
			       $scope.styleDetails(vote);
			       $scope.styleTopHeader(vote);
			       $scope.styleDetailHeader(vote);
			       vote.status = !vote.status;
			    }

			$scope.styleDetails = function(vote) {
				var style1 = "height: 85%";
				var style2 = "height: 20%";
				if(vote.status == true){
					return style1; 
				} else {
					return style2; 
				}


			}
			
			$scope.styleTopHeader= function(vote) {
				var style1 = "height: 30%";
				var style2 = "height: 95%";
				if(vote.status == true){
					return style1; 
				} else {
					return style2; 
				}


			}
			
			$scope.styleDetailHeader = function(vote) {
				var style1 = "height: 67%";
				var style2 = "height: 0%";
				if(vote.status == true){
					return style1; 
				} else {
					return style2; 
				}


			}
			
		};

});

