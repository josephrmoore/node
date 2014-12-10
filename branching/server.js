var http = require('http'),
    fs = require('fs'),
    Action = require('./Action');

function render(filename){
	fs.readFile('./'+filename+'.html', function (err, html) {
	    if (err) {
	        throw err; 
	    }       
	    http.createServer(function(request, response) {  
	        response.writeHeader(200, {"Content-Type": "text/html"});  
	        response.write(html);  
	        response.end();  
	    }).listen(8000);
	});	
}

render("index");