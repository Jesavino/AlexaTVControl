var http = require("http");
var server = http.createServer(function(request, response) {
	console.log("Request on server from: " + request.url);
	
	// chrome sends a favicon.ico request. We want to ignore that
	if ( request.url === '/favicon.ico') {
		response.end();
		return;
	}
	
	if (request.method == 'POST') {
		request.on('data', function (data) {
			
		if (data == 'ON') {
			// spawn the child process 
			var spawn = require('child_process').spawn, 
			ls = spawn('sh', ['/path/to/NodeServer/tv_on.sh']);

			ls.stdout.on('data', function(data) {
				console.log('stdout: ' + data);
			});

			ls.stderr.on('data', function(data) {
				console.log('stdout: ' + data);
			});

			ls.on('close', function(code) {
				console.log('child process exited with code: ' + code);
			});

			response.end();
			console.log("Server listening again:");
		}
		else {
			
			var spawn = require('child_process').spawn, 
			ls = spawn('sh', ['/path/to/NodeServer/tv_off.sh']);

			ls.stdout.on('data', function(data) {
				console.log('stdout: ' + data);
			});

			ls.stderr.on('data', function(data) {
				console.log('stdout: ' + data);
			});

			ls.on('close', function(code) {
				console.log('child process exited with code: ' + code);
			});
			response.end();
		}
		});
	}

});

server.listen(8080);
console.log("Server is listening");
