function createCube(){
  const DEFAULT_SIZE = 1;
  var cursorPosition = getCursorPosition();
  var cube = BABYLON.Mesh.CreateBox('cube' + cubeCounter, DEFAULT_SIZE, scene);
  cube.x = cursorPosition.x;
  cube.y = cursorPosition.y;
  cube.z = cursorPosition.z;
  cubeCounter++;
  return cube;
}

function createSphere(){
  const DEFAULT_SIZE = 1;
  var cursorPosition = getCursorPosition();
  var cube = BABYLON.Mesh.CreateSphere('sphere' + cubeCounter, DEFAULT_SIZE, scene);
  cube.x = cursorPosition.x;
  cube.y = cursorPosition.y;
  cube.z = cursorPosition.z;
  cubeCounter++;
  return cube;
}