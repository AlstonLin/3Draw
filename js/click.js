var select = true;
var drag = false;
window.addEventListener("mousedown", function(){
  drag = false;
});
window.addEventListener("mousemove", function(){
    flag = 1;
}, false);
window.addEventListener("mouseup", function(){
    if(select && !drag){
        //TODO: INSERT CODE TO SELECT A SHAPE
    }
}, false);
$(document).ready(function(){
  $("#select").click(function(){
    select = true;
  });
  $("#cube").click(function(){
    drawCube();
  });
  $("#sphere").click(function(){
    drawSphere();
  });
  $("#cylinder").click(function(){
    drawCylinder();
  });
  $("#cone").click(function(){
    drawCone();
  });
  $("#line").click(function(){
    drawLine();
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