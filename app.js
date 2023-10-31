const container = document.querySelector('.container');
const boxquestion = document.querySelector('.question');
const boxchoices = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');

// Make an array of object that stores quiz choce of questions
const quiz = [
    {
        que: "Q.which of the follwing is not a css model property?",
        choices: ["margin", "padding", "border-radiis", "border-collapse"],
        answer: "border-collapse"
    },
    {
        que: "Q.which of the follwing is not a valid way to declare a function in javaScript",
        choices: ["MyFuction()", "function()", "let myFucnction()", "function myFunction()"],
        answer: "let myFunction()"
    },
    {
        que: "Q.which of the follwing is not a javaScript data type?",
        choices: ["object", "boolean", "float", "string"],
        answer: "float"
    },
    {
        que: "Q. What is the purpose of the this keyword in javaScript?",
        choices: ["it refer to the all value of object", "It refer to string value", "it refer to the current function", "It refers to the current object."],
        answer: "it refer to the current object"
    }
];
//making indexing of quiz
let questionIndex = 0;
let score = 0;
const showQuestions =()=>{
    // console.log("working the function");
    const questionDetails =quiz[questionIndex];
    boxquestion.textContent= questionDetails.que;
    boxchoices.textContent = "";
    for(i =0; i<questionDetails.choices.length; i++){
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add("choice");
        boxchoices.appendChild(choiceDiv);
        choiceDiv.addEventListener('click',()=>{
            if(choiceDiv.classList.contains('selected')){
                choiceDiv.classList.remove('selected')
            }else{
                choiceDiv.classList.add('selected')             

            }
        })
    }
    // console.log(questionDetails);
}
// function to check answer
const checkAnswer =()=>{
    let selectedChoice = document.querySelector('.choice.selected');
    if(selectedChoice.textContent === quiz[questionIndex].answer){
        console.log("okay goog job");
        score++;
    } else{
        console.log("try again you chose wrong quiz");
    }
    questionIndex++;
    if(questionIndex < quiz.length){
        showQuestions()
    }else{
        showScore()
    }
    // console.log(selectedChoice);
}
const showScore = ()=>{
    boxquestion.textContent = "";
    boxchoices.textContent = "";
    scoreCard.textContent = `Your Score ${score} out of${quiz.length}!`;
    nextBtn.textContent =  "Play Againg";
    nextBtn.addEventListener("click", ()=>{
        questionIndex = 0;
        showQuestions();
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
    })

}

showQuestions();
nextBtn.addEventListener("click", ()=>{
    const selectedChoice = document.querySelector('.choice.selected');
    if(!selectedChoice && nextBtn.textContent === "Next"){
        alert("Please Select you answer");
        return;
    }
    checkAnswer();
});