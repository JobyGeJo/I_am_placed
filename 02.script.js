const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const scoreText = document.getElementById("score");
const minutes = document.querySelector('.min');
const seconds = document.querySelector('.sec');
const submit = document.querySelector('.submit-quiz');

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];
let selectedChoice = null;
let selectedAnswer = null;
let questions = [];

let interval = null;
let remainingSeconds = 0;

const giverTime = 90;
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 5;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

//Quesionings 
getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter == MAX_QUESTIONS) {
    //go to the end page
    return window.location.assign("/02.Quiz.html");
  }

  questionCounter++;
  reset();

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = "Q" + questionCounter + ". " + currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
  start();
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    if (selectedChoice != null){
      selectedChoice.parentElement.classList.remove('select');
    };
   
    selectedChoice = e.target;
    selectedAnswer = selectedChoice.dataset["number"];

    selectedChoice.parentElement.classList.add('select'); 
    });
});

submit.addEventListener('click', () => {
  if (selectedChoice == null) return;

  if (selectedAnswer == currentQuestion.answer){
    acceptingAnswers = false;
    score += CORRECT_BONUS;
  };

  console.log(score);
  stop();
  selectedChoice.parentElement.classList.remove('select');
  getNewQuestion();
});

fetch('questions.json')
    .then((res) => {
        return res.json();
    })
    .then((loadedQuestions) => {
        questions = loadedQuestions;
        startGame();
    })
    .catch((err) => {
        console.error(err);
    });

//Timer
updateTime = () => {
  const mins = Math.floor(remainingSeconds / 60);
  const secs = remainingSeconds % 60;
  
  minutes.textContent = mins;
  seconds.textContent = secs.toString().padStart(2, '0');
};

start = () => {
  if (remainingSeconds === 0) return;

  interval = setInterval(() => {
    remainingSeconds--;
    updateTime();

    if (remainingSeconds === 0) {
      stop();
      getNewQuestion();
    };
  }, 1000);
};

stop = () => {
  clearInterval(interval);
  interval = null;
  updateTime();
}

reset = () => {
  remainingSeconds = giverTime;
  updateTime();
}