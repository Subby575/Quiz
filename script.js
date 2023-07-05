const questions =[
    {
        question:"What is 4+4 is equal to ?",
        answers:[
            {text:"18",correct:false},
            {text:"80",correct:false},
            {text:"8",correct:true},
            {text:"180",correct:false},
        ]
    },
    {
        question:"What is 14+4 is equal to ?",
        answers:[
            {text:"180",correct:false},
            {text:"8",correct:false},
            {text:"80",correct:false},
            {text:"18",correct:true},
        ]
    },
    {
        question:"What is 40+40 is equal to ?",
        answers:[
            {text:"8",correct:false},
            {text:"80",correct:true},
            {text:"18",correct:false},
            {text:"180",correct:false},
        ]
    },
    {
        question:"What is 140+40 is equal to ?",
        answers:[
            {text:"18",correct:false},
            {text:"8",correct:false},
            {text:"180",correct:true},
            {text:"80",correct:false},
        ]
    },
    {
        question:"What is 70+40 is equal to ?",
        answers:[
            {text:"11",correct:false},
            {text:"80",correct:false},
            {text:"110",correct:true},
            {text:"10",correct:false},
        ]
    }
];
const questionElement=document.getElementById("question");
const options=document.getElementById("options");
const next=document.getElementById("next");


let currentQuestionIndex =0;
let score=0;

function startQuiz(){
    currentQuestionIndex=0;
    score=0;
    next.innerHTML="Next";
    showQuestion();

}



function showQuestion(){
    resetState();
    let currentQuestion=questions[currentQuestionIndex];
    let questionNo=currentQuestionIndex+1;
    questionElement.innerHTML=questionNo+". "+currentQuestion.question;



    currentQuestion.answers.forEach(answer => {
        const button=document.createElement("button");
        button.innerHTML=answer.text;
        button.classList.add("btn");
        options.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer);
    });
}

function resetState(){
    next.style.display="none";
    while(options.firstChild){
        options.removeChild(options.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct=="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(options.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    next.style.display="block";
 
}
next.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length){
        nextQuestion();
    }else{
       
        startQuiz();
    }
    if(currentQuestionIndex==(questions.length-1)){
        next.innerHTML="Finish";
        
    }
})

function showScore(){
    resetState();
    
    questionElement.innerHTML=`You Scored ${score} out of ${questions.length}!`;
    
    next.innerHTML="Play Again";
    next.style.display="block";
}

function nextQuestion(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();

    }else{
        showScore();
    }
}


startQuiz();