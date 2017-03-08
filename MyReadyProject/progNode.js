 
function razborString(s)
{
		let mass = new Array();
		mass = s.split('&');
		let n = mass.length;
		
		let answer = new Array();
		
		for(let i = 0; i < n; i++)
		{
			let arr = new Array();
			arr = mass[i].split("=");
			let s2 = arr[1];	
			answer.push(s2);
		}	
		return answer;
}

function isNormalChar(c)
{
	let s = 'abcdefghijklmnopqrstuvwxyz0123456789';
	if(s.indexOf(c) != -1) return true;
	return false;
}

function isNormalString(s)
{
	let n = s.length;
	for(let i = 0; i < n; ++i)
	{
		let c = s.charAt(i);
		if(isNormalChar(c) == false) return false;
	}
	return true;
}

var javaURL = "http://localhost:5000/game?";


var http = require('http');
var port = 5100;
var server = http.createServer();
var request = require('request');

server.on('request', function(requestParam, response) 
{
	response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);
    response.writeHead(200);	
 
    requestParam.on('data', function(x) 
	{
        
    });
	
    requestParam.on('end', function() 
	{
        let url = requestParam.url + "";
		
		let mass = new Array();
		mass = razborString(url);

		let tip = parseInt(mass[0]);
		
		if(tip == 1)
		{
			let myLogin = mass[1];
			let myPassword = mass[2];
			
			if(myLogin == "" || myPassword == "")
			{
				response.write("EMPTY");
				response.end();
			}
			else
			if(isNormalString(myLogin) == false || isNormalString(myPassword) == false)
			{
				response.write("NOCORRECT");
				response.end();
			}
			else
			{
				let resURL = javaURL + "type=1&login=" + myLogin + "&password=" + myPassword;				
				
				request(resURL, function (x1, x2, answerString) 
				{
					  response.write(answerString + "");
					  response.end();
				});
			}
		}
		
		if(tip == 2)
		{
			let myLogin = mass[1];
			let myPassword = mass[2];
			
			if(myLogin == "" || myPassword == "")
			{
				response.write("EMPTY");
				response.end();
			}
			else
			if(isNormalString(myLogin) == false || isNormalString(myPassword) == false)
			{
				response.write("NOCORRECT");
				response.end();
			}
			else
			{
				let resURL = javaURL + "type=2&login=" + myLogin + "&password=" + myPassword;				
				
				request(resURL, function (x1, x2, answerString) 
				{
					  response.write(answerString + "");
					  response.end();
				});
			}
		}
		
    });
 
});
 
server.listen(port);