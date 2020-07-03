import { answers as answers } from './a.js'

const images = document.querySelectorAll('.current-image');
const paragraphs = document.querySelectorAll('.description-par');
const possibleReults = ['Low!', 'Medium!', 'High!'];
const acceptButton = document.querySelector('#toAnswersAccept');
const declineButton = document.querySelector('#toAnswersDecline');
const goodByePar = document.querySelector('.description-decline-text');
const resultWrapper = document.querySelector('.wrapper');
const questionsAndAnswersWrapper = document.querySelector('.questions-and-answers');
const scrollToTopButton = document.querySelector('.to-top-button');
const warnResults = document.querySelector('.without-results');
const main = document.querySelector('main');
const clearOrBackToResults = document.querySelector('.clear-or-back-to-results');
const backToGeneralResultsButton = document.querySelector('#back-to-general-results');
const clearAndBackToTestsButton = document.querySelector('#clear-and-back-to-tests');
let resultPar = document.querySelector('.user-result');
let userAnswers = document.querySelector('.user-answers');
let name = localStorage.getItem('name');
let correctResults = localStorage.getItem('CorrectAnswers');
let questionsAndAnswers = JSON.parse(localStorage.getItem('QuestionsAndAnswers'));
let descriptionResults = document.querySelector('.description-result'),
    currentImage = document.querySelector('.image-result'),
    toResultsOrNot = document.querySelector('.to-results-or-not');
let getAllRenderedQuestions;
let position;
let timer;



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
        });
        explanationButtons[i].addEventListener('click', function () {
            explanationPar[i].style.transition = 'all .5s linear';
            explanationPar[i].classList.add('toggleVisibilityPar');
            explanationBlock[i].classList.add('toggleVisibilityBlock');
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
                        <img class="question-mark" src="./images/question_mark.png" alt="Whyyyy?">
                        <button class="explanation-button">Почему так?</button>
                    </div>
                    <p class="explanation">${explanation[counter]}
                    </p>
                </div>
        `;

        return questionsAndAnswersWrapper.insertAdjacentHTML('beforeend', questionAndAnswersFromTest);

    };
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

    clearOrBackToResults.style.display = 'flex';
}

function showToTopButton() {
    position = window.pageYOffset || document.documentElement.scrollTop;

    if (position > 1200) {
        scrollToTopButton.classList.add('showBlock');
    } else {
        scrollToTopButton.classList.remove('showBlock');
    }
}

function backToTop() {
    if (position > 0) {
        window.scrollTo(0, position);
        position -= 200;
        timer = setTimeout(backToTop, 10)
    } else {
        clearTimeout(timer);
        window.scrollTo(0, 0)
    }
}

function render() {
    hideWrapper();

    if (getAllRenderedQuestions != undefined && getAllRenderedQuestions.length == 50) {
        questionsAndAnswersWrapper.style.display = 'flex';
        clearOrBackToResults.style.display = 'flex';
        resultWrapper.style.display = 'none';
    } else {
        setTimeout(showQuestionsAndAnswers, 1500);
    }
}

function clearLSandBackToresults() {
    localStorage.removeItem('QuestionsAndAnswers');
    localStorage.removeItem('CorrectAnswers');
    localStorage.removeItem('result');
    location.href = './testing.htm'
}

function showGeneralResults() {
    getAllRenderedQuestions = document.querySelectorAll('.question-and-answer-block');
    currentImage.classList.remove('slideToLeft');
    descriptionResults.classList.remove('slidetoRight');
    toResultsOrNot.classList.remove('slideToTop');
    questionsAndAnswersWrapper.style.display = 'none';
    clearOrBackToResults.style.display = 'none';
    resultWrapper.style.display = 'flex';
}

if (!localStorage.getItem('name')) {
    let warnModal = document.querySelector('.warn');
    warnModal.classList.add('active');
    let acceptNameButton = document.querySelector('#accept-modal');
    let input = document.querySelector('#getName');
    let name = '';

    main.style.display = 'none';
    warnResults.style.display = 'none';
    acceptNameButton.style.display = 'block';
    input.addEventListener('keydown', function (e) {
        if (this.value != '' && e.keyCode === 13) {
            name = input.value;
            localStorage.setItem('name', name);
            warnModal.classList.remove('active');
            location.href = './testing.htm';
        }
    });

    acceptNameButton.addEventListener('click', function () {
        if (input.value != '') {
            name = input.value;
            localStorage.setItem('name', name);
            warnModal.classList.remove('active');
            location.href = './testing.htm';
        }
    });
}

if (!localStorage.getItem('CorrectAnswers') && localStorage.getItem('name')) {
    const toTestingPage = document.querySelector('#to-testing-page');
    warnResults.style.display = 'flex';
    main.style.display = 'none';

    toTestingPage.addEventListener('click', function () {
        location.href = './testing.htm';
    })
} else {
    displayGeneralResults();
}

window.addEventListener('scroll', showToTopButton);
scrollToTopButton.addEventListener('click', backToTop)
declineButton.addEventListener('click', declineButtonTrigger);
acceptButton.addEventListener('click', render);
backToGeneralResultsButton.addEventListener('click', showGeneralResults)
clearAndBackToTestsButton.addEventListener('click', clearLSandBackToresults);