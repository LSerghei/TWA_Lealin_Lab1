"use strict";

var jsonQuestions;

var QUESTIONS_COUNT = jsonQuestions.length;
var QUESTIONS_SHOW_COUNT = 5;

var questionIDs = [];
var hQuestions = [], pQuestions = [], fAnswers = [];
var sQuestionCount;
var bAnswer;

var startTime, endTime;

var i, j;

//Functions
function checkAnswer(){
	var countAnswer = 0;
	var totalSeconds;
	
	for (i = 0; i < QUESTIONS_SHOW_COUNT; i++){
		var usersAnswers = document.getElementsByName("question" + questionIDs[i]);
		jsonQuestions[questionIDs[i]].answerUser = "";
		
		for(j = 0; j < usersAnswers.length; j++){
			if(usersAnswers[j].checked){
				jsonQuestions[questionIDs[i]].answerUser = usersAnswers[j].value;
			}
		}
		
		if (jsonQuestions[questionIDs[i]].answerUser == ""){
			alert("Not all questions were answered!");
			return;
		}
		
		if (jsonQuestions[questionIDs[i]].answerUser == jsonQuestions[questionIDs[i]].answerCorrect) {
			countAnswer++;
		} 
	}
	
	endTime = new Date();
	
	totalSeconds = (endTime.getTime() - startTime.getTime())/1000;
		
	alert("You answered " + countAnswer + " of " + QUESTIONS_SHOW_COUNT + " right!\n" + "It took you " + totalSeconds + " seconds.");
}

function createQuestionsInput(){
	sQuestionCount = document.createElement("SELECT");
	
	for (i = 0; i < QUESTIONS_COUNT; i++){
		var opt = document.createElement("OPTION");
		opt.value = i+1;
		opt.innerHTML = i+1;
		sQuestionCount.appendChild(opt);
	}		
	
	document.body.appendChild(sQuestionCount);
}

function init(){
	//Hide question counter
	document.getElementById("pCount").style.display = "none";
	document.getElementById("bStart").style.display = "none";
	sQuestionCount.style.display = "none";
	
	//Generate N non repeatable numbers
	QUESTIONS_SHOW_COUNT = sQuestionCount.options[sQuestionCount.selectedIndex].value;
	
	var elem;
	for (i = 0; i < QUESTIONS_SHOW_COUNT; i++){
		do{
			elem = Math.floor((Math.random() * QUESTIONS_COUNT));
		}
		while (questionIDs.indexOf(elem) != -1);
		
		questionIDs.push(elem);
	}
		
	//Create H4 and P elements for questions' texts
	for (i = 0; i < QUESTIONS_SHOW_COUNT; i++){
		hQuestions.push(document.createElement("H4"));
		hQuestions[i].innerHTML = "Question " + (i+1);
		
		document.body.appendChild(hQuestions[i]);
		
		pQuestions.push(document.createElement("P"));
		pQuestions[i].innerHTML = jsonQuestions[questionIDs[i]].questionText;
		
		document.body.appendChild(pQuestions[i]);
		
		//Form elements for radio buttons
		fAnswers.push(document.createElement("FORM"));
		
		for (j = 0; j < jsonQuestions[questionIDs[i]].answerList.length; j++)
		{
			var inputRadioQuestion = document.createElement("INPUT");
			var label = document.createElement("LABEL");
			
			inputRadioQuestion.setAttribute("type", "radio");
			inputRadioQuestion.setAttribute("name", "question" + questionIDs[i]);
			inputRadioQuestion.setAttribute("value", jsonQuestions[questionIDs[i]].answerList[j]);
			
			label.appendChild(inputRadioQuestion);
			label.innerHTML += "<span> " + jsonQuestions[questionIDs[i]].answerList[j] + "</span><br>";
			
			fAnswers[i].appendChild(label);
		}
		
		document.body.appendChild(fAnswers[i]);
	}

	//Create Answer button
	bAnswer = document.createElement("BUTTON");
	bAnswer.setAttribute("onclick", "checkAnswer()");
	bAnswer.innerHTML = "Answer";
	document.body.appendChild(bAnswer);
	
	//Start timer to count seconds
	startTime = new Date();
}