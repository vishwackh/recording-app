mainApp.controller("recordController",['$scope','recordService', function ($scope, recordService) {

	var onFail = function(e) {
		console.log('Rejected!', e);
	};

	var onSuccess = function(s) {
		var context = new AudioContext();
		var mediaStreamSource = context.createMediaStreamSource(s);
		recorder = new Recorder(mediaStreamSource);
		recorder.record();

				// audio loopback
				// mediaStreamSource.connect(context.destination);
			}

			window.URL = window.URL || window.webkitURL;
			navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

			var recorder;
			var audio = document.querySelector('audio');

			$scope.startRecording =  function() {
				if (navigator.getUserMedia) {
					navigator.getUserMedia({audio: true}, onSuccess, onFail);
				} else {
					console.log('navigator.getUserMedia not present');
				}
			}

			$scope.stopRecording =  function () {
				recorder.stop();
				recorder.exportWAV(function(s) {
					audio.src = window.URL.createObjectURL(s);
					$scope.blob = s;
					console.log($scope.blob);
					
				});
			}
			$scope.save =  function () {
			$scope.fileName;
			
			var promise = recordService.uploadData($scope.fileName, $scope.blob);
			promise.then(function(success){
				console.log('success');
			}, function(error){
				console.log('error');
			});
			
			}
	
}]);