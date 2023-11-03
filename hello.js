const questions = [
    {
        question: "Which of these is a standard interface for serial data transmission?",
        answers: [
            { text: "ASCII", correct: false },
            { text: "RS232C", correct: true },
            { text: "2", correct: false },
            { text: "Centronics", correct: false },
        ]
    },
    {
        question: "Which type of topology is best suited for large businesses which must carefully control and coordinate the operation of distributed branch outlets?",
        answers: [
            { text: "Ring", correct: false },
            { text: "Local Area", correct: false },
            { text: "Hierarchical", correct: false },
            { text: "Star", correct: true },
        ]
    },
    {
        question: "Which of the following transmission directions listed is not a legitimate channel?",
        answers: [
            { text: "Simplex", correct: false },
            { text: "Half Duplex", correct: false },
            { text: "Full Duplex", correct: false },
            { text: "Double Duplex", correct: true },
        ]
    },
    {
        question: "What kind of transmission medium is most appropriate to carry data in a computer network that is exposed to electrical interferences?",
        answers: [
            { text: "Unshielded twisted pair", correct: false },
            { text: "Optical fiber", correct: true },
            { text: "Coaxial cable", correct: false },
            { text: "Microwave", correct: false },
        ]
    },
    {
        question: "A collection of hyperlinked documents on the internet forms the ?",
        answers: [
            { text: "World Wide Web (WWW)", correct: true },
            { text: "E-mail system", correct: false },
            { text: "Mailing list", correct: false },
            { text: "Hypertext markup language", correct: false },
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHtml = "Next";
    showQuestion();
}

function showQuestion() {
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct=answer.correct;
        }
        button.addEventListener("click",selectAnswer)
    });
}

function resetState() {
    nextButton.style.display = "none";
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn=e.target;
    const isCorrect=selectedBtn.dataset.correct==="true";
    if(isCorrect)
    {
        selectedBtn.classList.add("correct");
        score++;
    }
    else
    {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct==="true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}

function showScore(){
    resetState();
    questionElement.innerHTML='You scored '+score+ ' out of '+questions.length;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex<questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click",()=>{
    if(currentQuestionIndex<questions.length)
    {
        handleNextButton();
    }
    else
    {
        startQuiz();
    }
});

startQuiz();

