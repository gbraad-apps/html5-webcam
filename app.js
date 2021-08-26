var video = document.querySelector("#videoElement");

const constraints = {
  'audio': {'echoCancellation': true},
  'video': {
      'width': {'min': 1920},
      'height': {'min': 1080}
      }
  }

if (navigator.mediaDevices.getUserMedia) {       
	navigator.mediaDevices.getUserMedia(constraints)
  .then(function(stream) {
    video.srcObject = stream;
  })
  .catch(function(error) {
    console.log("Something went wrong!");
  });
}