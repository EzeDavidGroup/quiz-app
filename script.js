const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answerButtons");
const nextBtn = document.getElementById("nextBtn");

const questions = [
    {
        question: "Which language is used to style web pages?",
        answers: [
            { text: "HTML", correct: false },
            { text: "CSS", correct: true },
            { text: "JavaScript", correct: false },
            { text: "Python", correct: false }
        ]
    },
    {
        question: "Which method is used to select an element by its ID?",
        answers: [
            { text: "querySelectorAll()", correct: false },
            { text: "getElementById()", correct: true },
            { text: "getElementsByClassName()", correct: false },
            { text: "createElement()", correct: false }
        ]
    },
    {
        question: "Which keyword declares a variable that can be reassigned?",
        answers: [
            { text: "const", correct: false },
            { text: "var", correct: false },
            { text: "let", correct: true },
            { text: "static", correct: false }
        ]
    },
    {
        question: "Which company developed JavaScript?",
        answers: [
            { text: "Microsoft", correct: false },
            { text: "Netscape", correct: true },
            { text: "Google", correct: false },
            { text: "Apple", correct: false }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

startQuiz();

function startQuiz() {

    currentQuestionIndex = 0;
    score = 0;

    nextBtn.textContent = "Next Question";

    showQuestion();

}

function showQuestion() {

    resetState();

    let currentQuestion = questions[currentQuestionIndex];

    questionElement.textContent = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {

        const button = document.createElement("button");

        button.textContent = answer.text;

        button.classList.add("btn");

        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);

        answerButtons.appendChild(button);

    });

}

function resetState() {

    nextBtn.style.display = "none";

    while (answerButtons.firstChild) {

        answerButtons.removeChild(answerButtons.firstChild);

    }

}

function selectAnswer(e) {

    const selectedBtn = e.target;

    const isCorrect = selectedBtn.dataset.correct === "true";

    if (isCorrect) {

        selectedBtn.classList.add("correct");

        score++;

    } else {

        selectedBtn.classList.add("wrong");

    }

    Array.from(answerButtons.children).forEach(button => {

        if (button.dataset.correct === "true") {

            button.classList.add("correct");

        }

        button.disabled = true;

    });

    nextBtn.style.display = "block";

}

function showScore() {

    resetState();

    questionElement.textContent =
        `You scored ${score} out of ${questions.length}!`;

    nextBtn.textContent = "Play Again";

    nextBtn.style.display = "block";

}

function handleNextButton() {

    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {

        showQuestion();

    } else {

        showScore();

    }

}

nextBtn.addEventListener("click", () => {

    if (currentQuestionIndex < questions.length) {

        handleNextButton();

    } else {

        startQuiz();

    }

});
