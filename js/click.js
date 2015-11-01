var select = false;
var popup = false;
var drawingLine = false;
var obj;


window.addEventListener("mousemove", function(){
    flag = 1;
}, false);
window.addEventListener("mouseup", function(){
    if(select){
        
    }
}, false);

//When click event is raised
window.addEventListener("click", function () {
  if(select == true){
    var pickResult = scene.pick(scene.pointerX, scene.pointerY);
    if (pickResult.hit){
      obj = pickResult.pickedMesh;
      popup=true;
      popPanel(obj);
    }
  }else{
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
  $("#line").click(function(){
    drawLine();
    select = false;
    drawingLine = true;
  });
});

window.addEventListener('keydown', function(event) {
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
}, false);