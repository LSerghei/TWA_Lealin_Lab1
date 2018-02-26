var http = require('http');
var fs = require('fs');

function getQuizScript(){
	var scriptText = fs.readFileSync("./quiz.js");
	var questions = fs.readFileSync("./questions.json");
	
	scriptText = scriptText.toString().replace("var jsonQuestions;", "var jsonQuestions = " + questions);
	
	return scriptText;
}

http.createServer(function (req, res) {
    if (req.url == "/quiz.js")
	{
		res.writeHead(200, {'Content-Type': 'text/javascript'});
		res.write(getQuizScript());
	}
	else
	{
		res.writeHead(200, {'Content-Type': 'text/html'});
		res.write(fs.readFileSync("./index.html"));		
	}
		
	res.end();
}).listen(8080);