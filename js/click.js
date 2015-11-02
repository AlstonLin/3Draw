var select = false;
var popup = false;
var drawingLine = false;
var update = false;
var obj;

$("#colours").click(function(){
  r = $("#r").val();
  g = $("#g").val();
  b = $("#b").val();
  update = true;
});

window.addEventListener("mousemove", function(){
    flag = 1;
}, false);
window.addEventListener("mouseup", function(){
    if(select){
        
    }
}, false);

//When click event is raised
window.addEventListener("click", function () {
  if(drawingLine == false){
    stopDrawLine();
  }
  if(select == true){
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    if (pickResult.hit){
      obj = pickResult.pickedMesh;
      popup=true;
      popPanel(obj);
    }
  }
  else if(update == true) {
    changeColour(obj);
    update = false;
  }
  else{
    popup = false;
    popPanel(obj);
  }

  if(drawingLine == true){
    drawLine();
  }
  
});

function popPanel(obj){
  if(popup == true){
    highlight(obj);
    $('#pop').popover('show');
  }else{
    unhighlight(obj);
    $('#pop').popover('hide');
  }
}

$(document).ready(function(){
  $("#select").click(function(){
    if(select == true){
      select = false;
      drawingLine = false;
    }else{
      select = true;
      drawingLine = false;
    }
  });
  $("#cam").click(function(){
    switchView();
    select = false;
    drawingLine = false;
  });
  $("#cube").click(function(){
    drawCube();
    select = false;
    drawingLine = false;
  });
  $("#sphere").click(function(){
    drawSphere();
    select = false;
    drawingLine = false;
  });
  $("#cylinder").click(function(){
    drawCylinder();
    select = false;
    drawingLine = false;
  });
  $("#cone").click(function(){
    drawCone();
    select = false;
    drawingLine = false;
  });
});

window.addEventListener('keydown', function(event) {
  if(select && obj != null){
    switch (event.keyCode) {
      case 87: //w -> +y
        obj.position.y += 0.1;
      break;

      case 65: //a -> +x
        obj.position.x += 0.1;
      break;

      case 83: //s -> -y
        obj.position.y -= 0.1;
      break;

      case 68: //d -> -x
        obj.position.x -= 0.1;
      break;

      case 81: //q -> +z
        obj.position.z += 0.1;
      break;

      case 69: //e -> -z
        obj.position.z -= 0.1;
      break;

      case 82: //page-up stretch
      obj.scaling.x *= 1.2;
      break;

      case 70: //page-up stretch
      obj.scaling.x *= 0.8;
      break;

      case 84: //page-up stretch
      obj.scaling.y *= 1.2;
      break;

      case 71: //page-up stretch
      obj.scaling.y *= 0.8;
      break; 

      case 89: //page-up stretch
      obj.scaling.z *= 1.2;
      break;

      case 72: //page-up stretch
      obj.scaling.z *= 0.8;
      break;

      case 49: // num key 1
      var material1 = new BABYLON.StandardMaterial("texture1", scene);
      material1.emissiveColor = new BABYLON.Color3(1, .2, .7);
      obj.material = material1;
      break;

      case 50: 
      var material1 = new BABYLON.StandardMaterial("texture1", scene);
      material1.emissiveColor = new BABYLON.Color3(.2, 1, .7);
      obj.material = material1;
      break;

      case 51: 
      var material1 = new BABYLON.StandardMaterial("texture1", scene);
      material1.emissiveColor = new BABYLON.Color3(1, .7, .2);
      obj.material = material1;
      break;

      case 52: 
      var material1 = new BABYLON.StandardMaterial("texture1", scene);
      material1.emissiveColor = new BABYLON.Color3(.7, .2, 1);
      obj.material = material1;
      break;

      case 53: 
      var material1 = new BABYLON.StandardMaterial("texture1", scene);
      material1.emissiveColor = new BABYLON.Color3(.7, 1, .2);
      obj.material = material1;
      break;
    }
  }else{
    switch (event.keyCode) {
      case 87: //w -> +y
        cursor.position.y += 0.1;
        drawLinkLines();
      break;

      case 65: //a -> +x
        cursor.position.x += 0.1;
        drawLinkLines();
      break;

      case 83: //s -> -y
        cursor.position.y -= 0.1;
        drawLinkLines();
      break;

      case 68: //d -> -x
        cursor.position.x -= 0.1;
        drawLinkLines();
      break;

      case 81: //q -> +z
        cursor.position.z += 0.1;
        drawLinkLines();
      break;

      case 69: //e -> -z
        cursor.position.z -= 0.1;
        drawLinkLines();
      break;
    }
  }
  updateServer();
}, false);

