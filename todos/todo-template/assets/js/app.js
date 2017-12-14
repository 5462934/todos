angular.module('app', [])
  .controller('main', ['$scope', function ($scope) {
    // 创建任务列表
    $scope.valList = [];
    // 从本地取出存入数据
    if (localStorage.getItem('valList')) {
      // 保存到任务列表
      $scope.valList = angular.fromJson(localStorage.getItem('valList'));
    }
    $scope.valDown = function (e) {
      // 如果用户敲击回车
      if (e.keyCode == 13) {

        // 将输入内容添加到任务列表中
        if($scope.val) {
          $scope.valList.push({
            name: $scope.val,
            isCompleted: false,// 任务当前是否完成
            isEditing: false,// 当前任务是否处于可编辑状态
          });
        }

        // 清空文本框
        $scope.val = '';
      }
    }

    // 统计未完成任务
    $scope.unCompletedTaskNums = function () {
      var nums = 0;
      for (var i = 0; i < $scope.valList.length; i++) {
        if (!$scope.valList[i].isCompleted) {
          nums++;
        }
      }
      return nums;
    }
    
    // 双击标签进行修改任务
    $scope.modifyListName = function (val) {
      
      for (var i = 0; i < $scope.valList.length; i++) {

        $scope.valList[i].isEditing = false;

      }

      // 将当前任务设置成可编辑状态
      val.isEditing = true;
    }
    // 保存修改任务名称
    $scope.saveListName = function (val) {
      val.isEditing = false;
    }

    // 筛选已完成、正在进行中的任务
    $scope.condition = '';
    $scope.filterTask = function (type) {
      switch (type) {
        case 'All':
          $scope.condition = '';
          break;
        case 'Active':
          $scope.condition = 'false';
          break;
        case 'Completed':
          $scope.condition = 'true';
          break;
      }
    }

    // 清空完成任务
    $scope.clearCompleted = function () {
      for (var i = 0; i < $scope.valList.length; i++) {
        if ($scope.valList[i].isCompleted) {
          $scope.valList.splice(i, 1);
        }
      }
    }


    // 本地存储插入数据
    $scope.$watch('valList', function (newValue, oldValue) {
      localStorage.setItem('valList', angular.toJson($scope.valList))
    }, true);
  }])