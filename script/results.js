import { answers as answers } from './a.js'

const images = document.querySelectorAll('.current-image');
const paragraphs = document.querySelectorAll('.description-par');
const possibleReults = ['Low!', 'Medium!', 'High!'];
const acceptButton = document.querySelector('#toAnswersAccept');
const declineButton = document.querySelector('#toAnswersDecline');
const goodByePar = document.querySelector('.description-decline-text');
const resultWrapper = document.querySelector('.wrapper');
const questionsAndAnswersWrapper = document.querySelector('.questions-and-answers');
let resultPar = document.querySelector('.user-result');
let userAnswers = document.querySelector('.user-answers');
let name = localStorage.getItem('name');
let correctResults = localStorage.getItem('CorrectAnswers');
let questionsAndAnswers = JSON.parse(localStorage.getItem('QuestionsAndAnswers'));

function displayGeneralResults() {
    for (let i = 0; i < images.length; i++) {
        images[i].style.display = 'none';
        paragraphs[i].style.display = 'none';

        if (localStorage.getItem('result') == i) {
            images[i].style.display = 'flex';
            paragraphs[i].style.display = 'flex';
            resultPar.innerText = `${name}, your result is ${possibleReults[i]}`;
            userAnswers.innerText = `Correct answers are ${correctResults} of 50!`;
        }
    }
};

function declineButtonTrigger() {
    goodByePar.style.display = 'flex';
};

function hideWrapper() {
    let descriptionResults = document.querySelector('.description-result'),
        currentImage = document.querySelector('.image-result'),
        toResultsOrNot = document.querySelector('.to-results-or-not');

    currentImage.classList.add('slideToLeft');
    descriptionResults.classList.add('slidetoRight');

    toResultsOrNot.classList.add('slideToTop');
    setTimeout(() => {
        resultWrapper.style.display = 'none';
    }, 1500);
};

function toggleExplanationDisplay() {
    let questionsAndAnswersBlock = document.querySelectorAll('.question-and-answer-block');
    let explanationPar = document.querySelectorAll('.explanation');
    let explanationBlock = document.querySelectorAll('.explanation-block');
    let explanationButtons = document.querySelectorAll('.explanation-button');
    let questionMarkImage = document.querySelectorAll('.question-mark');

    for (let i = 0; i < questionsAndAnswersBlock.length; i++) {
        questionMarkImage[i].addEventListener('click', function () {
            explanationPar[i].style.transition = 'all .5s linear';
            explanationPar[i].classList.add('toggleVisibilityPar');
            explanationBlock[i].classList.add('toggleVisibilityBlock');
            console.log(1);

        });
        explanationButtons[i].addEventListener('click', function () {
            explanationPar[i].style.transition = 'all .5s linear';
            explanationPar[i].classList.add('toggleVisibilityPar');
            explanationBlock[i].classList.add('toggleVisibilityBlock');
            console.log(1);

        })
    }
}

function showAnswers(correctAnswer, userAnswer, code, counter) {
    let answersBlock = '';

    if (code[counter] % 17 == 0) {
        answersBlock = `
            <div class="result-answers-block">
                <p class="result-answers markAsGreen"><span id='correct'>✓</span>${correctAnswer[counter]}</p>
            </div>
        `
        return answersBlock;
    } else {
        answersBlock = `
        <div class="result-answers-block">
            <p class="result-answers markAsRed"><span id="incorrect">X</span>${userAnswer[counter]}</p>
            <p class="result-answers markAsGreen"><span id='correct'>✓</span>${correctAnswer[counter]}</p>
        </div>
    `
        return answersBlock;
    }
}

function renderQuestionsAndAnswers(question, correctAnswer, userAnswer, code, explanation, counter) {
    let questionAndAnswersFromTest;

    for (let i = 0; i < questionsAndAnswers.length; i++) {
        questionAndAnswersFromTest = `
                <div class="question-and-answer-block">
                    <p class="result-question">${question[counter]}</p>
                    ${showAnswers(correctAnswer, userAnswer, code, counter)}
                    <div class="explanation-block">
                        <img class="question-mark" src="/images/question_mark.png" alt="Whyyyy?">
                        <button class="explanation-button">Почему так?</button>
                    </div>
                    <p class="explanation">${explanation[counter]}
                    </p>
                </div>
        `;

        return questionsAndAnswersWrapper.insertAdjacentHTML('beforeend', questionAndAnswersFromTest);

    }
}

function showQuestionsAndAnswers() {
    let q = [];
    let c = [];
    let ca = [];
    let ua = []
    let e = [];

    questionsAndAnswersWrapper.classList.add('toggleDisplay');

    for (let value of Object.values(questionsAndAnswers)) {
        q.push(value[0]);
        ca.push(value[1]);
        ua.push(value[2]);
        c.push(value[3]);
    }
    for (let value in answers) {
        for (let k of Object.values(answers[value])) {
            e.push(k)
        }
    }

    for (let i = 0; i < questionsAndAnswers.length; i++) {
        renderQuestionsAndAnswers(q, ca, ua, c, e, i);
    }
    toggleExplanationDisplay();
}

function render() {
    hideWrapper();
    setTimeout(showQuestionsAndAnswers, 1500);
}



displayGeneralResults();


declineButton.addEventListener('click', declineButtonTrigger);
acceptButton.addEventListener('click', render);