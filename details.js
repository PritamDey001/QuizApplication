var indexSelections = localStorage.getItem(`indexs`);
var userSelections = localStorage.getItem(`selection`);
// console.log(indexSelections);
// console.log(userSelections);
var div = document.getElementById(`box`);
var indesQueston=indexSelections.split(`,`)
var answerSelections=userSelections.split(`,`)
// console.log(indesQueston);
function showDetails() {
  for (let i = 0; i < 20; i++) {
    // Use a closure to capture the value of i for each iteration
    (function (index) {
      window.fetch("https://pritamdey001.github.io/demoapi/history.json")
        .then((data) => data.json())
        .then((history) => {
          var q = history[indesQueston[index]];
        //   console.log(`${indesQueston[index]}`);
          const box= document.createElement('div');
          box.className = `questionbox`;
          const questionid = document.createElement('h4');
          const answerButton = document.createElement('div');
          questionid.className = `questionid`;
          answerButton.className=`answerButton`
          questionid.innerHTML = `${i+1}. ${q.question}`;
          div.appendChild(box);
          box.appendChild(questionid)
          box.appendChild(answerButton)
          var ch=['A','B','C','D']
        //   console.log(answerSelections[i]);
          for (let j = 0; j < 4; j++) {
           
            const button = document.createElement('div');
            button.className = 'button';
            button.innerText = `${ch[j]}. ${q[Object.keys(q)[j + 1]]}`
            // if (`${ch[j]}. ${q.right}` === button.innerText) {
            //     button.style.backgroundColor = 'rgba(20, 241, 20, 0.551)';
            //   } 
            if (answerSelections[i] ===q.right && `${ch[j]}. ${q.right}` === button.innerText) {
                button.style.backgroundColor = "rgba(20, 241, 20, 0.551)"; // Green
                var check=document.createElement(`div`)
                button.appendChild(check)
              } 
            else if (`${ch[j]}. ${answerSelections[i]}` === button.innerText){
                button.style.backgroundColor = "rgba(255, 0, 0, 0.5)"; // Red
              }
             if(`${ch[j]}. ${q.right}` === button.innerText){
                button.style.backgroundColor = "rgba(20, 241, 20, 0.551)"; // Green
            }
           
            answerButton.appendChild(button);
          }
        })
        .catch((err) => console.log(`not found${err}`));
    })(i);
  }
}
showDetails();
