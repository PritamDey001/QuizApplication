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

var currentquestion=document.getElementById(`question`)
var answer1=document.getElementById(`button1`)
var answer2=document.getElementById(`button2`)
var answer3=document.getElementById(`button3`)
var answer4=document.getElementById(`button4`)
const nextButton = document.getElementById('next');
const buttons = document.querySelectorAll('.button');
 var answer=document.getElementById(`answer`)
var index=0
var score=0
var indexs=[];
function startquiz(){
    index=0
    score=0
    showQuestion()

}
function  showQuestion(){
    buttons.forEach((button) => {
        button.style.backgroundColor=`white`
        button.style.color=`black`
        button.style.cursor = 'pointer';
        button.disabled = false;
    })
    var q=quiz[index];
    var questionno=index+1;
    currentquestion.innerText=`${questionno} . ${q.question}`
    answer1.innerText=`${q.one}`
    answer2.innerText=`${q.two}`
    answer3.innerText=`${q.third}`
    answer4.innerText=`${q.fourth}`
    checkAnswer()
}
function resetQuestion(){
nextButton.style.opacity=`0`
currentquestion.innerText=`Question goes here`
answer1.innerText=`Answer 1`
answer2.innerText=`Answer 2`
answer3.innerText=`Answer 3`
answer4.innerText=`Answer 4`
}
function checkAnswer() {
    
    const ArrayAnswer = ['one', 'two', 'third', 'fourth'];
   

    buttons.forEach((button, i) => {
        button.addEventListener('click', () => {
            if (quiz[index][ArrayAnswer[i]] === quiz[index].right) {
               
                button.style.backgroundColor = 'rgba(20, 241, 20, 0.551)'
            } else {
                button.style.backgroundColor = 'rgba(255, 0, 0, 0.655)';
            }

            buttons.forEach((btn) => {
                btn.style.cursor = 'no-drop';
                btn.disabled = true;
            });
            nextButton.style.opacity=`1`
        });
    });
}
nextButton.addEventListener('click', () => {
    if (index < quiz.length - 1) {
        resetQuestion();
        handleNextButton();
      
    } else {
        answer.innerText = `${Math.round(score/2)}`;
    }
});
function handleNextButton(){
    index++;
    if(index<quiz.length){
       showQuestion()
    }
}
startquiz()
