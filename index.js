const cardAnswer = document.querySelector('.card_answer');
const points = document.querySelector('.score');



        let index = 0;
        let score = 0;
        let Question = [];
        
    fetch(`https://opentdb.com/api.php?amount=10&category=18&difficulty=easy`)
    .then(response => response.json())
    .then(risposta => {
     risposta.results.forEach(element => {
   let answers = [element.correct_answer, ...element.incorrect_answers]; 
   answers.sort(() => Math.random() - 0.5);
   Question.push({domanda: element.question, corretta: element.correct_answer, risposte: answers}); 
     console.log(element)
     });
     console.log(Question[3].corretta);
      function removeRisp (){
        while (cardAnswer.firstChild) {
        cardAnswer.removeChild(cardAnswer.firstChild);
      }
      }
      createRisp();
      function createRisp () {
      const divAnswer = document.createElement('div');
      divAnswer.classList.add('answer');
      divAnswer.innerHTML = `
        <h4>${Question[index].domanda}</h4>
      `;
      cardAnswer.append(divAnswer);
      Question[index].risposte.forEach(risp => {
        
        const answers = document.createElement('span');
        answers.innerHTML = risp;
        cardAnswer.append(answers);
        answers.addEventListener('click', () => {
          if(risp === Question[index].corretta){
           answers.style.background = '#2eb872';
           index++;
           score++;
           if (index >= risposta.results.length) {
          alert('punteggio finale:' + score + '/10');
              index = 0;
              score = 0;
              points.innerHTML =  score + '/10';
              setTimeout(function() {
              removeRisp();
              createRisp();
             },2000);
          }
          setTimeout(function() {
          removeRisp();
          createRisp();
        },2000);
          points.innerHTML = score + '/10';
         }else {
          answers.style.background = '#ff5d6e';
          index++;
          if (index >= risposta.results.length) {
          alert('punteggio finale:' + score + '/10');
              index = 0;
              score = 0;
              points.innerHTML =  score + '/10';
          setTimeout(function() {
          removeRisp();
          createRisp();
        },2000);
          }
          setTimeout(function() {
          removeRisp();
          createRisp();
        },2000);
         }
        })
      });
    }
    });




