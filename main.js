video = "";
status_ = "";
objects = [];
mute = 0;

function preload() {
 video = createVideo("video.mp4"); 
 video.hide();   
}

function setup() {
    canvas = createCanvas(500,500);
    canvas.center();
}

function start() {
    objectDetection = ml5.objectDetector("cocossd",modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting...";
}

function modelLoaded() {
    console.log("cocossd is initialized!!");
    status_ = true;
    video.loop();
    video.speed(1);
    video.volume(mute);
}

function gotResult(error, results) {
  if (error) {
      console.log(error);
  }
  else{
      console.log(results);
      objects = results;
  }    

}



function draw() {
    image(video,0,0,500,500);
    
     if (status_ != "") {
         objectDetection.detect(video,gotResult);
        for ( i = 0; i < objects.length; i++) {
         document.getElementById("status").innerHTML = "Status : Objects Detected"  
         document.getElementById("noofobjects").innerHTML = "Objects Detected = "+ objects.length; 
        
         fill("#FF0000");
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label + percent + "%", objects[i].x + 15, objects[i].y +15 );
         noFill();
         stroke("#FF0000");
         rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
        }
     }
    }

