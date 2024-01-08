var quiz=[
    {
        question: "Fill in the blank: He is _______ Indian citizen.",
        one: "a",
        two: "an",
        third: "the",
        fourth: "no article",
        right: "an",
        explanation: "In this sentence, we need to use the article 'an' before the word 'Indian' because it starts with a vowel sound."
    },{
        question: "What does the phrasal verb 'turn down' mean?",
        one: "To argue with someone",
        two: "To take care of someone or something",
        third: "To have a good relationship with someone",
        fourth: "To reject or refuse something",
        right: "To reject or refuse something",
        explanation: "The phrasal verb 'turn down' means to reject or refuse something. It does not mean to argue with someone, to take care of someone or something, or to have a good relationship with someone."

    },{
        question: "Which city is known as the 'City of Science'?",
        one: "Kolkata",
        two: "Mumbai",
        third: "Delhi",
        fourth: "Chennai",
        right: "Kolkata",
        explanation: "Kolkata is known as the 'City of Science' for its scientific achievements."

    },{
        question: "Who is the head of the Council of Ministers in a State in India?",
        one: "Governor",
        two: "Chief Minister",
        third: "President",
        fourth: "Prime Minister",
        right: "Chief Minister",
        explanation: "The Chief Minister is the head of the Council of Ministers in a State in India as per Article 164 of the Indian Constitution."

    }
]

var currentquestion = document.getElementById(`question`);
const nextButton = document.getElementById('next');
const PreviusButton = document.getElementById('piv');
const answer = document.getElementById(`answer`);
var index = 0;
var score = 0;
var userSelections = Array(5).fill(null);
function startquiz() {
    console.log(Math.round(Math.random()*4));
  index = 0;
  score = 0;
  userSelections.fill(null);
  showQuestion();
}

function showQuestion() {
  var q = quiz[index];
  var questionno = index + 1;
  currentquestion.innerText = `${questionno} . ${q.question}`;

  // Clear previous buttons
  answer.innerHTML = '';

  // Dynamically create buttons
  for (let i = 0; i < 4; i++) {
    const button = document.createElement('button');
    button.className = 'button';
    button.innerText = q[Object.keys(q)[i + 1]];
      // Check if the button was selected in a previous attempt
      if (userSelections[index] === button.innerText) {
        if (q.right === button.innerText) {
          button.style.backgroundColor = 'rgba(20, 241, 20, 0.551)';
        } else {
          button.style.backgroundColor = 'rgba(255, 0, 0, 0.655)';
        }
      }

    // Add click event listener to each button
    button.addEventListener('click', () => {
      
      userSelections[index] = button.innerText;
      checkAnswer(button, q);
    });

    answer.appendChild(button);
  }
}

function checkAnswer(button, q) {
  // Disable all buttons after a choice is made
  answer.querySelectorAll('.button').forEach((btn) => {
    btn.disabled = true;
  });

  if (q.right === button.innerText) {
    button.style.backgroundColor = 'rgba(20, 241, 20, 0.551)';
    score++;
  } else {
    button.style.backgroundColor = 'rgba(255, 0, 0, 0.655)';
  }

  nextButton.style.opacity = `1`;
  PreviusButton.style.opacity = `1`;
}

nextButton.addEventListener('click', () => {
  if (index < quiz.length - 1) {
    resetQuestion();
    handleNextButton();
  } else {
    // Display the score
    answer.innerText = `Score: ${score} out of ${quiz.length}`;
    currentquestion.innerText=``
    nextButton.style.opacity=``
    PreviusButton.style.opacity = ``;
    console.log(userSelections);
  }
});
PreviusButton.addEventListener('click', handlePreviusButton);

function handlePreviusButton() {
  if (index > 0) {
    index--;
    resetQuestion();
    showQuestion();
    nextButton.style.opacity = `1`;
    PreviusButton.style.opacity = `1`;
  }
}

function handleNextButton() {
  index++;
  if (index < quiz.length) {
    showQuestion();
  }
}

function resetQuestion() {
  nextButton.style.opacity = `0`;
  PreviusButton.style.opacity = `0`;
  currentquestion.innerText = `Question goes here`;
}

startquiz();