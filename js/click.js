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