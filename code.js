var num=0;
var result = [];
var QA=[];


//start the quiz (move the div to the right)
function start(){
	randomizeQA();
	document.getElementById("home").style.right = "-600px";
	setTimeout(ShowQuestion, 500);
}


//randomize the questions
function randomizeQA(){
	var QAData=[["Portugal","Porto","Lisbon","Coimbra","Braga","b"],
	["Germany","Berlin","Munich","Hamburg","Frankfort","a"],
	["United Kingdom","Glasgow","Manchester","Belfast","London","d"],
	["Austria","Salzburg","Linz","Vienna","Innsbruck","c"],
	["Italy","Venice ","Rome","Milan","Florence","b"],
	["Ireland","Galway","Cork","Limerick","Dublin","d"],
	["France","Paris","Lyon","Marseille","Nice","a"],
	["Spain","Barcelona","Madrid","Valencia","Seville","b"],
	["Switzerland","Zurich","Geneva","Bern","Basel","c"],
	["Finland", "Helsinki","Tampere","Oulu","Turku","a"]
	];
	var QAData_Copy = QAData;
	var min,max,RandomIndex;

	min = 0;

	for(var i= QAData.length-1;i>=0;i--){
		max = QAData_Copy.length;
		RandomIndex = parseInt(Math.random() * (max-min) + min );
		QA[i] = QAData_Copy[RandomIndex];
		
		QAData_Copy.splice(RandomIndex, 1);
		
	}

}


//go to the next question 
function NextQ(){
	var element = document.getElementById("MyDiv");
	//bring the question div on screen(left to middle)
	if(element.classList == "hide"){
		ShowQuestion();
		
	}
	//remove current question from screen(middle to left) and save th answer,and bring new question
	else{
		GetResult();
		setTimeout(ShowQuestion, 500);
	}

}


// push the answer of question to an array 
function GetResult(){
	var element = document.getElementById("MyDiv");
	element.classList.remove("show");

	element.classList.add("hide");
	var rad = document.getElementsByTagName("input");
	for(var i = 0; i < rad.length; i++) {
		if(rad[i].checked){
			result.push(rad[i].value);
			
		}
	}
	
}


// show the new question or result
function ShowQuestion(){
	if(num == QA.length){
		clacResult();
	}
	else{

		var element = document.getElementById("MyDiv");
		element.classList.remove("hide");
		element.classList.add("show");
		document.getElementById("nextButton").disabled = true;
		AddQuestion();
		num+=1;
	}
}


// by choosing a answer,next button activate
function Answer(){
	document.getElementById("nextButton").disabled = false;
	document.getElementById("nextButton").style.color = "#2c3e50";
	document.getElementById("nextButton").style.backgroundColor = "white";
	document.getElementById("nextButton").style.cursor = "pointer";
	
}


// change the question and answer 
function AddQuestion(){
	document.getElementById("Question").innerHTML = (num+1) +". The capital of " + QA[num][0] +" is:";
	var rad = document.getElementsByTagName("input")	;
	for(var i = 0; i < rad.length; i++) {
		rad[i].nextSibling.nodeValue =  (i+1) + " )  " +QA[num][i+1] ;
		rad[i].checked = false;
	}
	document.getElementById("nextButton").style.color = "white";
	document.getElementById("nextButton").style.backgroundColor = "#2c3e50";
	document.getElementById("nextButton").style.cursor = "initial";

}


//calculate the correct answers
function clacResult(){
	var j=0;
	for (var i=0;i<result.length;i++){
		if (result[i]==QA[i][5]) {
			j++;
		}

	}
	document.getElementById("Showresult").style.right = "calc(50% - 250px)";
	document.getElementById("result").innerHTML = j + " of 10" ;
	document.getElementById("percent").innerHTML = (j*10) + " &#37;";
}

// restart quiz
function restart(){

	num=0;
	result=[];
	QA=[];
	randomizeQA();
	document.getElementById("Showresult").style.right = "-600px";

	setTimeout(ShowQuestion, 500);
}

