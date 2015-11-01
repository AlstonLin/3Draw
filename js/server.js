//http module is required to create a web server
var http = require('http');
//fs module is required to read file from file system
var fs = require('fs');
//url module is required to parse the URL passed to server
var url = require('url');

//create the server
http.createServer(function (request, response) {  
   //parse the pathname containing file name
   var pathname = url.parse(request.url).pathname;
   //print the name of the file for which request is made.
   //if url is http://localhost:8081/test.htm then
   //pathname will be /test.htm
   console.log("Request for " + pathname + " received.");
   //read the requested file content from file system
   fs.readFile(pathname.substr(1), function (err, data) {
      //if error occured during file read
      //send a error response to client
      //that web page is not found.
      if (err) {
         console.log(err.stack);
         // HTTP Status: 404 : NOT FOUND
         // Content Type: text/plain
         response.writeHead(404, {'Content-Type': 'text/html'});
      }else{	
         //Page found	  
         // HTTP Status: 200 : OK
         // Content Type: text/plain
         response.writeHead(200, {'Content-Type': 'text/html'});	
         // write the content of the file to response body
         response.write(data.toString());		
      }
      // send the response body 
      response.end();
   });   
}).listen(80);
// console will print the message
console.log('Server running at http://127.0.0.1:8081/');