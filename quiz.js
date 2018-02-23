"use strict";

var jsonQuestions = [{questionText : "What was the first console video game that allowed the game to be saved? </br> a) Super Mario Brothers </br> b) The Legend of Zelda </br> c) Super Metroid", answerChar : "b"},
					{questionText : "Created in 2009, what was the first decentralized cryptocurrency? </br> a) Ethereum </br> b) Ripple </br> c) Bitcoin", answerChar : "c"},
					{questionText : "The USB in 'USB Cable' stands for what? </br> a) Utility Service Bind </br> b) Uninterrupted Service Bus </br> c) Universal Serial Bus </br> d) Uniform Sync Bank", answerChar : "c"},
					{questionText : "Which company did Steve Jobs ask to build OSX-based Laptops? </br> a) Sony </br> b) Hewlett-Packard </br> c) Dell </br> d) IBM", answerChar : "a"},
					{questionText : "Which computer technology derives its name from Greek mythology? </br> a) Daemons </br> b) Caches </br> c) NAND Gates </br> d) Processors", answerChar : "a"},
					{questionText : "The largest fresh water lake in the world is located in? </br> a) Brazil </br> b) Russia </br> c) The United States </br> d) China", answerChar : "b"},
					{questionText : "Canada and which of these U.S. States have very similar population sizes? </br> a) New York </br> b) California </br> c) Florida </br> d) Texas", answerChar : "b"},
					{questionText : "The opposite of Albinism is called? </br> a) Velvetinism </br> b) Alopecia X </br> c) Vitiligo </br> d) Melanism", answerChar : "d"},
					{questionText : "Who produced the world's first commercial 1TB Hard Drive? </br> a) Western Digital </br> b) Hitachi </br> c) Maxtor </br> d) Seagate", answerChar : "b"},
					{questionText : "The fattiest organ of the human body is the? </br> a) Pancreas </br> b) Heart </br> c) Brain </br> d) Liver", answerChar : "c"},
					{questionText : "After whom is the Linux operating system named? </br> a) Lineaus Henderson </br> b) Leonardo da Vinci </br> c) Linus Pauling </br> d) Linus Torvalds", answerChar : "d"}];

var QUESTIONS_COUNT = jsonQuestions.length;
var QUESTIONS_SHOW_COUNT = 5;

var questionIDs = [];
var hQuestions = [], pQuestions = [], iAnswers = [];
var sQuestionCount;
var bAnswer;

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
	var countAnswer = 0;
	var totalSeconds;
	
	for (i = 0; i < QUESTIONS_SHOW_COUNT; i++){
		//Remove loose spaces and set to lower case like in answers
		jsonQuestions[questionIDs[i]].answerFromUser = document.getElementById("a" + questionIDs[i]).value.trim().toLowerCase();
		
		if (jsonQuestions[questionIDs[i]].answerFromUser === jsonQuestions[questionIDs[i]].answerChar) {
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
	
	QUESTIONS_SHOW_COUNT = sQuestionCount.options[sQuestionCount.selectedIndex].value;
	
	//Create H4 and P elements for questions' texts
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
	
	//Create two breaks for Answer button
	document.body.appendChild(document.createElement("BR"));
	document.body.appendChild(document.createElement("BR"));
	
	//Create Answer button
	bAnswer = document.createElement("BUTTON");
	bAnswer.setAttribute("onclick", "checkAnswer()");
	bAnswer.innerHTML = "Answer";
	document.body.appendChild(bAnswer);
	
	startTime = new Date();
}