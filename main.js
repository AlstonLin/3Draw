var main = function() {

  var CANVAS = document.getElementById("your_canvas");

  CANVAS.width = window.innerWidth;
  CANVAS.height = window.innerHeight;

  /*========================= GET WEBGL CONTEXT ========================= */
  var GL;
  try {
    GL = CANVAS.getContext("experimental-webgl", {antialias: false});
  } catch (e) {
    alert("Your browser is not WebGL Compatible")
    return false;
  }
 /*========================= SHADERS ========================= */
  var vertexSource = "\n\
    attribute vec2 position; //the position of the point\n\
    void main(void) { //pre-built function\n\
    gl_Position = vec4(position, 0., 1.); //0. is the z, and 1 is w\n\
    }";


  var fragmentSource = "\n\
    precision mediump float;\n\
    \n\
    \n\
    \n\
    void main(void) {\n\
    gl_FragColor = vec4(0.,0.,0., 1.); //black color\n\
    }";

  var getShader = function(source, type, typeString) {
    var shader = GL.createShader(type);
    GL.shaderSource(shader, source);
    GL.compileShader(shader);
    if (!GL.getShaderParameter(shader, GL.COMPILE_STATUS)) {
      alert("ERROR IN " + typeString + " SHADER : " + GL.getShaderInfoLog(shader));
      return false;
    }
    return shader;
  };

  var shaderVertex = getShader(vertexSource, GL.VERTEX_SHADER, "VERTEX");
  var shaderFragment = getShader(fragmentSource, GL.FRAGMENT_SHADER, "FRAGMENT");
  var SHADER_PROGRAM = GL.createProgram();
  GL.attachShader(SHADER_PROGRAM, shaderVertex);
  GL.attachShader(SHADER_PROGRAM, shaderFragment);
  GL.linkProgram(SHADER_PROGRAM);
  var _position = GL.getAttribLocation(SHADER_PROGRAM, "position");
  GL.enableVertexAttribArray(_position);
  GL.useProgram(SHADER_PROGRAM);

  /*========================= THE TRIANGLE ========================= */
  //POINTS :
  var triangle_vertex = [
    -1,-1, //first summit -> bottom left of the viewport
    1,-1, //bottom right of the viewport
    1,1,  //top right of the viewport
  ];

  var TRIANGLE_VERTEX = GL.createBuffer ();
  GL.bindBuffer(GL.ARRAY_BUFFER, TRIANGLE_VERTEX);
  GL.bufferData(GL.ARRAY_BUFFER,
  new Float32Array(triangle_vertex),
  GL.STATIC_DRAW);

    //FACES :
  var triangle_faces = [0,1,2];
  var TRIANGLE_FACES = GL.createBuffer ();
  GL.bindBuffer(GL.ELEMENT_ARRAY_BUFFER, TRIANGLE_FACES);
  GL.bufferData(GL.ELEMENT_ARRAY_BUFFER, new Uint16Array(triangle_faces), GL.STATIC_DRAW);



  /*========================= DRAWING ========================= */
  GL.clearColor(0.0, 0.0, 0.0, 0.0);

  var animate = function() {
    GL.viewport(0.0, 0.0, CANVAS.width, CANVAS.height);
    GL.clear(GL.COLOR_BUFFER_BIT);
    GL.flush();
    window.requestAnimationFrame(animate);
  };

  animate();
};