"use strict";

var jsonQuestions = [{questionText : "What was the first console video game that allowed the game to be saved? </br> a) Super Mario Brothers </br> b) The Legend of Zelda </br> c) Super Metroid", answerChar : "b"},
					{questionText : "Created in 2009, what was the first decentralized cryptocurrency? </br> a) Ethereum </br> b) Ripple </br> c) Bitcoin", answerChar : "c"},
					{questionText : "The USB in 'USB Cable' Stands For What? </br> a) Utility Service Bind </br> b) Uninterrupted Service Bus </br> c) Universal Serial Bus </br> d) Uniform Sync Bank", answerChar : "c"},
					{questionText : "Which Company Did Steve Jobs Ask To Build OSX-based Laptops? </br> a) Sony </br> b) Hewlett-Packard </br> c) Dell </br> d) IBM", answerChar : "a"},
					{questionText : "After Whom Is The Linux Operating System Named? </br> a) Lineaus Henderson </br> b) Leonardo da Vinci </br> c) Linus Pauling </br> d) Linus Torvalds", answerChar : "d"}];

var QUESTIONS_COUNT = jsonQuestions.length;
var QUESTIONS_SHOW_COUNT = 5;

var questionIDs = [];
var hQuestions = [], pQuestions = [], iAnswers = [];

var startTime, endTime;

//Generate N non repeatable numbers
var elem, i;
for (i = 0; i < QUESTIONS_SHOW_COUNT; i++){
	do{
		elem = Math.floor((Math.random() * QUESTIONS_COUNT));
	}
	while (questionIDs.indexOf(elem) != -1);
	
	questionIDs.push(elem);
}

//Functions
function checkAnswer(){
	var vAnswers = [];
	var countAnswer = 0;
	var totalSeconds;
	
	for (i = 0; i < QUESTIONS_SHOW_COUNT; i++){
		//Remove loose spaces and set to lower case like in answers
		vAnswers.push(document.getElementById("a" + questionIDs[i]).value.trim().toLowerCase());
		
		if (vAnswers[i] == jsonQuestions[questionIDs[i]].answerChar) {
			countAnswer++;
		} 
	}
	
	endTime = new Date();
	
	totalSeconds = (endTime.getTime() - startTime.getTime())/1000;
		
	alert("You answered " + countAnswer + " of " + QUESTIONS_SHOW_COUNT + " right!\n" + "It took you " + totalSeconds + " seconds.");
}

function init(){
	for (i = 0; i < QUESTIONS_SHOW_COUNT; i++){
		hQuestions.push(document.createElement("H4"));
		hQuestions[i].innerHTML = "Question " + (i+1);
		
		document.body.appendChild(hQuestions[i]);
		
		pQuestions.push(document.createElement("P"));
		pQuestions[i].innerHTML = jsonQuestions[questionIDs[i]].questionText;
		
		document.body.appendChild(pQuestions[i]);
		
		iAnswers.push(document.createElement("INPUT"));
		iAnswers[i].setAttribute("id", "a" + questionIDs[i]);
		
		document.body.appendChild(iAnswers[i]);
	}
	
	startTime = new Date();
}