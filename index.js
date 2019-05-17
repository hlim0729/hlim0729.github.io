'use strict'

const questionSet = [
   {
    number: 1,
    text: `Who is the player scored most goals for the club?`,
    ans1: `Messi`,
    ans2: `Xavi`,
    ans3: `Harry`,
    ans4: `Valdes`
   },

   {
    number: 2,
    text: `Which team is the biggest rival of the club?`,
    ans1: `Mancester United`,
    ans2: `Valencia`,
    ans3: `Real Madrid`,
    ans4: `None of the above`
   },

   {
    number: 3,
    text: `Where is the club based in?`,
    ans1: `Spain`,
    ans2: `Italy`,
    ans3: `China`,
    ans4: `Korea`
   },

   {
    number: 4,
    text: `How many times did they win the Champions League?`,
    ans1: `2`,
    ans2: `4`,
    ans3: `3`,
    ans4: `5`
   },

   {
    number: 5,
    text: `What is the name of the home stadium?`,
    ans1: `Anfield`,
    ans2: `Camp Nou`,
    ans3: `Big Bird`,
    ans4: `Stamford Bridge`
   },

   {
    number: 6,
    text: `When was the last league title they win?`,
    ans1: `2004`,
    ans2: `2015`,
    ans3: `2019`,
    ans4: `none of the above`
   },

   {
    number: 7,
    text: `How do we call the fans of the team?`,
    ans1: `Red Devils`,
    ans2: `Cules`,
    ans3: `White tigers`,
    ans4: `Magic men`
   },

   {
    number: 8,
    text: `How many Argentine players are there in the club?`,
    ans1: `1`,
    ans2: `5`,
    ans3: `10`,
    ans4: `none of the above`
   },

   {
    number: 9,
    text: `Approximately, how many attendence can the stadium hold?`,
    ans1: `45,000`,
    ans2: `20,000`,
    ans3: `100,000`,
    ans4: `none of the above`
   },

   {
    number: 10,
    text: `Who is the president of the club now?`,
    ans1: `Bartomeu`,
    ans2: `Laporta`,
    ans3: `Harry`,
    ans4: `Mendy`
   } 
];

const ANSWERS = [
    `Messi`,
    `Real Madrid`,
    `Spain`,
    `5`,
    `Camp Nou`,
    `2019`,
    `Cules`,
    `1`,
    `100,000`,
    `Bartomeu`
];

let questionNum = 1;

let correctAnswers = 0;

function nextQuestion() {
  
    const question = questionSet[questionNum - 1];
  
    const questionsAnswered = questionNum - 1;
  
    $('#container').html(questionTemplate(correctAnswers, question, questionsAnswered));
  }
  
  function checkUserAnswer(answer) {
    if(answer.text() === ANSWERS[questionNum - 1]) {
      return true;
    } else {
      return false;
    }
  }
  
  function generateCorrectFeedback() {
    $('#container').html(correctFeedback);
    iterateCorrectAnswers();
  }

  function iterateQuestion() {
    questionNum++;
  }
  
  function iterateCorrectAnswers() {
    correctAnswers++;
  }
  
  function createResultsPage(correctAnswers) {
    $('#container').html(`
      <section id="final-page">
        <h2>Final Score: ${correctAnswers} out of 10</h2>
        <button id="js-restart-button">Play Again?</button>
      </section>
    `);
  }

function questionTemplate(correctAnswers, question, questionsAnswered ) {
    return `
    <section id="question-page" role="main">
    <h2 id="question">${question.text}</h2>
    
    <form>
      <fieldset>
        <label>
          <input class="answer" type="radio" name="option" checked></input>
          <span>${question.ans1}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans2}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans3}</span>
        </label>
  
        <label>
          <input class="answer" type="radio" name="option"></input>
          <span>${question.ans4}</span>
        </label>
      </fieldset>  
      <button id="js-submit-button">Submit</button>

    </form>

    <div id="status-bar">
      <span id="question-count">Question: ${question.number}/10</span>
      <span id="score-count">Score: ${correctAnswers}/${questionsAnswered}</span>
    </div>
  </section>
  `;
}

function handleStartButton() {
    $('#js-start-button').click(function(event) {
      nextQuestion();
    });
  }
  
  function handleSubmitButton() {
    $('#container').on('click', '#js-submit-button', function(event) {
      event.preventDefault()
  
      const answer = $('input:checked').siblings('span');
  
      const userIsCorrect = checkUserAnswer(answer);
      if(userIsCorrect) {
        generateCorrectFeedback();
      } else {
        generateIncorrectFeedback();
      }
    });
  }
  
  function handleNextButton() {
    $('#container').on('click', '#js-next-button', function(event) {
  
      if(questionNum === 10) {
        createResultsPage(correctAnswers);
      } else {
        iterateQuestion();
        nextQuestion();
    }
    });
  }
  
  function handleRestartButton() {
    $('#container').on('click', '#js-restart-button', function(event) {
  
      questionNum = 1;
  
      correctAnswers = 0;
  
      nextQuestion();
    });
  }
  
 
  
  const correctFeedback = `
    <section class="feedback-page" role="main">
      <h2 class='answer-message'>Correct!</h2>
        <div class='feedback-image'>
          <img class='feedback-gif correct' src="https://media2.giphy.com/media/ViZylgfPSfJFm/200w.webp?cid=790b76115cd4b59d7937746249918e1a&rid=200w.webp" alt="Messi winks.">
        </div>
      <button id="js-next-button">Next</button>
    </section>
  `;
  
  function generateIncorrectFeedback() {
    $('#container').html(incorrectFeedbackTemplate(questionNum));
  }
  
  function incorrectFeedbackTemplate(questionNum) {
    return `
      <section class="feedback-page" role="main">
        <h2 class='answer-message'>Oh no! It was ${ANSWERS[questionNum - 1]}!</h2>
        <div class='feedback-image'>
        <img class='feedback-gif incorrect' src=https://media.giphy.com/media/4X8U55N6TyE48/giphy.gif alt="Messi checking out ">
        </div>
        <button id="js-next-button">Next</button>
      </section>
  `;
  }
  
  function iterateQuestion() {
    questionNum++;
  }
  
  function iterateCorrectAnswers() {
    correctAnswers++;
  }
  
  function createResultsPage(correctAnswers) {
    $('#container').html(`
      <section id="final-page">
        <h2 class='final-score'>Final Score: ${correctAnswers} out of 10</h2>
        <button id="js-restart-button">Play Again?</button>
      </section>
    `);
  }
  
  function handleButtons() {
    handleStartButton();
    handleSubmitButton();
    handleNextButton();
    handleRestartButton();
  }
  
  handleButtons();