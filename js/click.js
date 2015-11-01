var select = false;
var popup = false;
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
    }else{
      select = true;
    }
  });
  $("#cube").click(function(){
    drawCube();
    select = false
  });
  $("#sphere").click(function(){
    drawSphere();
    select = false
  });
  $("#cylinder").click(function(){
    drawCylinder();
    select = false
  });
  $("#cone").click(function(){
    drawCone();
    select = false
  });
  $("#line").click(function(){
    drawLine();
    select = false
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

