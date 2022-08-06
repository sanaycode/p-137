objects = [];
status = "";


function setup() {
  canvas = createCanvas(380, 380);
  canvas.position(580, 320);
  video = createCapture(VIDEO);
  video.size(380,380);
  video.hide();
}

function modelLoaded() {
  console.log("Model Loaded!")
  status = true;
}

function start()
{
  objectDetector = ml5.objectDetector('cocossd', modelLoaded);
  document.getElementById("status").innerHTML = "Status : Detecting Objects";
  object_wanted = document.getElementById("object_input").value;
}

function gotResult(error, results) {
  if (error) {
    console.log(error);
  }
  console.log(results);
  objects = results;
}

function draw() {
  image(video, 0, 0, 380, 380);
      if(status != "")
      {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++) {
          document.getElementById("status").innerHTML = "Status : Object Detected";
          
          fill("#FF0000");
          percent = floor(objects[i].confidence * 100);
          text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
          noFill();
          stroke("#FF0000");
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);

         
          if(objects[i].label == object_wanted)
          {
            video.stop();
            objectDetector.detect(modelLoaded);
            document.getElementById("is_objct_fnd").innerHTML = object_wanted + " Found";
            synth = window.speechSynthesis;
            utterThis = new SpeechSynthesisUtterance(object_wanted + "Found");
            synth.speak(utterThis);
          }
          else
          {
            document.getElementById("is_objct_fnd").innerHTML = object_wanted + " Not Found";
          }          
         }
      }
}
