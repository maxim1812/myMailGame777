
var myUrl = "http://localhost:5100/?";

window.onload = function()
{
	localStorage.removeItem("login");
	localStorage.removeItem("password");
}

function myQueryRegistration(script)
{
	var r = new XMLHttpRequest();
	r.open("POST",script);
	r.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
	r.send(null);
	r.onreadystatechange = function()
	{
		if(r.readyState === 4 && r.status === 200) 
		{
			let s = r.responseText + "";
			if(s == 'YES') document.getElementById('answer').innerHTML = "Регистрация прошла успешно.";
			if(s == 'NO') document.getElementById('answer').innerHTML = "Ошибка. Такой пользователь уже есть в БД.";
			if(s == 'EMPTY') document.getElementById('answer').innerHTML = "Ошибка. Поле ввода пусто.";
			if(s == 'NOCORRECT') document.getElementById('answer').innerHTML = "Ошибка. Некорректный ввод.";
		}
	}
}

function myQueryAvtorization(script)
{
	var r = new XMLHttpRequest();
	r.open("POST",script);
	r.setRequestHeader("Content-Type","text/plain;charset=UTF-8");
	r.send(null);
	r.onreadystatechange = function()
	{
		if(r.readyState === 4 && r.status === 200) 
		{
			let s = r.responseText + "";
			if(s == 'YES')
			{
				goToMyProfileMode(document.getElementById('textLogin').value, document.getElementById('textPassword').value);
			}
			if(s == 'NO') document.getElementById('answer').innerHTML = "Ошибка. Неверный логин или пароль.";
			if(s == 'EMPTY') document.getElementById('answer').innerHTML = "Ошибка. Поле ввода пусто.";
			if(s == 'NOCORRECT') document.getElementById('answer').innerHTML = "Ошибка. Некорректный ввод.";
		}
	}
}


function regF()
{
	let textLogin = document.getElementById('textLogin').value + "";
	let textPassword = document.getElementById('textPassword').value + "";
	myQueryRegistration(myUrl + "t=" + 1 + "&x=" + textLogin + "&y=" + textPassword);
}

function goF()
{
	let textLogin = document.getElementById('textLogin').value + "";
	let textPassword = document.getElementById('textPassword').value + "";
	myQueryAvtorization(myUrl + "t=" + 2 + "&x=" + textLogin + "&y=" + textPassword);
}

function goToMyProfileMode(login,password)
{
	document.getElementById('myTitle').innerHTML = "Мой профиль";
	document.getElementById('myHeader').innerHTML = "Мой профиль";
	document.getElementById('box1').innerHTML = "<h2>Пользователь: " + login + "</h2><br>" ;
	localStorage.setItem("login",login + "");
	localStorage.setItem("password",password + "");
}
