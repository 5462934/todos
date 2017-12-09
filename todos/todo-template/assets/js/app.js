angular.module('app', [])
  .controller('main', ['$scope', function ($scope) {
    $scope.valList = [];
    $scope.valDown = function (e) {
      if (e.keyCode == 13) {
        if($scope.val) {
          $scope.valList.push({
            name: $scope.val,
            isCompleted: false
          });
        }
        window.localStorage.setItem('memory', JSON.stringify($scope.valList));
        $scope.val = '';
      }
    }

    $scope.unCompletedTaskNums = function () {
      var nums = 0;
      for (var i = 0; i < $scope.valList.length; i++) {
        if (!$scope.valList[i].isCompleted) {
          nums++;
        }
      }
      return nums;
    }
    
  }])