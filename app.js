const container = document.querySelector('.container');
const boxquestion = document.querySelector('.question');
const boxchoices = document.querySelector('.choices');
const nextBtn = document.querySelector('.nextBtn');
const scoreCard = document.querySelector('.scoreCard');
const startBtn = document.querySelector('.startBtn')
const timer = document.querySelector(".timer")

// Make an array of object that stores quiz choce of questions
const quiz = [
    {
        que: "Q.which of the follwing is not a css model property?",
        choices: ["margin", "padding", "border-radiis", "border-collapse"],
        answer: "border-collapse"
    },
    {
        que: "Q.which of the follwing is not a valid way to declare a function in javaScript",
        choices: ["MyFuction()", "function()", "let myFunction()", "function myFunction()"],
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

//making Variables

let questionIndex = 0;
let score = 0;
let quizEnd = false;
let timeEnd = 15;
let timeId = null;

const showQuestions = () => {
    // console.log("working the function");
    const questionDetails = quiz[questionIndex];
    boxquestion.textContent = questionDetails.que;
    boxchoices.textContent = "";
    for (i = 0; i < questionDetails.choices.length; i++) {
        const currentChoice = questionDetails.choices[i];
        const choiceDiv = document.createElement('div');
        choiceDiv.textContent = currentChoice;
        choiceDiv.classList.add("choice");
        boxchoices.appendChild(choiceDiv);
        choiceDiv.addEventListener('click', () => {
            if (choiceDiv.classList.contains('selected')) {
                choiceDiv.classList.remove('selected')
            } else {
                choiceDiv.classList.add('selected')

            }
        });
    }
    if (questionIndex < quiz.length) {
        startTimer()
    }
    // console.log(questionDetails);
}
// function to check answer
const checkAnswer = () => {
    let selectedChoice = document.querySelector('.choice.selected');
    if (selectedChoice.textContent === quiz[questionIndex].answer) {
        // Sweet Alert in here if you want custom Alert you can make it

        Swal.fire({
            icon: 'success',
            title: 'Good',
            text: 'Your selected answer is right',
            footer: '<a href="">Why do I have this issue?</a>'
        });
        score++;
    } else {

        // Sweet Alert in here if you want custom Alert you can make it

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: `You choose wrong Answer! ${quiz[questionIndex].answer} is the right answer`,
            footer: '<a href="">Why do I have this issue?</a>'
        });
    }
    timeEnd = 15;
    questionIndex++;
    if (questionIndex < quiz.length) {
        showQuestions()
    } else {
        stopTimer();
        showScore();
    }
}
// function code showScore
const showScore = () => {
    boxquestion.textContent = "";
    boxchoices.textContent = "";
    scoreCard.textContent = `Your Score ${score} out of${quiz.length}!`;

    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'You choose wrong Answer!',
        footer: '<a href="">Why do I have this issue?</a>'
    });
    nextBtn.textContent = "Play Again";
    quizEnd = true;
    timer.style.display = "none"
}

// showQuestions();
nextBtn.addEventListener("click", () => {
    const selectedChoice = document.querySelector('.choice.selected');
    if (!selectedChoice && nextBtn.textContent === "Next") {
        // Sweet Alert in here if you want custom Alert you can make it

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please Select Your Answer!',
            footer: '<a href="">Why do I have this issue?</a>'
        });
        return;
    }
    if (quizEnd === true) {
        nextBtn.textContent = "Next";
        scoreCard.textContent = "";
        questionIndex = 0;
        showQuestions();
        quizEnd = false;
        score = 0;
        startQuiz();


    } else {

    }
    checkAnswer();
});
// Start Button
startBtn.addEventListener("click", () => {
    startBtn.style.display = "none"
    container.style.display = "block"
    showQuestions();
    startQuiz();
});

// =============StartTime=================
const startTimer = () => {
    clearInterval(timeId)
    timer.textContent = timeEnd;
    const coundDown = () => {
        timeEnd--;
        timer.textContent = timeEnd;
        if (timeEnd === 0) {
            const userConfirm = confirm("Time Up! do you want to quiz again?")
            if (userConfirm) {
                timeEnd = 15;
                startQuiz();
            }
            else {
                startBtn.style.display = "block"
                container.style.display = "none"
                return;
            }
        }

    }
    timeId = setInterval(coundDown, 1000)
}


// =========StopTimer==================
const stopTimer = () => {
    clearInterval(timeId)
}

// =============ShuffelQuestion=====================
const ShuffelQuestion = () => {
    for (let i = quiz.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [quiz[i], quiz[j]] = [quiz[j], quiz[i]];
    }
    questionIndex = 0;
    showQuestions();
};
// =============Start Question=====================

const startQuiz = () => {
    timeEnd = 15;
    timer.style.display = "flex";
    ShuffelQuestion()
}