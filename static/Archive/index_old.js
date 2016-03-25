'use strict'; 
const http = require('http');
const url = require('url'); 
const fs = require('fs'); 
const path = require('path')
const express = require('express');
var app = express();

let mimes = {

	'.htm': 'text/html', 
	'.css': 'text/css', 
	'.js': 'text/javascript',
	'gif': 'image/jpeg', 
	'jpg': 'image/jpg',
	'png': 'image/png'

}


app.set('port', process.env.PORT || 3000);

function webserver(req, res) {
	// if the route requested is '/', then load 'index.hml' or else 
	// load the requested file(s)

	let baseURI = url.parse(req.url); 
	let filepath = __dirname + (baseURI.pathname == '/' ? '/index.htm': baseURI.pathname); 
	// Check if the requested file is accessible or not
	fs.access(filepath, fs.F_OK, error => {
		if(!error){
			// Read and serve the file over response
			fs.readFile(filepath, (error, content) => {
					if(!error){
						console.log('Serving: ', filepath); 
						// Resolve the content type
						let contentType = mimes[path.extname(filepath)]; 
						res.writeHead(200,{'Content-type': contentType});
						res.end(content, 'utf-8');
						// Serve the file from the buffer 
					} else {
						// Serve a 500
						res.writeHead(500); 
						res.end('The server could not read the file requested.');
					}
				});
		} else {
			// Serve a 404
			res.writeHead(404);
			res.end('Content not found!'); 
		}
	}); 

}

http.createServer(webserver).listen(app.get('port'),'0.0.0.0', () => {

	console.log('Webserver running on port ' + app.get('port')); 

});