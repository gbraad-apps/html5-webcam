var video = document.querySelector("#videoElement");
var selector = document.querySelector("#selector");
var selection = document.querySelector("#selection");
var videoSourcesSelect = document.getElementById("video-source");
var audioSourcesSelect = document.getElementById("audio-source");

videoSourcesSelect.appendChild(new Option());
audioSourcesSelect.appendChild(new Option());

if (navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices
    .enumerateDevices()
    .then((devices) => {
      devices.forEach((device) => {
        console.log(device);

        let option = new Option();
        option.value = device.deviceId;

        switch (device.kind) {
          // Append device to list of Cameras
          case "videoinput":
            option.text = device.label || `Camera ${videoSourcesSelect.length}`;
            videoSourcesSelect.appendChild(option);
            break;
          // Append device to list of Microphone
          case "audioinput":
            option.text =
              device.label || `Microphone ${videoSourcesSelect.length}`;
            audioSourcesSelect.appendChild(option);
            break;
          default:
            break;
        }
      });
    })
    .catch(function (e) {
      console.log(e.name + ": " + e.message);
    });
}

selection.onclick = function () {
  selector.style.visibility = "hidden";
  selector.style.display = "none";
  video.style.visibility = "visible";

  const audioSource = audioSourcesSelect.value;
  const videoSource = videoSourcesSelect.value;
  const constraints = {
    audio: {
      deviceId: audioSource ? { exact: audioSource } : undefined,
      echoCancellation: true
    },
    video: {
      deviceId: videoSource ? { exact: videoSource } : undefined,
      width: { min: 1920 },
      height: { min: 1080 }
    }
  };

  navigator.mediaDevices
    .getUserMedia(constraints)
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (error) {
      console.log("Something went wrong!");
    });
};
