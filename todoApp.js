angular.module('ToDoApp',[])

.controller('FirstController', function($scope, ToDoFactory){

	$scope.todoList=ToDoFactory.get();
	var uid=0;
	var originalValue ;
	$scope.createToDo = function($event){
			if($event.keyCode===13){
				var todo ={
					id:uid++,
					text: $scope.todoText,
					isCompleted:false
				}
				$scope.todoList.push(todo);
				console.log($scope.todoList);
				$scope.todoText='';
			}

	}

	$scope.editEvent = function(todo){
				todo.isEditMode=true;
				 originalValue =todo.text;
		}

		$scope.saveEvent = function(todo){
				todo.isEditMode=false;
		}
		$scope.cancelEvent = function(todo){
				todo.text=originalValue;
				todo.isEditMode=false;
		}

		$scope.deleteEvent = function(todo){
				if(todo.isCompleted){
					$scope.todoList.splice($scope.todoList.indexOf(todo),1);
				}else{
					if(confirm("Are you sure ?")){
						deleteEventConfirmation($scope.todoList.indexOf(todo));						
					}
				}
		}

		$scope.deleteEventIndex = function(todo,$index){
				$scope.todoList.splice($index,1);
		}

		function deleteEventConfirmation($index){
				$scope.todoList.splice($index,1);
		}

})

.controller('SecondController', function($scope, ToDoFactory){
	$scope.todoList = ToDoFactory.get();
})

.factory('ToDoFactory', function(){
	var todoList=[];
		return {
			get:function (){
				return todoList;
			}
		}
})
