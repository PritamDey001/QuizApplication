var currentquestion = document.getElementById(`question`);
const nextButton = document.getElementById('next');
const PreviusButton = document.getElementById('piv');
const DetailButton = document.getElementById('details');
const resultButton = document.getElementById('result');
const answer = document.getElementById(`answer`);
const rounds = document.querySelectorAll("#numberindex .round");
const lines = document.querySelectorAll("#numberindex .line");


rounds.forEach((round, index) => {
  // round.style.backgroundColor = "blue"; // Example style change
  round.innerText=`${index + 1}`
});
var index = 0;
var score = 0;
var count=0;
var questionNumber=1;
var indexSelections= Array(20).fill(null);
var userSelections = Array(20).fill(null);

function startquiz() {
  index = Math.round(Math.random()*271);
  if (indexSelections.includes(index)) {
    index = Math.round(Math.random()*271);
  }
  // console.log(index);
  score = 0;
  count=0;
  indexSelections.fill(null);
  userSelections.fill(null);
  showQuestion();
}
function  showQuestion(){
    window.fetch("https://pritamdey001.github.io/demoapi/history.json")
    .then((data)=>data.json())
    .then((history)=>{
    var q = history[index];
    indexSelections[count]=index;
    currentquestion.innerText = `${questionNumber} . ${q.question}`;
    answer.innerHTML = '';
    let uniqueNumbers = getRandomUniqueNumbers(4, 0, 3);
    // console.log(uniqueNumbers);
    for (let i = 0; i < 4; i++) {
        const button = document.createElement('button');
        button.className = 'button';
        button.innerText = q[Object.keys(q)[uniqueNumbers[i] + 1]];
        // if (userSelections[count] === button.innerText) {
        //     if (q.right === button.innerText) {
        //       button.style.backgroundColor = 'rgba(20, 241, 20, 0.551)';
        //     } else {
        //       button.style.backgroundColor = 'rgba(255, 0, 0, 0.655)';
        //     }
        //   }
        button.addEventListener('click', () => {  
          userSelections[count] = button.innerText;
          checkAnswer(button, q);
        });
    
        answer.appendChild(button);
      }
    })
    .catch((err)=>console.log(`not found${err}`))
}
function checkAnswer(button, q) {
    // Disable all buttons after a choice is made
    answer.querySelectorAll('.button').forEach((btn) => {
      btn.disabled = true;
      btn.style.cursor = 'no-drop';
    });
  
    if (q.right === button.innerText) {
      button.style.backgroundColor = 'rgba(20, 241, 20, 0.551)';
      score++;
    } else {
      button.style.backgroundColor = 'rgba(255, 0, 0, 0.655)';
    }

    rounds[questionNumber-1].style.backgroundColor= 'green';
    if(questionNumber<20){
    lines[questionNumber-1].style.backgroundColor= 'green';
    }
    nextButton.style.display=`block`;
    PreviusButton.style.display=`block`;
  }
nextButton.addEventListener(`click`,()=>{
    if (questionNumber<20) {
        resetQuestion();
        handleNextButton();
      } else {
        // Display the score
        answer.innerText = `Score: ${score} out of 20`;
        currentquestion.innerText=``
        nextButton.style.display=`none`;
        PreviusButton.style.display=`none`;
        DetailButton.style.display=`block`;
        resultButton.style.display=`block`;
        // console.log(userSelections);
        // console.log(indexSelections);
        if(score>12){
          resultButton.innerText=`PASS`
          resultButton.style.backgroundColor = 'rgba(20, 241, 20, 0.551)';
        }
        else {
          resultButton.innerText=`FAIL`
          resultButton.style.backgroundColor = 'rgba(255, 0, 0, 0.655)';
        }
      }

});
function resetQuestion() {
  nextButton.style.display=`none`;
  PreviusButton.style.display=`none`;
    currentquestion.innerText = `Question goes here`;
  }
function handleNextButton() {
    index = Math.round(Math.random()*271);
    if (indexSelections.includes(index)) {
      index = Math.round(Math.random()*271);
    }
    if (questionNumber <20) {
        questionNumber++;
        count++;
      showQuestion();
    
    }
  } 
//  PreviusButton.addEventListener('click', handlePrevButton);

//   function handlePrevButton() {
//     if (questionNumber > 1) {
//       questionNumber--;
//       count--;
//       index = indexSelections[count];
//       resetQuestion();
//       showQuestion();
//       nextButton.style.opacity = `1`;
//       PreviusButton.style.opacity = `1`;
//     }
//   }  
DetailButton.addEventListener('click',()=>{
  localStorage.setItem(`indexs`,indexSelections)
  localStorage.setItem(`selection`,userSelections)
  window.location.href=`details.html`
})
startquiz()

function getRandomUniqueNumbers(count, min, max) {
  if (count > max - min + 1) {
    console.error("Cannot generate unique numbers. Count exceeds the range.");
    return [];
  }

  let uniqueNumbers = new Set();
  while (uniqueNumbers.size < count) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    uniqueNumbers.add(randomNumber);
  }

  return Array.from(uniqueNumbers);
}




